import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./teacherNotification.css";
import io from "socket.io-client";

// Initialize socket connection
const socket = io("http://localhost:5000"); // replace with your backend URL if needed

function Tnotification() {
  const [notifications, setNotifications] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState({
    assignment: false,
    announcement: false,
    message: false,
    general: false,
  });

  useEffect(() => {
    // Listen to socket for new notifications
    socket.on("newNotification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => {
      socket.off("newNotification");
    };
  }, []);

  // Handle checkbox changes
  const handleFilterChange = (type) => {
    setSelectedTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // Filter logic
  const filteredNotifications = notifications.filter((n) =>
    Object.values(selectedTypes).some(Boolean)
      ? selectedTypes[n.type]
      : true
  );

  return (
    <div className="container">
      <div className="row">
        {/* LEFT SIDE */}
        <div className="col-md-8 leftcontainer p-3 mt-4 h-100">
          <div className="d-flex align-items-center justify-content-between w-100">
            <h1 className="notification">Teacher Notification</h1>
            <input
              type="text"
              className="form-control w-50"
              placeholder="Search..."
            />
          </div>
          <hr />

          {filteredNotifications.length === 0 ? (
            <p>No New Notification</p>
          ) : (
            filteredNotifications.map((notification, index) => (
              <div className="card mb-2" key={index}>
                <div className="card-body">
                  <strong>{notification.type.toUpperCase()}</strong>:{" "}
                  {notification.message}
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT SIDE - FILTERS */}
        <div className="col-md-4 rightcontainer p-3 bg-light mt-4">
          <label className="filterName fs-5 mb-3">Filter by Type</label>
          <div className="ms-2">
            {["assignment", "announcement", "message", "general"].map((type) => (
              <div className="form-check" key={type}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`check-${type}`}
                  checked={selectedTypes[type]}
                  onChange={() => handleFilterChange(type)}
                />
                <label className="form-check-label" htmlFor={`check-${type}`}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tnotification;
