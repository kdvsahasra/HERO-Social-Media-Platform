import React, { useEffect, useState }  from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

import pp from "../assests/images/profilepic.jpg"
import gamificationService from "../services/gamification.service";


function Pdetails() {
    const [profilePic, setProfilePic] = useState(pp);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [previewImage, setPreviewIamage] = useState(null);
    const [username, setUsername] = useState("");
    const[level, setLevel] = useState("");
     const [error, setError] = useState("");
      const [loading, setLoading] = useState(true);
    // const [activeTab, setActiveTab] = useState("performance");
     const levelMap = {
        1: "Primary Students",
        2: "Secondary Students (grade6-11)",
        3: "Advance level Student",
      };
    useEffect(() =>{
      const fetchData = async () =>{
        try {
          const data  = await gamificationService.getGamificationForChild();
          setUsername(data?.username);
          setLevel(levelMap[data?.level] || "Not specified");
        } catch (error) {
          setError(error.message);
        }finally {
            setLoading(false);
        }
      }
      fetchData();
    },[]);
 
    const handleProfileChange = (event) => {
        const file = event.target.files[0];
        if (file){
          const imageUrl = URL.createObjectURL(file);
          setProfilePic(imageUrl);  
        }
      };
    
      //preview
      const togglePreview = (image) => {
        setPreviewIamage(image)
        setIsPreviewOpen(true);
      }

      return(
        <div>
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
      
    </div>
<div className="ms-4">
        {loading ? (
          <p className="ms-4">Loading...</p>
        ) : error ? (
          <p className="text-danger ms-4">{error}</p>
        ) : (
          <>
            <label className="pname d-block">{username}</label>
            <label className="grade d-block">{level}</label>
          </>
        )}
      </div>
    </div>
  );
}

export default Pdetails;
