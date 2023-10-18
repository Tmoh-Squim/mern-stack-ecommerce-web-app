const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN, // Use your GitHub personal access token
});

async function commitToGitHub(fileUrl) {
  try {
    const { data: repo } = await octokit.repos.get({
      owner: 'Tmoh-Squim',
      repo: 'mern-stack-ecommerce-web-app',
    });

    console.log("repo",repo)
    if (!repo || !repo.data || !repo.data.default_branch) {
        console.error('Error: Unable to obtain default branch from GitHub API.');
        return;
      }
    // Read the file content
    const content = Buffer.from(JSON.stringify({ avatar: fileUrl })).toString('base64');
    const tree = await octokit.git.createTree({
      owner: 'Tmoh-Squim',
      repo: 'mern-stack-ecommerce-web-app',
      base_tree: repo.data.default_branch,
      tree: [
        {
          path: `/backend/uploads/${fileUrl}`,
          mode: '100644',
          type: 'blob',
          content,
        },
      ],
    });

    const commit = await octokit.git.createCommit({
      owner: 'Tmoh-Squim',
      repo: 'mern-stack-ecommerce-web-app',
      message: 'Add uploaded file',
      tree: tree.data.sha,
      parents: [repo.data.commit.sha],
    });

    await octokit.git.updateRef({
      owner: 'Tmoh-Squim',
      repo: 'mern-stack-ecommerce-web-app',
      ref: `heads/main`,
      sha: commit.data.sha,
    });

    console.log('File pushed to GitHub successfully.');
  } catch (error) {
    console.error('Error pushing file to GitHub:', error);
  }
}

module.exports = { commitToGitHub };
