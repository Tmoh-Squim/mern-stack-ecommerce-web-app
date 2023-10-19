const { Octokit } = require('@octokit/rest');
const fs = require('fs').promises;
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function commitToGitHub(fileUrl) {
  try {
    const { data: repo } = await octokit.repos.get({
      owner: 'Tmoh-Squim',
      repo: 'mern-stack-ecommerce-web-app',
    });

    console.log('repo', repo);

    const defaultBranch = repo?.data?.default_branch || 'main';

    const latestCommitOnRemote = (await octokit.git.getRef({
      owner: 'Tmoh-Squim',
      repo: 'mern-stack-ecommerce-web-app',
      ref: `heads/${defaultBranch}`,
    })).data.object.sha;

    // Check if the file exists before reading it
    if (await fileExists(fileUrl)) {
      const content = await fs.readFile(fileUrl);
      const tree = await octokit.git.createTree({
        owner: 'Tmoh-Squim',
        repo: 'mern-stack-ecommerce-web-app',
        base_tree: latestCommitOnRemote,
        tree: [
          {
            path: `backend/uploads/${fileUrl}`,
            mode: '100644',
            type: 'blob',
            content,
          },
        ],
      });

      const parents = [latestCommitOnRemote];

      const commit = await octokit.git.createCommit({
        owner: 'Tmoh-Squim',
        repo: 'mern-stack-ecommerce-web-app',
        message: 'Add uploaded file',
        tree: tree.data.sha,
        parents,
      });

      try {
        // Specify merge details, such as the base and head branches
        await octokit.repos.merge({
          owner: 'Tmoh-Squim',
          repo: 'mern-stack-ecommerce-web-app',
          base: defaultBranch,
          head: 'main', // Replace with your branch name
          commit_message: 'Merge feature branch into main', // Replace with your commit message
        });

        await octokit.git.updateRef({
          owner: 'Tmoh-Squim',
          repo: 'mern-stack-ecommerce-web-app',
          ref: `heads/${defaultBranch}`,
          sha: commit.data.sha,
        });

        console.log('File pushed to GitHub successfully.');
      } catch (error) {
        console.error('Error updating the branch:', error);
      }
    } else {
      console.error('File does not exist:', fileUrl);
    }
  } catch (error) {
    console.error('Error pushing file to GitHub:', error);
  }
}

// Function to check if a file exists
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = { commitToGitHub };