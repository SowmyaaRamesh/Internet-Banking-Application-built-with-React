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
let userId = "elisa";
let openDepositStatus;

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
    // console.log(results);
    res.send(results);
  });
});

app.get("/viewdeposits", (req, res) => {
  let query = "SELECT * FROM deposits WHERE user_id = '" + userId + "';";

  // console.log(query);
  con.query(query, function (error, results) {
    if (error) throw error;
    res.send(results);
  });
});

const getMaturityAmount = (n, r, p) => {
  // interest on deposits is being compounded quarterly
  let amt = 0;
  n = parseInt(n) / 12;
  r = parseFloat(r) / 4;

  a = parseFloat(p) * Math.pow(1 + r / 100, 4 * n);
  return parseFloat(a.toFixed(2));
};

app.post("/opendeposit", (req, res) => {
  const depositDetails = req.body.data;

  openDepositStatus = 0;

  // find last deposit number allocated and increment to find new deposit number
  let query =
    "SELECT deposit_number FROM bankdb.deposits ORDER BY deposit_number DESC limit 1;";
  con.query(query, function (error, results) {
    if (error) throw error;
    let n = parseInt(results[0].deposit_number) + 1;

    //fixing interest rates based on scheme
    let interest_rate;
    switch (depositDetails.scheme) {
      case "RDP":
        interest_rate = 5.25;
        break;
      case "SDR":
        interest_rate = 5.4;
        break;
    }

    let maturity_amount = getMaturityAmount(
      depositDetails.tenure,
      interest_rate,
      depositDetails.amount
    );

    // // creating values array with deposit details to insert into DB
    // let values = [];
    // values.push(String(n));
    // values.push(depositDetails.scheme);
    // values.push(depositDetails.openDate);
    // values.push(parseInt(depositDetails.tenure));
    // values.push(parseFloat(depositDetails.amount));
    // values.push(depositDetails.maturityDate);
    // values.push(maturity_amount);
    // values.push(interest_rate);
    // values.push(parseFloat(depositDetails.amount));
    // values.push(userId);

    // console.log(values);

    let query =
      " INSERT INTO deposits(deposit_number, scheme,open_date,tenure,deposit_amount,maturity_date,maturity_amount,interest_rate,balance,user_id) VALUES('" +
      String(n) +
      "','" +
      depositDetails.scheme +
      "','" +
      depositDetails.openDate +
      "','" +
      depositDetails.tenure +
      "','" +
      depositDetails.amount +
      "','" +
      depositDetails.maturityDate +
      "','" +
      maturity_amount +
      "','" +
      interest_rate +
      "','" +
      depositDetails.amount +
      "','" +
      userId +
      "')";
    // console.log(query);

    con.query(query, function (error, result) {
      if (error) throw error;
      console.log("Number of records inserted: " + result.affectedRows);
      if (result.affectedRows == 1) {
        openDepositStatus = 1;

        let selectQuery =
          "SELECT balance from accounts where account_number = '" +
          depositDetails.account +
          "'";

        con.query(selectQuery, function (err, res) {
          if (err) throw err;
          // console.log(res);
          let balance = res[0].balance - depositDetails.amount;
          let updateQuery =
            "UPDATE accounts SET balance = " +
            balance +
            " WHERE account_number='" +
            depositDetails.account +
            "'";
          // console.log(updateQuery);
          con.query(updateQuery, (err, res) => {
            if (err) throw err;
            console.log("Number of records updated: " + result.affectedRows);

            //Inserting record into transactions DB
            let GetSequenceNumQuery =
              "SELECT transaction_id FROM bankdb.transactions ORDER BY transaction_id DESC limit 1;";
            con.query(GetSequenceNumQuery, function (error, results) {
              if (error) throw error;
              let num = parseInt(results[0].transaction_id) + 1;
              let date = new Date();
              var currentTime = date.toLocaleTimeString("en-GB");
              let transactionQuery =
                " INSERT INTO transactions(transaction_id, account_number,amount,date,time,description) VALUES('" +
                String(num) +
                "','" +
                depositDetails.account +
                "','" +
                depositDetails.amount +
                "','" +
                depositDetails.openDate +
                "','" +
                currentTime +
                "','Transferred to deposit'" +
                ")";

              con.query(transactionQuery, (err, res) => {
                if (err) throw err;
                console.log("Record inserted into transactions db.");
              });
            });
          });

          // res.send(results);
        });
      }
    });
  });
});

// app.get("/opendeposit", (req, res) => {
//   if (openDepositStatus) {
//     console.log("sent fro backend");
//     res.send("Your request has been received. It will be processed shortly.");
//   }
// });

app.get("/chooseaccount", (req, res) => {
  let query =
    " select account_number,balance from accounts where user_id='" +
    userId +
    "';";

  con.query(query, function (error, results) {
    if (error) throw error;
    res.send(results);
  });
});

app.listen(5000, (req, res) => {
  console.log("Server listening on port 5000");
});
