import React, { useEffect, useState } from "react";
import axios from "axios";
import "./createGroup.css"
import teacherService from "../../services/teacher.service";
import studentService from "../../services/student.service";

function CreateGroup(){
 const [formData, setFormData] = useState({
  clubName: '',
  description: '',
  clubType: '',
});

 const [rules, setRules] = useState([""]);
const [clubLogo, setClubLogo] = useState(null);
const[mediaFiles, setMediaFiles] = useState([]);
const[invitedMembers, setInvitedMembers] = useState([]);
const [students, setStudents] = useState([]);

useEffect(() =>{
  const fetchStudents = async () =>{
    try {
      const users = await studentService.getAllUsers();
      setStudents(users);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }
  fetchStudents();
},[]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleRuleChange = (index, value) => {
    const updatedRules = [...rules];
    updatedRules[index] = value;
    setRules(updatedRules);
  };

  const addNewRule = () => {
    setRules([...rules, ""]);
  };

  const toggleInvite = (studentId) => {
    setInvitedMembers((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const data = new FormData(); // Renamed from formData to data
       data.append("clubName", formData.clubName);
       data.append("description", formData.description);
       data.append("clubType", formData.clubType);
       rules.forEach((rule) => data.append("clubRules[]", rule));
       mediaFiles.forEach((file) =>{
          data.append("clubLogo", file);
        });
      data.append("invitedMembers",JSON.stringify(invitedMembers));
      const response = await teacherService.createClubs(data);
      console.log(response);
      alert("Club created successfully!");
    } catch (error) {
      console.error("Error submitting event:", error);
      alert("Failed to submit event.");
    }
  };
    return (
      <div className="container">
      <div className="row">
        {/* Left Section */}
        <div className="col-md-8 leftcontainer p-3 mt-4 h-100">
          <div className="d-flex align-items-center justify-content-between w-100">
            <form style={{ width: "100%" }} onSubmit={handleSubmit}>
              <div className="input-group mb-3" style={{ width: "100%" }}>
                <input type="file" className="form-control" id="inputGroupFile02" onChange={(e) => setMediaFiles([e.target.files[0]])} />
              </div>

              <label className="label">Add Group Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Club Name"
                aria-label="Club Name"
                name="clubName"
                value={formData.clubName}
                onChange={handleChange}
              />

              <label className="label mt-4">Add Group Details</label>
              <textarea
                className="form-control"
                aria-label="Venue"
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>

              <label className="label mt-4">Add Group Type</label>
              <input
                type="text"
                className="form-control"
                placeholder="Add Event Type"
                aria-label="etpy"
                name="clubType"
                value={formData.clubType}
                onChange={handleChange}
              />

              <label className="label mt-4">Add Group Rules</label>

              {rules.map((rule, index) => (
                <div key={index} className="mb-2">
                  <span>Rule {index + 1}</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter rule"
                    value={rule}
                    onChange={(e) => handleRuleChange(index, e.target.value)}
                  />
                </div>
              ))}

              <button type="button" className="btn btn-light mt-2" onClick={addNewRule}>
                Add New Rule
              </button>
              <label className="label mt-4"> Invite Members Section</label>
             
              <div className=" p-3 bg-light rounded">
                <h6 className="fw-bold text-primary">Invite Members</h6>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Search" />
                </div>
                <div>
                  <p className="fw-bold">Suggested</p>
                  {students.map((student) => {
                    const isInvited = invitedMembers.includes(student._id); ;
                  return (
                    <div key={student.id} className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center">
                     <img
                        src="https://via.placeholder.com/40"
                        alt="profile"
                        className="rounded-circle me-2"
                        style={{ width: "40px", height: "40px" }}
                      />
        <span><strong>{student.username}</strong></span>
      </div>
      <button
        type="button"
        className={`btn ${isInvited ? 'btn-danger' : 'btn-primary'}`}
        onClick={() => toggleInvite(student._id)}
      >
        {isInvited ? "Remove" : "Invite"}
      </button>
    </div>
  );
})}

                </div>
                <div className="text-center">
                 
                </div>
                <button type="submit" className="btn btn-purple mt-3" style={{ backgroundColor: '#8000b3', color: '#fff' }}>
                    Create Event
                  </button>
              </div>

              {/* Submit Button
              <div className="mt-4">
                <button type="submit" className="btn btn-primary">
                  Submit Event
                </button>
              </div> */}
            </form>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-md-4 rightcontainer p-3 bg-light mt-4">
          <div className="input-group input-group-sm mb-3"></div>
          <label className="filterName">Filter</label>
          <div className="mt-3 ms-2">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Checkbox
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Checkbox
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Checkbox
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Checkbox
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
export default CreateGroup;