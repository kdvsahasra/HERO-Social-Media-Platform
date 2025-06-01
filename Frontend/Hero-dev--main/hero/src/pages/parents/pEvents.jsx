import React, { useState, useEffect } from "react";
import axios from "axios";
import "./friendRequest.css";
import teacherService from "../../services/teacher.service";

function PEvents() {
    const [events, setEvents] = useState([]); 
    
useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchEvents = await teacherService.getAllEvents();

        const fetchUploadedEvetns = fetchEvents.map((post) =>({
          name: post.name,
          description: post.description,
          media: post.media[0] || null,

        }));
        setEvents(fetchUploadedEvetns);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);
    
        return (
            <div className="request-container">
                <ul className="list-group">
                    {events.map((event, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-3">
                                <div className="circle-avatar"></div>
                                <span>{event.name}</span>
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

export default PEvents;