const path = require("path");
const dotenv = require("dotenv");
const envFilePath = path.join(__dirname, "..", "..", ".env");
dotenv.config({ path: envFilePath });

module.exports = {
  development: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.NAME_SQL,
    dialectOptions: {
      useUTC: false, // for reading from database
      timezone: "+07:00", // set timezone to UTC+07:00 for reading from database
    },
    timezone: "+07:00", // set timezone to UTC+07:00 for writing to database
  },
  test: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.NAME_SQL,
    //timezone: "+00:00",
  },
  production: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.NAME_SQL,
    timezone: "+00:00",
  },
};
