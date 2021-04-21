import React, { useState } from "react";

export const OpenDeposit = () => {
  const [details, setDetails] = useState({});
  const setDate = () => {
    let date = new Date().toISOString().slice(0, 10);

    setDetails((prevState) => ({
      ...prevState,
      openDate: date,
    }));
  };
  const tenureChange = (e) => {
    console.log(e.target.value);
    // setDate();
    setDetails((prevState) => ({
      ...prevState,
      tenure: e.target.value,
    }));
    console.log(details);
    // if (details.tenure > 0) {
    //   let date = new Date();
    //   var newDate = new Date(date.setMonth(date.getMonth() + details.tenure))
    //     .toISOString()
    //     .slice(0, 10);
    //   console.log(newDate);
    //   setDetails((prevState) => ({
    //     ...prevState,
    //     maturityDate: newDate,
    //   }));
    // }
  };

  return (
    <div>
      <div className="open-deposit-form">
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
          />
          <label htmlFor="amount">Amount of Deposit</label>
          <input type="text" name="amount" id="amount" />
          <label htmlFor="autoRenewal">Auto Renewal</label>
          <input type="radio" id="yes" name="autoRenewal" value="yes" />
          <label htmlFor="yes">Yes</label>
          <input type="radio" id="no" name="autoRenewal" value="no" />
          <label htmlFor="no">No</label>
          <br />
          <label htmlFor="scheme">Scheme Code</label>
          <select name="scheme" id="scheme">
            <option value="rdp">RDP</option>
            <option value="sdr">SDR</option>
            <option value="rdtax">RDTAX</option>
          </select>
          <label htmlFor="tenure">Tenure of Deposit</label>
          <input
            type="text"
            placeholder="months"
            onChange={tenureChange}
            value={details.tenure}
          />
        </form>
      </div>
    </div>
  );
};
