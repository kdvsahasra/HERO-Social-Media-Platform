import React, { useState } from "react";
import axios from "axios";
import adminService from "../../services/admin.service";

function AddingTeacher() {
    const [formData, setFormData] = useState({
         fullName: "",
         username: "",
         email:"",
         password: "",
         mobile: "",
         level: "",
         gender: "",
         subject: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const preparedData = {
                ...formData,
                level: parseInt(formData.level,10),
            };
            const res = await adminService.registerTeacher(preparedData);
            alert("Teacher added successfully!");
            console.log(res);
        } catch (err) {
            console.error(err);
            alert("Failed to add teacher");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="row_header mt-3">
                    <h3>Add Teacher details here</h3>

                    <div className="row mb-3">
                        <label className="mt-2">Full Name</label>
                        <div className="col-md-12">
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Enter full name"
                                className="form-control w-75"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                           <div className="col-md-4">
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                className="form-control"
                                placeholder="Enter username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-4">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-3">
                            <label>Class</label>
                            <select
                                name="level"
                                className="form-select"
                                value={formData.level}
                                onChange={handleChange}
                            >
                                <option>Select level</option>
                                 <option value="3">Primary</option>
                                <option value="2">Secondary</option>
                                <option value="1">Advanced</option>
                            </select>
                        </div>

                     
                    </div>

                    <div className="row mb-3">
                           <div className="col-md-3">
                            <label>Gender</label>
                            <select
                                name="gender"
                                className="form-select"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option>Select Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Enter Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-4">
                            <label>Phone Number</label>
                            <input
                                type="text"
                                name="mobile"
                                className="form-control"
                                placeholder="Enter Phone Number"
                                value={formData.mobile}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label>Subject</label>
                            <input
                                type="text"
                                name="subject"
                                className="form-control"
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="row mb-3 mt-5">
                        <center>
                            <button
                                type="submit"
                                className="mb-3 btn btn-primary btn-sm mt-4"
                                style={{
                                    backgroundColor: "#2D88D4",
                                    borderColor: "#2D88D4",
                                    color: "white",
                                    width: 100
                                }}
                            >
                                Add
                            </button>
                        </center>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddingTeacher;
