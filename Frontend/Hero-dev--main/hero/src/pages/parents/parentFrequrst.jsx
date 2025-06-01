import React, { useState } from "react";
import "./parentFrequrst.css";
import Pdetails from "../../components/pdetails";
import Freinds from "./friend"; // make sure path is correct
import Requests from "./friendRequest"

function Pfriends() {
    const [activeTab, setActiveTab] = useState("friends");

    return (
        <div className="container">
        <Pdetails />

        <div className="tab-buttons mt-4 ms-3">
            <button
                className={`tab-btn ${activeTab === "friends" ? "active" : ""}`}
                onClick={() => setActiveTab("friends")}
            >
                Friends
            </button>
            <button
                className={`tab-btn ${activeTab === "requests" ? "active" : ""}`}
                onClick={() => setActiveTab("requests")}
            >
                Friend Request
            </button>
        </div>

        <div className="tab-content mt-4 ms-3">
            {activeTab === "friends" && <Freinds />}
            {activeTab === "requests" && <Requests />}
        </div>
    </div>
    );
}

export default Pfriends;
