import React, { useState, useEffect, useRef } from "react";
import userImage from "../../assests/images/user.jpg"

function Tmessage() {
   const [messages, setMessages] = useState([]);
    const [newMsg, setNewMsg] = useState("");
    const messagesEndRef = useRef(null);
  
    // Hardcoded initial messages
    useEffect(() => {
      const initialMessages = [
        { id: 1, text: "Hey there!", sender: "Alice" },
        { id: 2, text: "Hi! How are you?", sender: "You" },
        { id: 3, text: "I'm doing great, thanks!", sender: "Alice" },
      ];
      setMessages(initialMessages);
    }, []);
  
    const handleSend = () => {
      if (newMsg.trim() === "") return;
      const msg = { id: Date.now(), text: newMsg, sender: "You" };
      setMessages([...messages, msg]);
      setNewMsg("");
    };
  
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
  
    return (
      <div style={styles.container}>
        <div className="row">
          {/* Left Section */}
          <div className="col-md-8 leftcontainer p-3 mt-4">
            <div style={styles.chatBox}>
              {messages.map((msg) => (
                <div key={msg.id} style={styles.message}>
                  <strong>{msg.sender}:</strong> {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div style={styles.inputBox}>
              <input
                type="text"
                placeholder="Type a message..."
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                style={styles.input}
              />
              <button onClick={handleSend} style={styles.button}>
                Send
              </button>
            </div>
          </div>
  
          {/* Right Section */}
          <div className="col-md-4 rightcontainer p-3 bg-light mt-4">
            <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>Online people</h1>
            <div className="card">
              <div className="card-body">
                {/* Search input */}
                <div className="input-group input-group-sm mb-3">
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    placeholder="Search..."
                  />
                </div>
  
                {/* Older Messages */}
                <h5 className="text-muted mb-3">Older Messages</h5>
                <div style={styles.chatPreview}>
                  <img src={userImage} alt="avatar" style={styles.avatar} />
                  <div style={styles.chatInfo}>
                    <strong>John</strong>
                    <p style={styles.previewText}>Are you joining the meeting?</p>
                  </div>
                </div>
                <div style={styles.chatPreview}>
                  <img src={userImage} alt="avatar" style={styles.avatar} />
                  <div style={styles.chatInfo}>
                    <strong>Sara</strong>
                    <p style={styles.previewText}>Let’s meet at 3 PM.</p>
                  </div>
                </div>
                <div style={styles.chatPreview}>
                  <img src={userImage} alt="avatar" style={styles.avatar} />
                  <div style={styles.chatInfo}>
                    <strong>Mike</strong>
                    <p style={styles.previewText}>Don’t forget the documents.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const styles = {
    container: {
      width: "100%",
      margin: "0 auto",
      fontFamily: "Arial, sans-serif",
    },
    chatBox: {
      border: "1px solid #ccc",
      height: "300px",
      padding: "10px",
      overflowY: "auto",
      background: "#f9f9f9",
      borderRadius: "5px",
      marginBottom: "10px",
    },
    message: {
      padding: "5px 0",
    },
    inputBox: {
      display: "flex",
    },
    input: {
      flex: 1,
      padding: "8px",
      borderRadius: "4px 0 0 4px",
      border: "1px solid #ccc",
      borderRight: "none",
    },
    button: {
      padding: "8px 16px",
      borderRadius: "0 4px 4px 0",
      border: "1px solid #ccc",
      background: "#4caf50",
      color: "#fff",
      cursor: "pointer",
    },
    chatPreview: {
      display: "flex",
      alignItems: "center",
      padding: "10px",
      marginBottom: "10px",
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    chatInfo: {
      marginLeft: "10px",
    },
    previewText: {
      margin: 0,
      fontSize: "13px",
      color: "#555",
    },
    avatar: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      objectFit: "cover",
    },
  };

export default Tmessage;