import React from "react";
import "./sidebar.css";
import heroLogo from "../../src/assests/images/hero.png";
import { PsidebarData } from "./parentSidebarData";
import { useNavigate } from "react-router-dom";

function Psidebar() {
     const navigate = useNavigate();
        return (
            <div>
                    <div
                style={{
                    backgroundColor: "#9C6FE4",
                    height: "7vh",
                    position: "fixed", // Fixed position at the top
                    width: "100%", // Full width
                    top: 0, // Stick to the top
                    bottom: 1,
                    display: "flex", // Use flex for proper alignment
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000, // Ensure it stays on top
                }}
                className="py-0 a mb-2"
            >
                <img src={heroLogo} style={{ width: 60 }} alt="Student Portal" />
            </div>
    
                
                <div className="sidebar mt-5" style={{fontSize: "5px", width:"40vh"}}>
                    <ul className="sidebarList">
                        {PsidebarData.map((val, key) => ( // Use parentheses instead of curly braces
                            <li className="row" key={key} onClick={() => navigate(val.link)}>
                                <div id="icon">{val.icon}</div>
                                <div id="title">{val.title}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
}

export default Psidebar;