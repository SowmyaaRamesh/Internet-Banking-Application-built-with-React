import React, { useState } from "react";

export const DepositCalculator = () => {
  const [calcDetails, setCalcDetails] = useState([{}]);

  const [showMaturityAmount, setShowMaturityAmount] = useState(false);

  const calculateReturns = (e) => {
    e.preventDefault();

    let interest_rate;
    switch (calcDetails.scheme) {
      case "RDP":
        interest_rate = 5.25;
        break;
      case "SDR":
        interest_rate = 5.4;
        break;
      default:
        console.log("Incorrect scheme chosen");
        break;
    }

    let amt = 0;
    let n = parseInt(calcDetails.tenure) / 12;
    let r = parseFloat(interest_rate) / 4;
    let p = parseFloat(calcDetails.amount);

    amt = p * Math.pow(1 + r / 100, 4 * n);
    setCalcDetails((prevState) => ({
      ...prevState,
      maturityAmount: parseFloat(amt.toFixed(2)),
    }));

    setShowMaturityAmount(true);

    // console.log(calcDetails);
  };

  return (
    <div>
      <h1>Calculate returns on your deposits to make the right choice!</h1>
      <form className="calculate-deposit-form">
        <label htmlFor="scheme">Scheme</label>
        <select
          name="scheme"
          id="scheme"
          onChange={(e) => {
            setCalcDetails((prevState) => ({
              ...prevState,
              scheme: e.target.value,
            }));
          }}
          value={calcDetails.scheme}
        >
          <option hidden value="default">
            --select scheme--
          </option>
          <option value="RDP">RDP</option>
          <option value="SDR">SDR</option>
          <option value="RDTAX">RDTAX</option>
        </select>
        <label htmlFor="amount">Amount of deposit</label>
        <input
          type="text"
          name="amount"
          id="amount"
          onChange={(e) => {
            setCalcDetails((prevState) => ({
              ...prevState,
              amount: e.target.value,
            }));
          }}
          value={calcDetails.amount}
        />
        <label htmlFor="tenure">Tenure</label>
        <input
          type="text"
          placeholder="months"
          onChange={(e) => {
            setCalcDetails((prevState) => ({
              ...prevState,
              tenure: e.target.value,
            }));
          }}
          value={calcDetails.tenure}
        />
        {showMaturityAmount && !isNaN(calcDetails.maturityAmount) && (
          <div>
            <label htmlFor="maturity-amount">Maturity Amount</label>
            <p>₹{calcDetails.maturityAmount}</p>
          </div>
        )}
        <input type="submit" value="Submit" onClick={calculateReturns} />
      </form>
    </div>
  );
};
