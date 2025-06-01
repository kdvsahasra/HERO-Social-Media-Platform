import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import "./notification.css";
import myimage from "../../assests/images/welcome.png";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import FilterIcon from "@mui/icons-material/Filter1";
import profile from "../../assests/images/profile.jpg";
import testimage from "../../assests/images/classroomtest.jpg";
import io from "socket.io-client";

const socket = io("");

function SNotification() {

  // State to hold notifications
  const [notifications, setNotifications] = useState([]);

  // Function to add a new notification
  // const addNotification = () => {
  //   setNotifications([...notifications, `New Notification ${notifications.length + 1}`]);
  // };

  useEffect(() => {
    socket.on("newNotification", (notification)=> {
      setNotifications((prevNotification) => [notification, ...prevNotification]);

    });

    return () => {
      socket.off("newNotification");
    };
  }, []);

  return (
    <div className="container">
      <div className="row">
        {/* Left Section (Wider - 8 columns) */}
        <div className="col-md-8 leftcontainer p-3 mt-4 h-100">
          <div className="d-flex align-items-center justify-content-between w-100">
            <h1 className="notification">Notification</h1>
            <input
              type="text"
              className="form-control w-50"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="Search..."
            />
          </div>
          <hr />

         {notifications.length === 0 ? (
          <p>No New Notification</p>
         ): (
          notifications.map((notification, index) =>(
            <div className="card mb-2" key={index}>
            <div className="card-body">{notification.message}</div>
          </div>
          ))
         )}
        </div>

        {/* Right Section (Smaller - 4 columns) */}
        <div className="col-md-4 rightcontainer p-3 bg-light mt-4">
          <div className="input-group input-group-sm mb-3"></div>
          <label className="filterName">Filter</label>
          <div className="mt-3 ms-2 ">
            <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
          <label class="form-check-label" for="flexCheckDefault">
            Default checkbox
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
          <label class="form-check-label" for="flexCheckChecked">
            Checked checkbox
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
          <label class="form-check-label" for="flexCheckChecked">
            Checked checkbox
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
          <label class="form-check-label" for="flexCheckChecked">
            Checked checkbox
          </label>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SNotification;
