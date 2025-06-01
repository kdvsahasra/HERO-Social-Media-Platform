import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminSideBar.css";
import { AdminSidebarData } from "./AdminSidebarData";

function AdminSideBar() {
      const navigate = useNavigate();
    return (
        <div>
         <div className="adminSidebar">
    <div className="logo">Admin Panel</div>
    <ul className="adminSidebarList">
        {AdminSidebarData.map((val, key) => (
            <li className="adminRow" key={key} onClick={() => navigate(val.link)}>
                <div className="adminIcon">{val.icon}</div>
                <div className="adminTitle">{val.title}</div>
            </li>
        ))}
    </ul>
</div>

        </div>
    )
}

export default AdminSideBar;