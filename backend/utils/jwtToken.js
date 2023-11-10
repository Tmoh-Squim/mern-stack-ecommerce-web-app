// create token and saving that in cookies
const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  const script = `
    <script>
      // Set the token in localStorage
      localStorage.setItem('token', '${token}');
      // Optionally, redirect or perform additional actions
      // window.location.href = '/dashboard';
    </script>
  `;

  res.status(statusCode).send(script);
};

module.exports = sendToken;
