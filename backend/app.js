const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "bankdb",
});

con.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + con.threadId);
});

app.listen(5000, (req, res) => {
  console.log("Server listening on port 5000");
});
