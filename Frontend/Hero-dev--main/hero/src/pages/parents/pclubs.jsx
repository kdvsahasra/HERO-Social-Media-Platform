import React, { useState, useEffect } from "react";
import axios from "axios";
import "./friendRequest.css";
import teacherService from "../../services/teacher.service";


function PClubs() {
     const [requests, setRequests] = useState([]);
     const [clubs, setClubs] = useState([]);  
           useEffect(() => {
    const fetchClubs = async () => {
      try {
        const fetchClubs = await teacherService.getAllClubs();

        const fetchUploadedClubs = fetchClubs.map((post) =>({
          clubName: post.clubName,
          description: post.description,

        }));
        setClubs(fetchUploadedClubs);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchClubs();
  }, []);
        
            return (
                <div className="request-container">
                    <ul className="list-group">
                        {clubs.map((club, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="circle-avatar"></div>
                                    <span>{club.clubName}</span>
                                </div>
                                <div className="d-flex gap-2">
                                    <button className="btn btn-accept">View</button>
                                    <button className="btn btn-decline bg-red">Leave</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );


}

export default PClubs;