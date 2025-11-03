const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'webcourse.cs.nuim.ie',
  user: 'u240619',
  password: 'ri3zeeshaiJeePha',
  database: 'cs230_u240619',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;