const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(5000, (req, res) => {
  console.log("Server listening on port 5000");
});
