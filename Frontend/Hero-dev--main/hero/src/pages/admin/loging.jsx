import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";


function AdminLog() {
    return (
        // lgoin page here
        <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
            <h4 className="text-center mt-5">Welcome HERO, Log into your account</h4>
            <form className=" p-8 rounded-lg shadow-md w-[30%] text-center mt-5">
                <label className="text-l  text-purple-700 mb-6">
                    It is our great pleasure to have you on board!
                </label>

                <div className="mb-4 mt-2">
                    <input
                        type="text"
                        id="adminName"
                        placeholder="Enter your username"
                        className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-base text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-300"
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="password"
                        id="adminPassword"
                        placeholder="Enter your password"
                        className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-base text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-300"
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary btn-sm   w-30" 
                            style={{ backgroundColor: "#2D88D4", borderColor: "#2D88D4", color: "white", width: 100 }}>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default AdminLog;