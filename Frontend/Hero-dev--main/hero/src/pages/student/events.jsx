import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import testspimage from "../../assests/images/testI2sp.jpg"; // fallback image
import teacherService from "../../services/teacher.service";

function Sevent() {
  const [events, setEvents] = useState([]);
   const navigate = useNavigate();



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

  // Handle interest button click
  const handleInterestClick = (eventTitle) => {
    const confirmInterest = window.confirm(`Do you want to express interest in "${eventTitle}"?`);
    if (confirmInterest) {
      // Proceed with expressing interest (e.g., send a request to backend)
      alert(`Thank you for showing interest in "${eventTitle}"!`);
    }
  };

   const handleCardClick = (event) => {
    navigate(`/eventDetails/${event.name}`, { state: { event } });
  };

   return (
    <div className="container">
      <div className="row">
        {/* Left Section */}
        <div className="col-md-8 leftcontainer p-3 mt-4">
          {events.map((event) => (
            <div
              className="card mb-3"
              key={event._id}
              onClick={() => handleCardClick(event)}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body position-relative">
                <button
                  type="button"
                  className="btn position-absolute"
                  style={{
                    top: "10px",
                    right: "10px",
                    backgroundColor: "#FF0000",
                    borderColor: "#FF0000",
                    color: "white",
                    padding: "3px 7px",
                    fontSize: "0.85rem",
                    height: "32px",
                  }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent navigation
                    handleInterestClick(event.name);
                  }}
                >
                  Interest
                </button>

                <div className="d-flex align-items-center mt-3">
                  <img
                    src={event.media || testspimage}
                    className="img-fluid custom-pimg ms-2"
                    alt={event.name}
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                  <div className="d-flex flex-column ms-3">
                    <label className="mb-1 fw-bold">{event.name}</label>
                    <p className="mb-0">{event.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="col-md-4 rightcontainer p-3 bg-light mt-4">
          <h5>Upcoming Events</h5>
          <ul>
            {events.map((event) => (
              <li key={event._id}>{event.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sevent;
