import React, { useState, useEffect } from "react";
import axios from "axios";

export const OpenDeposit = () => {
  const [details, setDetails] = useState({
    scheme: "RDP",
    name: "",
    amount: "",
    tenure: "",
    maturityDate: "",
    account: "",
    openDate: "",
  });
  const [savingsAccounts, setSavingsAccounts] = useState([]);
  const [balanceAvailable, setBalanceAvailable] = useState(true);
  const [status, setStatus] = useState("");
  useEffect(() => {
    getAccounts();
  }, []);
  const getAccounts = async () => {
    const res = await axios.get("http://localhost:5000/chooseaccount");
    // console.log(res.data);
    setSavingsAccounts(res.data);
  };
  const setDate = () => {
    let date = new Date().toISOString().slice(0, 10);

    setDetails((prevState) => ({
      ...prevState,
      openDate: date,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/opendeposit", {
        data: details,
      })
      .catch((err) => {
        console.log(err);
      });

    setStatus("Your request has been received. It will be processed shortly.");
    setDetails({
      scheme: "RDP",
      name: "",
      amount: "",
      tenure: "",
      maturityDate: "",
      account: "",
      openDate: "",
    });
  };

  const checkAccountBalance = () => {
    let n = 0;
    savingsAccounts.forEach((acc) => {
      if (acc.balance > parseFloat(details.amount) + 1000) {
        // checks if the account will have min balance of Rs.1000 after transferring money to deposit account
        n += 1;
      }
    });

    n ? setBalanceAvailable(true) : setBalanceAvailable(false);
  };

  return (
    <div>
      <div className="open-deposit-form">
        <p>{status}</p>
        <h1>Request for New Deposit</h1>
        <form>
          <label htmlFor="name">Name of the depsitor</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => {
              setDetails((prevState) => ({
                ...prevState,
                name: e.target.value,
              }));
            }}
            value={details.name}
          />
          <label htmlFor="amount">Amount of Deposit</label>
          <input
            type="text"
            name="amount"
            id="amount"
            onChange={(e) => {
              setDetails((prevState) => ({
                ...prevState,
                amount: e.target.value,
              }));
            }}
            onBlur={checkAccountBalance}
            value={details.amount}
          />

          <label htmlFor="scheme">Scheme Code</label>
          <select
            name="scheme"
            id="scheme"
            onChange={(e) => {
              setDetails((prevState) => ({
                ...prevState,
                scheme: e.target.value,
              }));
            }}
          >
            <option value="RDP">RDP</option>
            <option value="SDR">SDR</option>
            <option value="RDTAX">RDTAX</option>
          </select>
          <label htmlFor="tenure">Tenure of Deposit</label>
          <input
            type="text"
            placeholder="months"
            onChange={(e) => {
              setDetails((prevState) => ({
                ...prevState,
                tenure: e.target.value,
              }));
            }}
            value={details.tenure}
            onBlur={() => {
              setDate();
              if (details.tenure > 0) {
                let date = new Date();
                var newDate = new Date(
                  date.setMonth(date.getMonth() + parseInt(details.tenure))
                )
                  .toISOString()
                  .slice(0, 10);
                console.log(newDate);
                setDetails((prevState) => ({
                  ...prevState,
                  maturityDate: newDate,
                }));
              }
            }}
          />
          <label htmlFor="account">Pay from</label>
          <select
            name="account"
            id="account"
            onChange={(e) => {
              setDetails((prevState) => ({
                ...prevState,
                account: e.target.value,
              }));
            }}
            value={details.account}
          >
            {}
            <option hidden value="default">
              {balanceAvailable ? "select account" : "Insufficient Funds"}
            </option>
            {savingsAccounts.map(
              (acc, i) =>
                acc.balance > details.amount && (
                  <option value={acc.account_number} key={i}>
                    {acc.account_number}|Balance:{acc.balance}
                  </option>
                )
            )}
          </select>

          <label htmlFor="maturityDate">Maturity Date</label>
          <p>{details.maturityDate}</p>
          <input type="submit" value="Submit" onClick={submitForm} />
        </form>
      </div>
    </div>
  );
};
