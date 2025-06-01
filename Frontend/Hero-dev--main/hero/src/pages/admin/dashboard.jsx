import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link } from "react-router-dom";

function AdminDashboard() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header with Logout button aligned left */}
            <div className=" flex justify-end  mb-6">
                <button
                    className="btn btn-primary btn-sm"
                    style={{
                        backgroundColor: "#2D88D4",
                        borderColor: "#2D88D4",
                        color: "white",
                        width: 100
                    }}
                >
                    Logout
                </button>
            </div>
            {/* Dashboard add here */}

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center mt-5">
                <h2 className="text-2xl font-bold text-purple-700 mb-2">Welcome to your dashboard, HERO</h2>
                <label className="text-gray-600">www.hero.school.lk</label>

                <Link to="/adminDashboard" className="flex items-center mt-4 cursor-pointer hover:bg-gray-200 p-2 rounded transition">
                <AdminPanelSettingsIcon className="mr-2 text-black" />
                <span className="text-lg font-semibold text-black ms-2">Add other admin</span>
                </Link>

                

                <div className="mt-2">
                <Link to="/adminDashboard" className="flex items-center mt-4 cursor-pointer hover:bg-gray-200 p-2 rounded transition">
                <SchoolIcon className="mr-2 text-black" />
                <span className="text-lg font-semibold text-black ms-2">Add students</span>
                </Link>
                </div>

                <div className="mt-2">
                <Link to="/adminDashboard" className="flex items-center mt-4 cursor-pointer hover:bg-gray-200 p-2 rounded transition">
                <SchoolIcon className="mr-2 text-black" />
                <span className="text-lg font-semibold text-black ms-2">Add Teachers</span>
                </Link>
                </div>
                </div>
        </div>
    );
}

export default AdminDashboard;
