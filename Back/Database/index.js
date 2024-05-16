const mysql = require('mysql2/promise');
const config = require('./config.js');

const pool = mysql.createPool(config);

pool.getConnection()
  .then(connection => {
    console.log('Database is connected');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to database:', err.message);
    process.exit(1);
  });

module.exports = pool;
