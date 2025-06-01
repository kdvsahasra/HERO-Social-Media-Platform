import React, { useState } from "react";
import './parentlogin.css';
import passwordImg from '../../../assests/images/Password-Reset.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import teacherService from "../../../services/teacher.service";
import parentService from "../../../services/parent.service";


function EmailConfirm() {  
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || "";
    console.log("Email received in EmailConfirm:", email);


    const handleOtpChange = (value, index) =>{
        if(!/^\d?$/.test(value)) return;
        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        if(value && index < 5){
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
        setError("Please enter the 6-digit OTP.");
        return;
    }

    const otpNumber = Number(enteredOtp);

    try {
        const response = await parentService.verifyOTPAndPassword({
            email,
            otp: otpNumber,
        });
        setSuccess("OTP verified. Redirecting to password reset...");
        setTimeout(() => navigate("/resetPassword", { state: { email } }), 2000);
    } catch (err) {
        setError(err.message || "Verification failed.");
    }
};

    return (
        <div className="row" style={{ display: "flex", height: "100vh" }}>
            <div className="container leftSide d-flex flex-column w-100 md-5 " style={{ flex: 1 }}>
                {/* <h1 className="mt-4 mb-2 ms-4">Login to HERO</h1>
                <p className="mb-2 ms-4">let's Monitor your child with us</p> */}

                <div className="d-flex flex-column ms-4 pt-5 mt-4"> 
                    <div className="mt-5"><p>Enter your OTP</p></div>
                </div>

                <div className="">
                    <form className="sdetails ms-4" onSubmit={handleSubmit}>
                    <div className="mb-2 d-flex gap-4">
                            {otp.map((value, index) => (
                                <input
                                    key={index}
                                    id={`otp-${index}`}
                                    type="text"
                                    maxLength="1"
                                    value={value}
                                    onChange={(e) => handleOtpChange(e.target.value, index)}
                                    pattern="\d"
                                    className="bg-transparent border border-gray-500 py-2 px-3 text-white text-lg focus:outline-none focus:border-purple-400 text-center"
                                    style={{ width: "40px", height: "40px" }}
                                />
                            ))}
                        </div> 
                        
                        
                        <button
                        type="submit"
                        className="btn btn-primary btn-sm w-74 mt-2"
                        style={{ backgroundColor: "#648DDB", borderColor: "#648DDB", color: "white", width: "48vh" }}
                    >
                        Confirm
                    </button>

                    {error && <div className="text-danger mt-2">{error}</div>}
                    {success && <div className="text-success mt-2">{success}</div>}
                    </form>
                </div>

                <div className="mb-2 mt-5 ms-4" >
                Haven’t got the email yet? <Link to="#" > Resend </Link>
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

export default EmailConfirm;  