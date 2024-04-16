const db = require('../Database/index.js');

function getOneUser(email) {
  return db.execute('SELECT * FROM user WHERE email = ?', [email]);
}

module.exports = { getOneUser };