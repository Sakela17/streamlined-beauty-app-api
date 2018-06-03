const bcrypt = require('bcryptjs');

const hashPassword = password => {
  return bcrypt.hash(password, 10);
};

const compareHashPasswords = (password, dbPassword) => {
  return bcrypt.compare(password, dbPassword);
};

module.exports = { hashPassword, compareHashPasswords };