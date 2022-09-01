const Pool = require("pg").Pool; // 'pg' library used for interacting with PostgresDB.
// Pool allows us to set a configuration for what/where we want to connect the DB.

require("dotenv").config(); 

// Use ENV file data instead of hardcoding
// const devConfig = {
//   user: process.env.PG_USER,
//   password: process.env.PG_PASSWORD,
//   database: process.env.PG_DATABASE,
//   host: process.env.PG_HOST,
//   port: process.env.PG_PORT,
// };

// Heroku > App > Settings
const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const proConfig = process.env.DATABASE_URL // heroku addons (?)

const pool = new Pool({
  connectionString : process.env.NODE_ENV === "production" ? proConfig : devConfig
});

// const pool = new Pool({
//   user: "postgres",
//   password: "Pinecone250",
//   database: "authtodolist",
//   host: "localhost",
//   port: 5432,
// });

module.exports = pool; // This is the CommonJS version of 'export'
