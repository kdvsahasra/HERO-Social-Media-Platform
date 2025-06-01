import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import testimage from "../../assests/images/classroomtest.jpg";
import teacherService from "../../services/teacher.service";

function Sgroup() {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const[invitedClubs, setInvitedClubs] = useState([]);
 

  useEffect(() =>{
    const fetchClubs = async () =>{
      try {
        const data = await teacherService.getInvitedClubs();
        setInvitedClubs(data);
      } catch (error) {
        console.error("Error fetching invited clubs", error.message);
      }
    };
    fetchClubs();
  }, []);

  const handleAcceptClick = async (e, clubId, clubName) => {
    e.stopPropagation();
    const confirmJoin = window.confirm(`Do you want to join "${clubName}"?`);
    if (confirmJoin) {
      try {
        await teacherService.acceptInvite(clubId);
        alert(`You have successfully joined "${clubName}"!`);

        // Remove the accepted club from the UI
        setInvitedClubs(prev =>
          prev.filter(invite => invite.clubId._id !== clubId)
        );
      } catch (error) {
        console.error("Error accepting invitation:", error.message);
        alert("Failed to accept the invitation.");
      }
    }
  };

  const handleCardClick = (group) => {
    navigate(`/stduentGDetails/${group._id}`, { state: { group } });
  };

  return (
     <div className="container">
      <div className="row">
        {/* Left Section */}
        <div className="col-md-8 leftcontainer p-3 mt-4">
          {invitedClubs.map((invite) => (
            <div
              className="card mb-3"
              key={invite.clubId._id}
              onClick={() => handleCardClick(invite)}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body position-relative">
                <button
                  type="button"
                  className="btn position-absolute"
                  style={{
                    top: "10px",
                    right: "10px",
                    backgroundColor: "#9C6FE4",
                    borderColor: "#9C6FE4",
                    color: "white",
                    padding: "3px 7px",
                    fontSize: "0.85rem",
                    height: "32px",
                  }}
                  onClick={(e) =>
                    handleAcceptClick(e, invite.clubId._id, invite.clubName)
                  }
                >
                  Accept
                </button>

                <div className="d-flex align-items-center mt-3">
                  <img
                    src={invite.clubId.imageUrl || testimage}
                    className="img-fluid custom-pimg ms-2"
                    alt={invite.clubId.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      pointerEvents: "none",
                    }}
                  />
                  <div className="d-flex flex-column ms-3">
                    <label className="mb-1">{invite.clubId.name}</label>
                    <p className="mb-0">{invite.clubId.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="col-md-4 rightcontainer p-3 bg-light mt-4">
          <h5>Invited Groups</h5>
          <ul>
            {invitedClubs.map((invite) => (
              <li key={invite.clubId._id}>{invite.clubId.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sgroup;
