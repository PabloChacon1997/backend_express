const bcrypt = require('bcrypt')

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt);
}

const checkPassword = async(enterPassword, storedHash) => {
  return await bcrypt.compare(enterPassword, storedHash);
}

module.exports = {
  hashPassword,
  checkPassword
}