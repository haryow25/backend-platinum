const env = process.env.NODE_ENV || "development";
const upperCaseEnv = env.toUpperCase();
if (process.env.NODE_ENV === "development") require("dotenv").config();

module.exports = {
  development: {
    username: "postgres",
    password: "jancuk25",
    database: "database_be-3",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "postgres",
    password: "jancuk25",
    database: "database_be-3",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "postgres",
    password: "jancuk25",
    database: "database_be-3",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
