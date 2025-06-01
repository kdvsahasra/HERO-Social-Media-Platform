import React, { useState, useEffect } from "react";
import axios from "axios";
import "./friendRequest.css";

function FRequests() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        // Dummy data for now; you can replace with actual API later
        setRequests([
            "Darshana Weerasooriya",
            "Diduli Vijini",
            "Shashini Bhagya",
            "Navodya Ediriweera"
        ]);
    }, []);

    return (
        <div className="request-container">
            <ul className="list-group">
                {requests.map((name, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-3">
                            <div className="circle-avatar"></div>
                            <span>{name}</span>
                        </div>
                        <div className="d-flex gap-2">
                            <button className="btn btn-accept">Accept</button>
                            <button className="btn btn-decline">Decline</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FRequests;