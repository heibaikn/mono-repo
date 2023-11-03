const github = require('@actions/github');
const core = require('@actions/core');

async function run() {
  // This should be a token with access to your repository scoped in as a secret.
  // The YML workflow will need to set myToken with the GitHub Secret Token
  // myToken: ${{ secrets.GITHUB_TOKEN }}
  // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret
  const myToken = core.getInput('GITHUB_TOKEN');
  console.log(myToken);

  // You can also pass in additional options as a second parameter to getOctokit
  // const octokit = github.getOctokit(myToken, {userAgent: "MyActionVersion1"});

  // Get owner and repo from context of payload that triggered the action
  const { owner, repo } = context.repo

  // Get the inputs from the workflow file: https://github.com/actions/toolkit/tree/master/packages/core#inputsoutputs
  const tagName = core.getInput('VERSION', { required: true })

  // This removes the 'refs/tags' portion of the string, i.e. from 'refs/tags/v1.10.15' to 'v1.10.15'
  const tag = tagName.replace('refs/tags/', '')
  const releaseName =
    core.getInput('release_name', { required: false }) || tag
  const body = core.getInput('body', { required: false }) || ''
  const draft = core.getInput('draft', { required: false }) === 'true'
  const prerelease = /\d-[a-z]/.test(tag)
  
  const commitSha = process.env.GITHUB_SHA;
  
  const octokit = github.getOctokit(myToken)

  const tagResponse = await octokit.rest.git.createTag({
    owner: owner,
    repo: repo,
    tag: tagName,
    message: "",
    object: commitSha,
    type: 'commit',
    tagger: {
      name: "",
      email: ""
    }
  });

  //   octokit.rest.git.createTag({
  //     owner,
  // repo,
  // tag,
  // message,
  // object,
  // type,

  //   })
  // const { data: pullRequest } = await octokit.rest.pulls.get({
  //     owner: 'octokit',
  //     repo: 'rest.js',
  //     pull_number: 123,
  //     mediaType: {
  //       format: 'diff'
  //     }
  // });

  // console.log(pullRequest);
}

run();