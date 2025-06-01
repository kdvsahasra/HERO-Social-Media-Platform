import React, {useState, useEffect, useRef} from "react";
import testimage from "../../assests/images/classroomtest.jpg"
import testspimage from "../../assests/images/testI2sp.jpg"
import teacherService from "../../services/teacher.service";

function Tevent() {
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
     return(
            <div className="container">
            <div className="row">
              {/* Left Section (Wider - 8 columns) */}
              <div className="col-md-8 leftcontainer p-3 mt-4">
                
                {/* Add Group Button - Only in Left Section */}
                <div className="mb-3 text-end">
                <a href="http://localhost:3000/createEvent" className="btn" style={{ background: "#7E0AA1", color: "white" }}>
                  Add Event
                </a>
              </div>

      
                {/* Card Content */}
               {events.map((event, index) => (
            <div className="card mb-3" key={index}>
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
                >
                  Delete
                </button>

                <div className="d-flex align-items-center mt-3">
                  <img
                    src={
                      event.media
                 // fallback image
                    }
                    className="img-fluid custom-pimg ms-2"
                    alt="event"
                    style={{ cursor: "pointer", width: "100px", height: "100px", objectFit: "cover" }}
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
      
              {/* Right Section (Smaller - 4 columns) */}
              <div className="col-md-4 rightcontainer p-3 bg-light mt-4"></div>
            </div>
          </div>
            
        );
}

export default Tevent;