import React from "react";
import { useLocation } from "react-router-dom";

function GroupDetail() {
  const location = useLocation();
  const { group } = location.state || {}; // retrieve group passed from Sgroup

  if (!group || !group.clubId) {
    return <div>No group data found!</div>;
  }

  const { name, description, imageUrl } = group.clubId;

  return (
    <div className="container mt-4">
      <div className="card p-4">
        <h2 className="mb-3">{name}</h2>
        <img
          src={imageUrl}
          alt={name}
          style={{ width: "100%", height: "300px", objectFit: "cover" }}
        />
        <p className="mt-3">{description}</p>
      </div>
    </div>
  );
}

export default GroupDetail;
