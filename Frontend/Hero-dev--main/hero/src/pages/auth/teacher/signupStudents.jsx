import React, { useState } from "react";
import './welcomes.css';
import myimage from '../../../assests/images/welcome.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import studentService from "../../../services/student.service";

function Ssignup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName:'',
        username: '',
        password: '',
        level: '',
        gender: '',
        subject: '',
    });
    const [error, setError] = useState('');

   const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };

    const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const preparedData = {
                    ...formData,
                    level: parseInt(formData.level,10)
                };
                const res = await studentService.registerStudent(preparedData);
                alert("Stdudent added successfully!");
                console.log(res);
            } catch (err) {
                console.error(err);
                alert("Failed to add Stdudent");
            }
        };

    return (
        <div className="row" style={{ display: "flex", height: "100vh" }}>
            <div className="container leftSide d-flex flex-column w-100 md-5" style={{ flex: 1 }}>
                <h1 className="mt-4 mb-2 ms-4">Login to HERO</h1>
                <p className="mb-2 ms-4">Students, Let's discover your talents with us</p>        

                <div className="d-flex flex-column ms-4 pt-5 mt-4"> 
                    <div className="mt-5"><p>Enter your Account details</p></div>
                </div>

                <div className="">
                    <form className="sdetails ms-4" onSubmit={handleSubmit}>
                         <div className="mb-2">
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Enter your fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="bg-transparent border-b border-gray-500 py-2 px-1 text-white text-lg focus:outline-none focus:border-purple-400 w-75"
                            />
                        </div>
                        <div className="mb-2">
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleChange}
                                className="bg-transparent border-b border-gray-500 py-2 px-1 text-white text-lg focus:outline-none focus:border-purple-400 w-75"
                            />
                        </div>

                        <div className="mb-2">
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                className="bg-transparent border-b border-gray-500 py-2 px-1 text-white text-lg focus:outline-none focus:border-purple-400 w-75"
                            />
                        </div>

                        <div className="col-md-3 mb-3">
                            <label>Class</label>
                            <select
                                name="level"
                                className="form-select"
                                value={formData.level}
                                onChange={handleChange}
                            >
                                <option value="">Select Level</option>
                                <option value="3">Primary</option>
                                <option value="2">Secondary</option>
                                <option value="1">Advanced</option>
                            </select>
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
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                          

                           <div className="col-md-3 mb-3">
                            <label>Subject</label>
                            <input
                                type="subject"
                                name="subject"
                                placeholder="Enter your subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="bg-transparent border-b border-gray-500 py-2 px-1 text-white text-lg focus:outline-none focus:border-purple-400 w-100"
                            />
                        </div>

                        </div>


                        <button
                            type="submit"
                            className="btn btn-primary btn-sm w-75 mt-3"
                            style={{ backgroundColor: "#D27EEF", borderColor: "#D27EEF", color: "white", width: 100 }}
                        >
                            Submit
                        </button>

                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </form>
                </div>
            </div>

            <div className="container rightSide d-flex flex-column" style={{ flex: 1, height: "100vh" }}>
                <h1 style={{ color: "white", fontSize: "10vh", fontWeight: "bold" }} className="mt-2">
                    Welcome to
                </h1>
                <h2 style={{ color: "white", fontSize: "7vh" }} className="mt-6">
                    Student Portal
                </h2>
                <p style={{ color: "white" }}>Log in to access your account</p>
                <img src={myimage} className="pt-5" style={{ width: 450 }} alt="Student Portal" />
            </div>
        </div>
    );
}

export default Ssignup;
