const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//SQL connection
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

let statementData;
let userId = "ray11";

app.post("/statement", (req, res) => {
  statementData = req.body.data;
});

app.get("/statement", (req, res) => {
  let query =
    "SELECT * FROM transactions WHERE account_number = " +
    statementData.acc +
    " AND date BETWEEN '" +
    statementData.from +
    "' AND '" +
    statementData.to +
    "';";

  // console.log(query);

  con.query(query, function (error, results) {
    if (error) throw error;
    console.log(results);
    res.send(results);
  });
});

app.get("/viewdeposits", (req, res) => {
  let query = "SELECT * FROM deposits WHERE user_id = '" + userId + "';";

  // console.log(query);

  con.query(query, function (error, results) {
    if (error) throw error;
    console.log(results);
    res.send(results);
  });
});
app.listen(5000, (req, res) => {
  console.log("Server listening on port 5000");
});
