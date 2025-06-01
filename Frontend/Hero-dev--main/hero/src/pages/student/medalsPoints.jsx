import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./medalsPoints.css"
import myimage from "../../assests/images/welcome.png";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import FilterIcon from "@mui/icons-material/Filter1";
import profile from "../../assests/images/profile.jpg";
import testimage from "../../assests/images/classroomtest.jpg";
import pp from "../../assests/images/profilepic.jpg"
import studentService from "../../services/student.service";
import gamificationService from "../../services/gamification.service";

function Medal(){
    
    const [selectedImages, setSelectedImages] = useState([]);
   
    const [profilePic, setProfilePic] = useState(pp);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [previewImage, setPreviewIamage] = useState(null);
    const [userData, setUserData] = useState({username:"", level:""});
    const [gamificationData, setGamificationData] = useState({level:"", points:""});
      const levelMap = {
        1: "Primary Students",
        2: "Secondary Students (grade6-11)",
        3: "Advance level Student",
      };

    useEffect(() =>{
      async function fetchUser() {
        try {
          const user = await studentService.getUserById();
          setUserData({
            username: user.username,
            level: levelMap[user.level]  || "Not Available",
          });
        } catch (error) {
          console.error("Error fetching user data:",error.message);
        }
      }

        fetchUser();
      
    },[]);

    useEffect(() =>{
      async function fetchGamification() {
        try {
          const gamificationData = await gamificationService.getGamification();
          setGamificationData({
            level: gamificationData.level,
            points: gamificationData.points,
          })
        } catch (error) {
          console.error("Error fetching gamification data:",error.message);
        }
      }

      fetchGamification();
    },[]);

    

  //preview
  const togglePreview = (image) => {
    setPreviewIamage(image)
    setIsPreviewOpen(true);
  }


      return (
        <div className="container">
        <div className="row">
          {/* Left Section (Wider - 8 columns) */}
          <div className="col-md-8 leftcontainer p-3 mt-4">
          
            <div className="profile-container">
           
            </div>
            {/* Profile Picture Section */}
    <div className="d-flex align-items-center mt-2">
      <div>
        <img
          src={profilePic}
          className="img-fluid custom-pimg ms-2"
          alt="Profile"
          onClick={() => togglePreview(profilePic)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="ms-4">
        <label className="pname d-block">{userData.username}</label>
        <label className="grade d-block">{userData.level}</label>
      </div>
    </div>
    <div className="card" styleN="width: 18rem;">
  <div className="card-body">
  <label>Batch</label>
    <h5 className="card-title">{gamificationData.level} </h5>
    <h6 className="card-subtitle mb-2 text-muted">Points</h6>
    <p className="card-text">{gamificationData.points}</p>
    <a href="#" className="card-link">Card link</a>
    <a href="#" className="card-link">Another link</a>
  </div>
</div>
            
            
          </div>
  
          {/* Right Section (Smaller - 4 columns) */}
          <div className="col-md-4 rightcontainer p-1 bg-light mt-4">
          <div class="input-group input-group-sm mb-3 ">
        
          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="Search..."/>
        </div>
        <div className="mt-2 d-flex justify-content-between align-items-center mt-1 mb-2">
            <label>Suggestions</label>
            <label>See all</label>
          </div>
          <div>
          <img src={testimage} className="card-img-top" alt="..." />
          </div>
          </div>
          
        </div>
      </div>
      )
}

export default Medal;