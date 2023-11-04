// @ts-check
import minimist from 'minimist'
import fs from 'node:fs'
import path from 'node:path'
import pico from 'picocolors'
import semver from 'semver'
import enquirer from 'enquirer'
import { execa } from 'execa'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

let versionUpdated = false

const { prompt } = enquirer
const currentVersion = createRequire(import.meta.url)('../package.json').version
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const args = minimist(process.argv.slice(2), {
  alias: {
    skipBuild: 'skip-build',
    skipTests: 'skip-tests',
    skipGit: 'skip-git',
    skipPrompts: 'skip-prompts'
  }
})

const preId = args.preid || semver.prerelease(currentVersion)?.[0]
const isDryRun = args.dry
let skipTests = args.skipTests
const skipBuild = args.skipBuild
const isCanary = args.canary
const skipPrompts = args.skipPrompts || args.canary
const skipGit = args.skipGit || args.canary
const updateTypeArr = ["major", "premajor", "minor", "preminor", "patch", "prepatch", "prerelease"]

const updateType = updateTypeArr.filter(type => {
  return args[type] && type
}).shift()
console.log(updateType);
const packages = fs
  .readdirSync(path.resolve(__dirname, '../packages'))
  .filter(p => !p.endsWith('.ts') && !p.startsWith('.'))
const proPackages = fs
  .readdirSync(path.resolve(__dirname, '../www'))
  .filter(p => !p.endsWith('.ts') && !p.startsWith('.'))
const getPkgRoot = pkg => path.resolve(__dirname, '../packages/' + pkg)
const getProRoot = pkg => path.resolve(__dirname, '../www/' + pkg)

const isCorePackage = pkgName => {
  if (!pkgName) return

  if (pkgName === 'vue' || pkgName === '@vue/compat') {
    return true
  }

  return (
    pkgName.startsWith('@vue') &&
    packages.includes(pkgName.replace(/^@vue\//, ''))
  )
}

const renamePackageToCanary = pkgName => {
  if (pkgName === 'vue') {
    return '@vue/canary'
  }

  if (isCorePackage(pkgName)) {
    return `${pkgName}-canary`
  }

  return pkgName
}

const keepThePackageName = pkgName => pkgName

const skippedPackages = []

const inc = i => semver.inc(currentVersion, i, preId)
const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts })
const dryRun = (bin, args, opts = {}) =>
  console.log(pico.blue(`[dryrun] ${bin} ${args.join(' ')}`), opts)
const runIfNotDry = isDryRun ? dryRun : run

const step = msg => console.log(pico.cyan(msg))

async function main() {
  if (!(await isInSyncWithRemote())) {
    return
  } else {
    console.log(`${pico.green(`✓`)} commit is up-to-date with rmeote.\n`)
  }

  let targetVersion = args._[0]
  if (updateType) {
    // @ts-ignore
    const newVersion = semver.inc(currentVersion, updateType);
    // @ts-ignore
    targetVersion = newVersion
  } else if (isCanary) {
    // The canary version string format is `3.yyyyMMdd.0` (or `3.yyyyMMdd.0-minor.0` for minor)
    // Use UTC date so that it's consistent across CI and maintainers' machines
    const datestamp = getDatestamp()
    const major = semver.major(currentVersion)
    let canaryVersion
    canaryVersion = `${major}.${datestamp}.0`
    if (args.tag && args.tag !== 'latest') {
      canaryVersion = `${major}.${datestamp}.0-${args.tag}.0`
    }
    targetVersion = canaryVersion
  }

  step(
    isCanary
      ? `Releasing canary version v${targetVersion}...`
      : `Releasing v${targetVersion}...`
  )


  // update all package versions and inter-dependencies
  step('\nUpdating cross dependencies...')
  updateVersions(
    targetVersion,
    isCanary ? keepThePackageName : keepThePackageName
  )
  versionUpdated = true

  // build all packages with types
  step('\nBuilding all packages...')
  // if (!skipBuild && !isDryRun) {
  //   await run('pnpm', ['run', 'build', '--withTypes'])
  //   step('\nTesting built types...')
  //   await run('pnpm', ['test-dts-only'])
  // } else {
  console.log(`(skipped)`)
  // }

  // generate changelog
  step('\nGenerating changelog...')
  await run(`pnpm`, ['run', 'changelog'])

  const { stdout } = await run('git', ['diff'], { stdio: 'pipe' })
  if (stdout) {
    step('\nCommitting changes...')
    await runIfNotDry('git', ['add', '-A'])
    await runIfNotDry('git', ['commit', '-m', `release: v${targetVersion}`])
  } else {
    console.log('No changes to commit.')
  }

}

async function getCIResult() {
  try {
    const sha = await getSha()
    const res = await fetch(
      `https://api.github.com/repos/vuejs/core/actions/runs?head_sha=${sha}` +
      `&status=success&exclude_pull_requests=true`
    )
    const data = await res.json()
    return data.workflow_runs.length > 0
  } catch (e) {
    console.error('Failed to get CI status for current commit.')
    return false
  }
}

async function isInSyncWithRemote() {
  try {
    const repoName = await getRepoName()
    const branch = await getBranch()
    const res = await fetch(
      `https://api.github.com/repos/${repoName}/commits/${branch}?per_page=1`
    )
    const data = await res.json()
    return data.sha === (await getSha())
  } catch (e) {
    console.error(
      'Failed to check whether local HEAD is up-to-date with remote.'
    )
    return false
  }
}
function getDatestamp() {
  const date = new Date()
  const yyyy = date.getUTCFullYear()
  const MM = (date.getUTCMonth() + 1).toString().padStart(2, '0')
  const dd = date.getUTCDate().toString().padStart(2, '0')
  return `${yyyy}${MM}${dd}`
}
async function getSha() {
  return (await execa('git', ['rev-parse', 'HEAD'])).stdout
}

async function getBranch() {
  return (await execa('git', ['rev-parse', '--abbrev-ref', 'HEAD'])).stdout
}
async function getRepoName() {
  const { stdout: url } = await execa('git', ['config', '--get', 'remote.origin.url'])
  const regex = /:(.*?)\.git/
  // @ts-ignore
  return url.match(regex)[1]
}

function updateVersions(version, getNewPackageName = keepThePackageName) {
  // 1. update root package.json
  updatePackage(path.resolve(__dirname, '..'), version, getNewPackageName)
  // 2. update all packages
  packages.forEach(p =>
    updatePackage(getPkgRoot(p), version, getNewPackageName)
  )
  // 3. update all project
  proPackages.forEach(p =>
    updatePackage(getProRoot(p), version, getNewPackageName)
  )
}

function updatePackage(pkgRoot, version, getNewPackageName) {
  const pkgPath = path.resolve(pkgRoot, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  pkg.name = getNewPackageName(pkg.name)
  pkg.version = version
  updateDeps(pkg, 'dependencies', version, getNewPackageName)
  updateDeps(pkg, 'peerDependencies', version, getNewPackageName)
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
}

function updateDeps(pkg, depType, version, getNewPackageName) {
  const deps = pkg[depType]
  if (!deps) return
  Object.keys(deps).forEach(dep => {
    if (deps[dep] === 'workspace:*') {
      return
    }
    if (isCorePackage(dep)) {
      const newName = getNewPackageName(dep)
      const newVersion = newName === dep ? version : `npm:${newName}@${version}`
      console.log(
        pico.yellow(`${pkg.name} -> ${depType} -> ${dep}@${newVersion}`)
      )
      deps[dep] = newVersion
    }
  })
}

async function publishPackage(pkgName, version, additionalFlags) {
  if (skippedPackages.includes(pkgName)) {
    return
  }
  const pkgRoot = getPkgRoot(pkgName)
  const pkgPath = path.resolve(pkgRoot, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  if (pkg.private) {
    return
  }

  let releaseTag = null
  if (args.tag) {
    releaseTag = args.tag
  } else if (version.includes('alpha')) {
    releaseTag = 'alpha'
  } else if (version.includes('beta')) {
    releaseTag = 'beta'
  } else if (version.includes('rc')) {
    releaseTag = 'rc'
  }

  step(`Publishing ${pkgName}...`)
  try {
    await run(
      'pnpm',
      [
        'publish',
        ...(releaseTag ? ['--tag', releaseTag] : []),
        '--access',
        'public',
        ...additionalFlags
      ],
      {
        cwd: pkgRoot,
        stdio: 'pipe'
      }
    )
    console.log(pico.green(`Successfully published ${pkgName}@${version}`))
  } catch (e) {
    if (e.stderr.match(/previously published/)) {
      console.log(pico.red(`Skipping already published: ${pkgName}`))
    } else {
      throw e
    }
  }
}

main().catch(err => {
  if (versionUpdated) {
    // revert to current version on failed releases
    updateVersions(currentVersion)
  }
  console.error(err)
  process.exit(1)
})