import "./Status.css";
import React from "react";


function Status() {
    return (
      <>
      <div className="status-card shadow">
        <div className="status-card-1">
            <div className="status-text">Total Issues</div>
            <div className="status-text">Today's Issues</div>
            <div className="status-number-left">23_000</div>
            <div className="status-number-right">45</div>
        </div>
        <div className="status-card-1">
            <div className="status-text">Resolved Issues</div>
            <div className="status-text">Remaining Issues</div>
            <div className="status-number-left">23_000</div>
            <div className="status-number-right">45</div>
        </div>
        <div className="status-card-1">
            <div className="status-text">Highest No. of Issues from</div>
            <div className="status-text">Status</div>
            <div className="status-number-left">Maharastra</div>
            <div className="status-number-right">OK</div>
        </div>

      </div>
      </>
    );
  }
  

export default Status;