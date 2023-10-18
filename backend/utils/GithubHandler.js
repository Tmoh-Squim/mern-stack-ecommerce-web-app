const { Octokit } = require('@octokit/rest');

const commitToGitHub = async (fileUrl) => {
    const octokit = new Octokit({
      auth: 'process.env.GITHUB_TOKEN', // Replace with your GitHub personal access token
    });
  
    const repoOwner = 'Tmoh-Squim'; // Replace with your GitHub username
    const repoName = 'mern-stack-ecommerce-web-app'; // Replace with your repository name
  
    const content = Buffer.from(JSON.stringify({ avatar: fileUrl })).toString('base64');
  
    try {
      const { data } = await octokit.repos.createOrUpdateFileContents({
        owner: repoOwner,
        repo: repoName,
        path: 'user-avatar.json', // Replace with the desired path and filename in your repo
        message: 'Update user avatar',
        content,
      });
  
      return data.commit.html_url; // Return the commit URL
    } catch (error) {
      console.error('Error committing to GitHub:', error);
      throw new Error('Failed to commit to GitHub');
    }
  };
  

module.exports = { commitToGitHub };
