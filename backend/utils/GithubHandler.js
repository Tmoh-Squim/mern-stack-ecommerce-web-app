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

    // Read the image file as a buffer (assuming it's a local file)
const imageBuffer = fs.readFileSync(fileUrl); // or 'path/to/your/image.png' for PNG

// Encode the image buffer to base64
const base64Image = imageBuffer.toString('base64');

// Now you can include base64Image and contentType in your HTML or HTTP response

    const tree = await octokit.git.createTree({
      owner: 'Tmoh-Squim',
      repo: 'mern-stack-ecommerce-web-app',
      base_tree: latestCommitOnRemote, // Use the latest commit on the default branch
      tree: [
        {
          path: `backend/uploads/${fileUrl}`,
          mode: '100644',
          type: 'blob',
          content:base64Image,
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
      await octokit.repos.merge({
        owner: 'Tmoh-Squim',
        repo: 'mern-stack-ecommerce-web-app',
        base: defaultBranch,
        head: 'main', // Replace with your branch name
        commit_message: 'Merge feature branch into main', // Replace with your commit message
      });
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