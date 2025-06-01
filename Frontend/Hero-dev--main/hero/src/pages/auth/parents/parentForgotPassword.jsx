import React, { useState } from "react";
import './parentlogin.css';
import passwordImg from '../../../assests/images/Password-Reset.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate,useLocation } from "react-router-dom";
import parentService from "../../../services/parent.service";


function PEmail() {  

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
     const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "";

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError("");
        setMessage("");

        try {
            const result = await parentService.updatePassword({
                email,
                newPassword,
            });
            setMessage("Confirmation code sent to your email.");
            setTimeout(() => navigate("/resetPassword"), 2000);
        } catch (error) {
            setError(error.message || "Something went wrong");
        }
    }
    return (
        <div className="row" style={{ display: "flex", height: "100vh" }}>
            <div className="container leftSide d-flex flex-column w-100 md-5 " style={{ flex: 1 }}>
                {/* <h1 className="mt-4 mb-2 ms-4">Login to HERO</h1>
                <p className="mb-2 ms-4">let's Monitor your child with us</p> */}

                <div className="d-flex flex-column ms-4 pt-5 mt-4"> 
                    <div className="mt-5"><p>Enter you new password</p></div>
                </div>

                <div className="">
                  <form className="sdetails ms-4" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control w-75"
                                placeholder="Enter email"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-sm w-75 mt-3"
                            style={{ backgroundColor: "#648DDB", borderColor: "#648DDB", color: "white", width: 100 }}>
                            Submit
                        </button>
                        {error && <div className="text-danger mt-2">{error}</div>}
                        {message && <div className="text-success mt-2">{message}</div>}
                    </form>
                </div>

                <div className="mb-2 mt-5 ms-4" >
                 You will recieve a confirmation code to reset your password
                </div>
            </div>

            <div className="container rightSide d-flex flex-column" style={{ flex: 1, height: "100vh" }}>
                <h1 style={{ color: "white", fontSize: "9vh", fontWeight: "bold" }} className="mt-2">
                    Let's Rest your
                </h1>
                <h2 style={{ color: "white", fontSize: "7vh" }} className="mt-6">
                    Old password
                </h2>
                <p style={{ color: "white"}}>remeber your password please</p>
                <img src={passwordImg} className="pt-2" style={{ width: 450 }} alt="Student Portal" />
            </div>
        </div>
    );
}

export default PEmail;  