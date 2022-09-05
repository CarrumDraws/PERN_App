const Pool = require("pg").Pool; // 'pg' library used for interacting with PostgresDB.
// Pool allows us to set a configuration for what/where we want to connect the DB.

require("dotenv").config(); 

// Heroku > App > Settings
// const devConfig = `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const devConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
};

const proConfig = process.env.DATABASE_URL; // From Heroku Postgres

const pool = new Pool(process.env.NODE_ENV === "production" ? proConfig : devConfig );

module.exports = pool; // This is the CommonJS version of 'export'

// const pool = new Pool({
//   connectionString : process.env.NODE_ENV === "production" ? proConfig : devConfig
// });

// const pool = new Pool({
//   user: "postgres",
//   password: "Pinecone250",
//   database: "authtodolist",
//   host: "localhost",
//   port: 5432,
// });