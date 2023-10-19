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

    console.log('repo', repo);

    const defaultBranch = repo?.data?.default_branch || 'main';

    // Fetch the latest changes from GitHub
    const latestCommitOnRemote = (await octokit.git.getRef({
      owner: 'Tmoh-Squim',
      repo: 'mern-stack-ecommerce-web-app',
      ref: `heads/${defaultBranch}`,
    })).data.object.sha;

    const content = Buffer.from(fileUrl).toString('base64');
    const tree = await octokit.git.createTree({
      owner: 'Tmoh-Squim',
      repo: 'mern-stack-ecommerce-web-app',
      base_tree: latestCommitOnRemote, // Use the latest commit on the default branch
      tree: [
        {
          path: `backend/uploads/${fileUrl}`,
          mode: '100644',
          type: 'blob',
          content,
        },
      ],
    });

    const parents = [latestCommitOnRemote]; // Set the parent commit to the latest commit on the default branch

    const commit = await octokit.git.createCommit({
      owner: 'Tmoh-Squim',
      repo: 'mern-stack-ecommerce-web-app',
      message: 'Add uploaded file',
      tree: tree.data.sha,
      parents,
    });

    // Attempt to update the main branch (or the default branch) with the new commit
    try {
      await octokit.git.updateRef({
        owner: 'Tmoh-Squim',
        repo: 'mern-stack-ecommerce-web-app',
        ref: `heads/${defaultBranch}`,
        sha: commit.data.sha,
      });
    } catch (error) {
      console.error('Error updating the branch:', error);

      // Handle the case where the update is not a fast forward (e.g., conflict with remote changes)
      console.log('Merging changes from the remote branch into the local branch...');
      // You can use octokit.repos.merge() to perform the merge
      await octokit.repos.merge()
      // After merging, try to push again
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