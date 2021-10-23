const mysql = require("mysql");
const fs = require("fs");
require("dotenv").config();

let connectionObject = {
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.DATABASE_USER,
  password: process.env.PASSWORD,
  port: parseInt(process.env.DATABASE_PORT),
  multipleStatements: true,
};

let connection = mysql.createConnection(connectionObject);

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  //console.log("connected as id " + connection.threadId);
});

module.exports = connection;
