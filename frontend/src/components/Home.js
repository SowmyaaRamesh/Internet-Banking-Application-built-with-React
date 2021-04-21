import React from "react";
import { Link } from "react-router-dom";

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
        <Link className="homepage-btn" to="">
          Pin Change
        </Link>
        <Link className="homepage-btn" to="">
          Funds Transfer
        </Link>
        <Link className="homepage-btn" to="">
          View Balance
        </Link>

        <Link className="homepage-btn" to="/viewstatement">
          Account Statement
        </Link>

        <Link className="homepage-btn" to="/deposits">
          Manage Deposits
        </Link>

        <Link className="homepage-btn" to="">
          Insurance Policy
        </Link>
      </div>
      <div className="footer">
        <p>Copyright &copy; 2020. All rights reserved.</p>
      </div>
    </div>
  );
};
