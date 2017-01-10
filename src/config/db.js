/* .env lib */
require('dotenv').config();

/* DB Config */
const connection = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  pool: { min: process.env.DB_POOL_MIN, max: process.env.DB_POOL_MAX },
});

module.exports = connection;
