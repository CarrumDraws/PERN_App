const Pool = require("pg").Pool; // 'pg' library used for interacting with PostgresDB.
// Pool allows us to set a configuration for what/where we want to connect the DB.

const pool = new Pool({
  user: "postgres",
  password: "Pinecone250",
  database: "authtodolist",
  host: "localhost",
  port: 5432,
});

module.exports = pool; // This is the CommonJS version of 'export'
