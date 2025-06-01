import React from "react";
import heroLogo from "../../src/assests/images/hero.png"


function logoBar(){

    return (
        <div  style={{
            backgroundColor: "#648DDB", 
            height: "9vh", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center"
        }} 
        className="py-1 a"
    >
        <img src={heroLogo} style={{ width: 60 }} alt="Student Portal" /> 
    </div>
    );
}

export default logoBar;