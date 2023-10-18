const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN, // Use your GitHub personal access token
});

// Function to create a new commit and push to GitHub
async function commitToGitHub(filePath, content) {
  try {
    const { data: repo } = await octokit.repos.get({
      owner: 'Tmoh-Squim',
      repo: 'mern-stack-ecommerce-web-app',
    });

    const tree = await octokit.git.createTree({
      owner: 'Tmoh-Squim',
      repo: 'mern-stack-ecommerce-web-app',
      base_tree: repo.data.default_branch,
      tree: [
        {
          path: filePath,
          mode: '100644',
          type: 'blob',
          content: Buffer.from(content).toString('base64'),
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
      ref: `heads/${repo.data.default_branch}`,
      sha: commit.data.sha,
    });

    console.log('File pushed to GitHub successfully.');
  } catch (error) {
    console.error('Error pushing file to GitHub:', error);
  }
}
module.exports={commitToGitHub}
// Use this function after uploading a file to Multer
// Example: commitToGitHub('uploads/file.txt', 'File content');
