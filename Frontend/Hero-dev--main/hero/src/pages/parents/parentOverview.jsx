import React, { useEffect, useState } from "react";
import axios from "axios";
import "./parentEventClubs.css";
import Pdetails from "../../components/pdetails"
import gamificationService from "../../services/gamification.service";

function Poverview() {
    const[gamification, setGamification] = useState([]);
     const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await gamificationService.getGamificationForChild();
                setGamification(data?.gamification);
                setUsername(data?.username);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return(
        <div className="container ms-2">
             <Pdetails />

       
            <div>
                <h5 className="mt-5 ms-4">Academic Overview</h5>

                {loading ? (
                    <p className="ms-4">Loading...</p>
                ) : error ? (
                    <p className="text-danger ms-4">{error}</p>
                ) : (
                    <div className="d-flex gap-3 flex-wrap mt-4 ms-4">
                        <div className="card" style={{ width: "220px", border: "2px solid #ccc", padding: "1rem" }}>
                            <div className="card-body">
                                <label>Level</label>
                                <h5 className="card-title">{gamification?.level}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Points</h6>
                                <p className="card-text">{gamification?.points || 0}</p>
                                <p className="card-text">Username: {username}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <h5 className="mt-5 ms-4">Profile Overview</h5>
        </div>
    )
}

export default Poverview;