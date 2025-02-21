const jwt = require('jsonwebtoken');

const generateToken = (username, secretKey) => {
  const token = jwt.sign( {username}, secretKey, { expiresIn: "1d" } );
  return token;
}

module.exports = {
  generateToken
}