import React from "react";

export const Home = () => {
  return (
    <div>
      <div className="header">
        <h1>Internet Banking</h1>
        <h3>Bank Securely 24x7</h3>
        <a href="#services">Get Started</a>
        <div className="image"></div>
      </div>
      <h1 className="service-header">Services offered</h1>
      <div className="services" id="services">
        <button>Pin Change</button>
        <button>Funds Transfer</button>
        <button>View Balance</button>
        <button>Account Statement</button>
        <button>Manage Deposits</button>
        <button>Insurance Policy</button>
      </div>
      <div className="footer">
        <p>Copyright &copy; 2020. All rights reserved.</p>
      </div>
    </div>
  );
};
