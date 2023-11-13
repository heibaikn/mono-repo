// @ts-check
import minimist from 'minimist'
import pico from 'picocolors'
import { execa } from 'execa'

const args = minimist(process.argv.slice(2), {
  alias: {}
})

const isDryRun = args.dry

const run = (bin, args, opts = {}) => execa(bin, args, { stdio: 'inherit', ...opts })
const dryRun = (bin, args, opts = {}) =>
  console.log(pico.blue(`[dryrun] ${bin} ${args.join(' ')}`), opts)
const runIfNotDry = isDryRun ? dryRun : run

const step = (msg) => console.log(pico.cyan(msg))

async function isInSyncWithRemote() {
  try {
    console.log('start')
    const repoName = await getRepoName()
    console.log('repoName', repoName)
    const branch = await getBranch()
    console.log('branch', branch)
    const res = await fetch(`https://api.github.com/repos/${repoName}/commits/${branch}?per_page=1`)
    const data = await res.json()
    console.log('data.sha', data.sha)
    const sha = await getSha()
    console.log('sha', sha)
    return data.sha === sha
  } catch (e) {
    console.log(e)
    console.error('Failed to check whether local HEAD is up-to-date with remote.')
    return false
  }
}

async function getSha() {
  return (await execa('git', ['rev-parse', 'HEAD'])).stdout
}

async function getBranch() {
  return (await execa('git', ['rev-parse', '--abbrev-ref', 'HEAD'])).stdout
}
async function getTagNameByBranch() {
  const { stdout: branch } = await execa('git', ['rev-parse', '--abbrev-ref', 'HEAD'])
  const regex = /^release_v_(.+)$/
  // @ts-ignore
  const branchVersion = branch.match(regex)[1]
  return branchVersion ? `v${branchVersion}` : ''
}
async function getRepoName() {
  const { stdout: url } = await execa('git', ['config', '--get', 'remote.origin.url'])
  console.log('url', url)
  const regex = /:(.*?)\.git/
  // @ts-ignore
  return url.match(regex)[1]
}
async function checkTag(tag) {
  return (await execa('git', ['tag', '-l', tag])).stdout
}

async function main() {
  // if (!(await isInSyncWithRemote())) {
  //   return
  // }
  console.log(`${pico.green(`✓`)} commit is up-to-date with rmeote.\n`)

  const tagName = await getTagNameByBranch()
  const hasTag = await checkTag(tagName)
  if (hasTag) {
    step(`\n delete tag:${tagName}`)
    await runIfNotDry('git', ['tag', '-d', tagName])
    await runIfNotDry('git', ['push', 'origin', '-d', tagName])
  }
  step(`\n add tag:${tagName}`)
  await runIfNotDry('git', ['tag', tagName])
  await runIfNotDry('git', ['push', 'origin', tagName])
}
main().catch((err) => {
  console.error(err)
  process.exit(1)
})
