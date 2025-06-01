import React, { useState } from "react";
import axios from "axios";


function Freinds() {

    const friends = [
        "Darshana Weerasooriya",
        "Diduli Vijini",
        "Shashini Bhagya",
        "Navodya Ediriweera",
    ];

    return (
        <ul className="list-group list-group-flush">
            {friends.map((friend, index) => (
                <li key={index} className="list-group-item d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <div className="friend-avatar me-3"></div>
                        <span>{friend}</span>
                    </div>
                    <button className="btn btn-danger btn-sm">Remove</button>
                </li>
            ))}
        </ul>
    );

}

export default Freinds;