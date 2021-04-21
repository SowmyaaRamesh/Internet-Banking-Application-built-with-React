import React, { useState } from "react";
import axios from "axios";
import { ViewDeposit } from "./ViewDeposit";
import { OpenDeposit } from "./OpenDeposit";

export const Deposit = () => {
  const [deposits, setDeposits] = useState([]);
  const [showOpen, setShowOpen] = useState(false);
  const [showView, setShowView] = useState(false);

  const getDepositDetails = async () => {
    const res = await axios.get("http://localhost:5000/viewdeposits");
    console.log("data recv from db", res.data);
    setDeposits(res.data);
    // console.log("stmt:", statements);
  };

  return (
    <div>
      <div className="deposit-buttons">
        <button
          onClick={() => {
            setShowView(!showView);
            setShowOpen(false);
            getDepositDetails();
          }}
        >
          View Deposits
        </button>
        <button
          onClick={() => {
            setShowView(false);
            setShowOpen(!showOpen);
          }}
        >
          Open Deposits
        </button>
        <button>Deposit Calculator</button>
      </div>
      <div className="results">
        {showView && <ViewDeposit deposits={deposits} />}
        {showOpen && <OpenDeposit />}
      </div>
    </div>
  );
};
