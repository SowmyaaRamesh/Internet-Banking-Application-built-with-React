import React, { useState } from "react";
import axios from "axios";

export const ViewStatement = () => {
  const [statements, setStatements] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const getStatement = async () => {
    const res = await axios.get("http://localhost:5000/statement");
    // console.log("data recv from db", res.data);
    setStatements(res.data);
    // console.log("stmt:", statements);
  };

  const handleClick = () => {
    let data = {
      from: fromDate,
      to: toDate,
      acc: accountNumber,
    };
    // console.log("posting:", data);
    axios
      .post("http://localhost:5000/statement", {
        data: data,
      })

      .catch((err) => {
        console.log(err);
      });
    // console.log("Dates posted to /statment");
    getStatement();
  };

  return (
    <div>
      <div className="date-form">
        <label htmlFor="account-no">Account Number</label>
        <input
          type="text"
          name="account-no"
          id="account-no"
          value={accountNumber}
          onChange={(e) => {
            setAccountNumber(e.target.value);
          }}
        />
        <label htmlFor="from-date">From</label>
        <input
          type="date"
          name="from-date"
          id="from-date"
          onChange={(e) => {
            setFromDate(e.target.value);
          }}
          value={fromDate}
        />
        <label htmlFor="to-date">To</label>
        <input
          type="date"
          name="to-date"
          id="to-date"
          value={toDate}
          onChange={(e) => {
            setToDate(e.target.value);
          }}
        />
        <button onClick={handleClick}>Go</button>
      </div>
      <div className="statement-result">
        <table>
          <thead>
            <tr>
              <th>Transaction Id</th>
              <th>Date</th>
              <th>Time</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {statements.map((stmt) => (
              <tr>
                <td>{stmt.transaction_id}</td>
                <td>{stmt.date.slice(0, 10)}</td>
                <td>{stmt.time}</td>
                <td>₹{stmt.amount}</td>
                <td>{stmt.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
