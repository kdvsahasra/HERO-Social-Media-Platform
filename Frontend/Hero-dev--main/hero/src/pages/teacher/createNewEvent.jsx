import React, { useState } from "react";
import axios from "axios";
import "./createNewEvent.css";
import teacherService from "../../services/teacher.service";


function CreatEvent() {
  const [eventData, setEventData] = useState({
    name: '',
    venue: '',
    time: ''
  });
  const[mediaFiles, setMediaFiles] = useState([]);

  const [rules, setRules] = useState([""]);

  const handleChange = (e) => {
    setEventData({
      ...eventData,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const formData = new FormData();
     formData.append("name",eventData.name);
     formData.append("description",eventData.description);
     formData.append("eventType", eventData.eventType);

     rules.forEach((rule, index) => {
      formData.append(`rules[${index}]`, rule);
    });

    mediaFiles.forEach((file) =>{
      formData.append("media", file);
    });

    const response = await teacherService.createEvent(formData);
    console.log('Event created',response);
    alert("Event created successfully!");
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

              <label className="label">Add Event Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Club Name"
                aria-label="Club Name"
                name="name"
                value={eventData.name}
                onChange={handleChange}
              />

              <label className="label mt-4">Add Event Details</label>
              <textarea
                className="form-control"
                aria-label="Venue"
                name="description"
                value={eventData.description}
                onChange={handleChange}
              ></textarea>

              <label className="label mt-4">Add Event Type</label>
              <input
                type="text"
                className="form-control"
                placeholder="Add Event Type"
                aria-label="etpy"
                name="eventType"
                value={eventData.eventType}
                onChange={handleChange}
              />

              <label className="label mt-4">Add Club Rules</label>

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
              <div>
              <button type="submit" className="btn btn-purple mt-3" style={{ backgroundColor: '#8000b3', color: '#fff' }}>
                    Create Event
                  </button>
              </div>
              
             
             
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

export default CreatEvent;