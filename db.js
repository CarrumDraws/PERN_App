const { Pool } = require("pg");
require("dotenv").config();

// Development
// const devConfig = {
//   user: process.env.PG_USER,
//   password: process.env.PG_PASSWORD,
//   database: process.env.PG_DATABASE,
//   host: process.env.PG_HOST,
//   port: process.env.PG_PORT,
// };

// Production
const devConfig = `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "production"
      ? process.env.DATABASE_URL // From Heroku-Postgres
      : devConfig,
  ssl: {
    // Remove when run locally
    rejectUnauthorized: false,
  },
});

module.exports = pool;
