// @ts-check
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import minimist from 'minimist'
import pico from 'picocolors'
import semver from 'semver'
import enquirer from 'enquirer'
import { execa } from 'execa'

let versionUpdated = false

const { prompt } = enquirer
const currentVersion = createRequire(import.meta.url)('../package.json').version
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const args = minimist(process.argv.slice(2), {
  alias: {
    skipBuild: 'skip-build',
    skipTests: 'skip-tests',
    isGit: 'git',
    skipPrompts: 'skip-prompts'
  }
})

const updateTypeArr = ['major', 'premajor', 'minor', 'preminor', 'patch', 'prepatch', 'prerelease']
const updateType = updateTypeArr.find((type) => {
  return args[type] && type
})

const preId = args.preid || semver.prerelease(currentVersion)?.[0]
const isDryRun = args.dry
let skipTests = args.skipTests
const skipBuild = args.skipBuild
const skipPrompts = args.skipPrompts
const isCanary = args.canary || !updateType
const isGit = args.isGit
console.log(pico.blue(`updateType:${updateType}`))
console.log(pico.blue(`isGet:${isGit}`))
const packages = fs
  .readdirSync(path.resolve(__dirname, '../packages'))
  .filter((p) => !p.endsWith('.ts') && !p.startsWith('.'))
const proPackages = fs
  .readdirSync(path.resolve(__dirname, '../www'))
  .filter((p) => !p.endsWith('.ts') && !p.startsWith('.'))
const getPkgRoot = (pkg) => path.resolve(__dirname, `../packages/${pkg}`)
const getProRoot = (pkg) => path.resolve(__dirname, `../www/${pkg}`)

const isCorePackage = (pkgName) => {
  if (!pkgName) return

  return (
    pkgName.startsWith('@heibaimono') && packages.includes(pkgName.replace(/^@heibaimono\//, ''))
  )
}

const keepThePackageName = (pkgName) => pkgName

const skippedPackages = []

const inc = (i) => semver.inc(currentVersion, i, preId)
const run = (bin, args, opts = {}) => execa(bin, args, { stdio: 'inherit', ...opts })
const dryRun = (bin, args, opts = {}) =>
  console.log(pico.blue(`[dryrun] ${bin} ${args.join(' ')}`), opts)
const runIfNotDry = isDryRun ? dryRun : run

const step = (msg) => console.log(pico.cyan(msg))

async function main() {
  if (!(await isInSyncWithRemote())) {
    return
  }
  console.log(`${pico.green(`✓`)} commit is up-to-date with rmeote.\n`)

  let targetVersion = args._[0]
  if (updateType) {
    // @ts-ignore
    const newVersion = semver.inc(currentVersion, updateType)
    // @ts-ignore
    targetVersion = newVersion
  } else if (isCanary) {
    // The canary version string format is `3.yyyyMMdd.0` (or `3.yyyyMMdd.0-minor.0` for minor)
    // Use UTC date so that it's consistent across CI and maintainers' machines
    const datestamp = getDatestamp()
    let canaryVersion
    canaryVersion = `${currentVersion}.${datestamp}.0`
    if (args.tag && args.tag !== 'latest') {
      canaryVersion = `${currentVersion}.${datestamp}.0-${args.tag}.0`
    }
    targetVersion = canaryVersion
  }

  step(
    isCanary ? `Releasing canary version v${targetVersion}...` : `Releasing v${targetVersion}...`
  )

  // update all package versions and inter-dependencies
  step('\nUpdating cross dependencies...')
  updateVersions(targetVersion, keepThePackageName)
  versionUpdated = true

  // build all packages with types
  // step('\nBuilding all packages...')

  if (isGit) {
    // generate changelog
    step('\nGenerating changelog...')
    await run(`pnpm`, ['run', 'changelog'])

    const { stdout } = await run('git', ['diff'], { stdio: 'pipe' })
    if (!stdout) {
      console.log('No changes to commit.')
      return
    }

    step('\nCommitting changes...')
    await runIfNotDry('git', ['add', '-A'])
    await runIfNotDry('git', ['commit', '-m', `release: v${targetVersion}`])

    step('\nPushing to GitHub...')
    // await runIfNotDry('git', ['tag', `v${targetVersion}`])
    // await runIfNotDry('git', ['push', 'origin', `refs/tags/v${targetVersion}`])
    await runIfNotDry('git', ['push'])
  }
}

async function isInSyncWithRemote() {
  try {
    const repoName = await getRepoName()
    const branch = await getBranch()
    const res = await fetch(`https://api.github.com/repos/${repoName}/commits/${branch}?per_page=1`)
    const data = await res.json()
    const sha = await getSha()
    return data.sha === sha
  } catch (e) {
    console.log(e)
    console.error('Failed to check whether local HEAD is up-to-date with remote.')
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
  let { stdout: url } = await execa('git', ['config', '--get', 'remote.origin.url'])
  if (url.startsWith('https')) {
    const regex = /github.com\/(.+)/
    // @ts-ignore
    return url.match(regex)[1]
  } else {
    const regex = /:(.*?)\.git/
    // @ts-ignore
    return url.match(regex)[1]
  }
}

function updateVersions(version, getNewPackageName = keepThePackageName) {
  // 1. update root package.json
  updatePackage(path.resolve(__dirname, '..'), version, getNewPackageName)
  // 2. update all packages
  packages.forEach((p) => updatePackage(getPkgRoot(p), version, getNewPackageName))
  // 3. update all project
  proPackages.forEach((p) => updatePackage(getProRoot(p), version, getNewPackageName))
}

function updatePackage(pkgRoot, version, getNewPackageName) {
  const pkgPath = path.resolve(pkgRoot, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  pkg.name = getNewPackageName(pkg.name)
  pkg.version = version
  console.log(pkgPath)
  updateDeps(pkg, 'dependencies', version, getNewPackageName)
  updateDeps(pkg, 'peerDependencies', version, getNewPackageName)
  fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)
}

function updateDeps(pkg, depType, version, getNewPackageName) {
  const deps = pkg[depType]
  if (!deps) return
  Object.keys(deps).forEach((dep) => {
    if (deps[dep] === 'workspace:*') {
      return
    }
    if (deps[dep] === '*') {
      return
    }

    if (isCorePackage(dep)) {
      const newName = getNewPackageName(dep)
      const newVersion = newName === dep ? version : `npm:${newName}@${version}`
      console.log(pico.yellow(`${pkg.name} -> ${depType} -> ${dep}@${newVersion}`))
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

main().catch((err) => {
  if (versionUpdated) {
    // revert to current version on failed releases
    updateVersions(currentVersion)
  }
  console.error(err)
  process.exit(1)
})
