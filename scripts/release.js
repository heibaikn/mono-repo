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
const skipTests = args.skipTests
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

async function isInSyncWithRemote() {
  try {
    console.log('start isInSyncWithRemote')
    const repoName = await getRepoName()
    const branch = await getBranch()
    console.log(branch)
    const url = `https://api.github.com/repos/${repoName}/commits/${branch}?per_page=1`
    const res = await fetch(url)
    console.log('fetch url', url)
    console.log(res)
    const data = await res.json()
    const sha = await getSha()
    console.log('sha', sha)
    console.log('data.sha', data.sha)
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
async function getVersion() {
  if (updateType) {
    const newVersion = await getVersionByBranch()
    // @ts-ignore
    return newVersion || semver.inc(currentVersion, updateType)
  } else if (isCanary) {
    // The canary version string format is `3.yyyyMMdd.0` (or `3.yyyyMMdd.0-minor.0` for minor)
    // Use UTC date so that it's consistent across CI and maintainers' machines
    const datestamp = getDatestamp()
    let canaryVersion
    canaryVersion = `${currentVersion}.${datestamp}.0`
    if (args.tag && args.tag !== 'latest') {
      canaryVersion = `${currentVersion}.${datestamp}.0-${args.tag}.0`
    }
    return canaryVersion
  }
}
async function getVersionByBranch() {
  const { stdout: branch } = await execa('git', ['rev-parse', '--abbrev-ref', 'HEAD'])
  const regex = /^release\/v_(.+)$/
  // @ts-ignore
  const branchVersion = branch.match(regex)[1]
  return branchVersion ? `${branchVersion}` : ''
}
async function getBranch() {
  return (await execa('git', ['rev-parse', '--abbrev-ref', 'HEAD'])).stdout
}
async function getRepoName() {
  const { stdout: url } = await execa('git', ['config', '--get', 'remote.origin.url'])
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

async function main() {
  if (!(await isInSyncWithRemote())) {
    return
  }
  console.log(`${pico.green(`✓`)} commit is up-to-date with rmeote.\n`)

  const targetVersion = (await getVersion()) || args._[0]

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
    await runIfNotDry('git', ['push'])
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
