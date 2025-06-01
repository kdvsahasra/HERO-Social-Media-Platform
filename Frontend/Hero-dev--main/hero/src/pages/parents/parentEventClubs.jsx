import React, { useState } from "react";
import axios from "axios";
import "./parentEventClubs.css";
import Pdetails from "../../components/pdetails"
import Pevent from "./pEvents"
import Pclub from "./pclubs"

function PeventClubs() {
  const [activeTab, setActiveTab] = useState("friends");
  return (
    <div className="container">
       
      <Pdetails />
      
      <div className="tab-buttons mt-4 ms-3">
            <button
                className={`tab-btn ${activeTab === "friends" ? "active" : ""}`}
                onClick={() => setActiveTab("friends")}
            >
                Events
            </button>
            <button
                className={`tab-btn ${activeTab === "requests" ? "active" : ""}`}
                onClick={() => setActiveTab("requests")}
            >
                Clubs
            </button>
        </div>

        <div className="tab-content mt-4 ms-3">
            {activeTab === "friends" && <Pevent />}
            {activeTab === "requests" && <Pclub />}
        </div>
       
    </div>
  );
}

export default PeventClubs;
