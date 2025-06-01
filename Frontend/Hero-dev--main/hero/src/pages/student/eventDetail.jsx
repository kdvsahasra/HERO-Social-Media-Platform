import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import testspimage from "../../assests/images/testI2sp.jpg"; // fallback image

function Event() {
  const location = useLocation();
  const navigate = useNavigate();
  const { event } = location.state || {};

  if (!event) {
    return <div>No event data found!</div>;
  }

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        Back
      </button>
      <div className="card p-4">
        <h2 className="mb-3">{event.name}</h2>
        <img
          src={event.media || testspimage}
          alt={event.name}
          style={{ width: "100%", height: "300px", objectFit: "cover" }}
        />
        <p className="mt-3">{event.description}</p>
      </div>
    </div>
  );
}

export default Event;
