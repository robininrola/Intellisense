const fs = require('fs');
const path = require('path');

function getCredentials() {
  let email, password;

  if (process.env.CI) {
    email = process.env.EMAIL;
    password = process.env.PASSWORD;
  } else {
    const credentials = JSON.parse(
      fs.readFileSync(path.join(__dirname, process.env.userCredentialsFilePath), 'utf-8')
    );
    email = credentials.email;
    password = credentials.password;
  }

  return { email, password };
}

module.exports = { getCredentials };