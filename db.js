const { Pool } = require("pg"); // 'pg' library used for interacting with PostgresDB.
require("dotenv").config(); 

// Heroku > App > Settings
const devConfig = `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

// const devConfig = {
//   user: process.env.PG_USER,
//   password: process.env.PG_PASSWORD,
//   database: process.env.PG_DATABASE,
//   host: process.env.PG_HOST,
//   port: process.env.PG_PORT,
// };

console.log("Currently " + process.env.NODE_ENV);
console.log("With DATABASE_URL: " + process.env.DATABASE_URL);

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "production"
      ? process.env.DATABASE_URL
      : devConfig,
    ssl: {
      rejectUnauthorized: false,
    },
});

// pool.connect();

module.exports = pool; // This is the CommonJS version of 'export'

// Programmatic Method
// const pool = new Pool({
//   user: "postgres",
//   password: "Pinecone250",
//   database: "authtodolist",
//   host: "localhost",
//   port: 5432,
// });

// // URI Method
// const pool = new Pool({
//   'postgresql://dbuser:secretpassword@database.server.com:3211/mydb',
// })


