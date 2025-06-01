import React  from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";

function Layout() {
    return(
        <div style={{
            display: "flex",
            minHeight: "100vh",
            backgroundColor: "#f4f4f4",
          }}>
            
            {/* Sidebar */}
            <div style={{
              width: "250px", // fixed width for sidebar
              flexShrink: 0, // prevent shrinking
              backgroundColor: "#fff",
              borderRight: "1px solid #ddd",
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              zIndex: 1000,
            }}>
              <Sidebar />
            </div>
      
            {/* Main content */}
            <div style={{
              marginLeft: "250px", // SAME as sidebar width
              flexGrow: 1,
              padding: "80px 20px 20px 20px",
              overflowY: "auto",
            }}>
              <Outlet />
            </div>
      
          </div>
    );
    
}

export default Layout;