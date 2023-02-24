const express = require("express");
const mysql = require('mysql2');
const doenv = require("dotenv");
const app = express();

doenv.config({
  path: "./.env",
});
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Connection Success");
  }
});

//console.log(__dirname);
app.use("/auth", require("./src/routes/route"));

app.listen(5000, () => {
  console.log("Server Started @ Port 5000");
});

