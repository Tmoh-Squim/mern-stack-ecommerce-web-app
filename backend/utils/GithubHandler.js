
const { Octokit } = require('@octokit/rest');
const fs = require("fs").promises;

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN, // Use your GitHub personal access token
});

async function commitToGitHub(filepath,fileUrl) {
  try {
    const { data: repo } = await octokit.repos.get({
      owner: 'Tmoh-Squim',
      repo: 'mern-stack-ecommerce-web-app',
    });

    const defaultBranch = repo?.data?.default_branch || 'main';

    // Fetch the latest changes from GitHub
    const latestCommitOnRemote = (await octokit.git.getRef({
      owner: 'Tmoh-Squim',
      repo: 'mern-stack-ecommerce-web-app',
      ref: `heads/${defaultBranch}`,
    })).data.object.sha;

    const fileBuffer =await fs.readFile(filepath).toString("latin1"); // Read the file as a binary buffer

    const blob = await octokit.git.createBlob({
      owner: 'Tmoh-Squim',
      repo: 'mern-stack-ecommerce-web-app',
      content: fileBuffer, // Convert the binary buffer to base64
    });

    const tree = await octokit.git.createTree({
      owner: 'Tmoh-Squim',
      repo: 'mern-stack-ecommerce-web-app',
      base_tree: latestCommitOnRemote,
      tree: [
        {
          path: `backend/uploads/${fileUrl}`,
          mode: '100644',
          type: 'blob',
          sha: blob.data.sha, // Use the sha of the created blob
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
      await octokit.git.updateRef({
        owner: 'Tmoh-Squim',
        repo: 'mern-stack-ecommerce-web-app',
        ref: `heads/${defaultBranch}`,
        sha: commit.data.sha,
      });
    } catch (error) {
      console.error('Error updating the branch:', error);
      console.log('Merging changes from the remote branch into the local branch...');
      await octokit.repos.merge({
        owner: 'Tmoh-Squim',
        repo: 'mern-stack-ecommerce-web-app',
        base: defaultBranch,
        head: 'main',
        commit_message: 'Merge feature branch into main',
      });
      await octokit.git.updateRef({
        owner: 'Tmoh-Squim',
        repo: 'mern-stack-ecommerce-web-app',
        ref: `heads/${defaultBranch}`,
        sha: commit.data.sha,
      });
    }

    console.log('File pushed to GitHub successfully.');
  } catch (error) {
    console.error('Error pushing file to GitHub:', error);
  }
}

module.exports = { commitToGitHub };
