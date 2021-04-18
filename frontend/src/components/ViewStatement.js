import React from "react";

export const ViewStatement = () => {
  return (
    <div>
      <div className="date-form">
        <label htmlFor="from-date">From</label>
        <input type="date" name="from-date" id="from-date" />
        <label htmlFor="to-date">To</label>
        <input type="date" name="to-date" id="to-date" />
      </div>
    </div>
  );
};
