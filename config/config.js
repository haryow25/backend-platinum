const env = process.env.NODE_ENV || "development";
const upperCaseEnv = env.toUpperCase();
if (process.env.NODE_ENV === "development") require("dotenv").config();

module.exports = {
  development: {
    username: "xvcfsiawvxhbvw",
    password: "ca18f876a588fecebb085588724a4d4b05fc827953b8d2fafdb91860899a6bba",
    database: "dcg524c9or0897",
    host: "ec2-3-223-242-224.compute-1.amazonaws.com",
    dialect: "postgres",
  },
  test: {
    username: "xvcfsiawvxhbvw",
    password: "ca18f876a588fecebb085588724a4d4b05fc827953b8d2fafdb91860899a6bba",
    database: "dcg524c9or0897",
    host: "ec2-3-223-242-224.compute-1.amazonaws.com",
    dialect: "postgres",
  },
  production: {
    username: "xvcfsiawvxhbvw",
    password: "ca18f876a588fecebb085588724a4d4b05fc827953b8d2fafdb91860899a6bba",
    database: "dcg524c9or0897",
    host: "ec2-3-223-242-224.compute-1.amazonaws.com",
    dialect: "postgres",
  },
};
