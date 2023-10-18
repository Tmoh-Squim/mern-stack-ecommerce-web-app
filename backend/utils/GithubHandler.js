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
    // Read the file content
    const content = Buffer.from(JSON.stringify({ avatar: fileUrl })).toString('base64');
    let defaultBranch = 'main';  // Default branch to 'main' if not obtained from GitHub

if (repo.data && repo.data.default_branch) {
  defaultBranch = repo.data.default_branch;
} else {
  console.error('Unable to obtain default branch from GitHub API. Using default branch as "main".');
}
    const tree = await octokit.git.createTree({
      owner: 'Tmoh-Squim',
      repo: 'mern-stack-ecommerce-web-app',
      base_tree: defaultBranch,
      tree: [
        {
          path: `backend/uploads/${fileUrl}`,
          mode: '100644',
          type: 'blob',
          content,
        },
      ],
    });
    const commitSha = repo?.data?.commit?.sha || null;
    const commit = await octokit.git.createCommit({
      owner: 'Tmoh-Squim',
      repo: 'mern-stack-ecommerce-web-app',
      message: 'Add uploaded file',
      tree: tree.data.sha,
      parents: commitSha,
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
