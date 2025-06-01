import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import userImage from "../../assests/images/user.jpg";

import messageService from "../../services/message.service";
import teacherService from "../../services/teacher.service";
import adminService from "../../services/admin.service";
import studentService from "../../services/student.service";

const socket = io("http://localhost:5000"); // use your backend URL

function Message() {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  const messagesEndRef = useRef(null);
  const currentUser = getUserFromToken();

  useEffect(() => {
    const fetchUsers = async () => {
      const stu = await studentService.getAllUsers();
      const teach = await adminService.getAllTeachers();
      setStudents(stu.map((s) => ({ ...s, type: "student" })));
      setTeachers(teach.map((t) => ({ ...t, type: "teacher" })));
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (currentUser?.id) {
      socket.emit("join", currentUser.id); // Join your room
    }

    socket.on("newMessage", (msg) => {
      if (
        selectedChatUser &&
        (msg.senderId === selectedChatUser._id || msg.receiverId === selectedChatUser._id)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off("newMessage");
    };
  }, [selectedChatUser, currentUser]);

  const loadMessages = async (chatUser) => {
    try {
      const data = await messageService.getMessages(chatUser._id);
      setMessages(data);
      setSelectedChatUser(chatUser);
      setNewMsg("");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSend = async () => {
    if (newMsg.trim() === "" || !selectedChatUser) return;

    const data = {
      receiverId: selectedChatUser._id,
      receiverType: selectedChatUser.type,
      text: newMsg,
      senderType: currentUser.type,
    };

    try {
      const sent = await messageService.sendMessage(data);
      setMessages((prev) => [...prev, sent]);
      setNewMsg("");
    } catch (err) {
      console.error(err.message);
    }
  };

  function getUserFromToken() {
    const token = localStorage.getItem("token");
    if (!token) return { id: null, type: null };

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.userId,
        type: payload.userType,
      };
    } catch (e) {
      console.error("Invalid token", e);
      return { id: null, type: null };
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={styles.container}>
      <div className="row">
        {/* Chat box */}
        <div className="col-md-8 leftcontainer p-3 mt-4">
          <div style={styles.chatHeader}>
            {selectedChatUser ? (
              <>
                <img src={userImage} alt="avatar" style={styles.headerAvatar} />
                <span style={{ marginLeft: 10, fontWeight: "bold" }}>
                  {selectedChatUser.name || selectedChatUser.fullName}
                </span>
              </>
            ) : (
              <span>Select a user to start chatting.</span>
            )}
          </div>
          <div style={styles.chatBox}>
            {selectedChatUser ? (
              messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.message,
                    textAlign: msg.senderId === currentUser.id ? "right" : "left",
                  }}
                >
                  <strong>
                    {msg.senderId === currentUser.id ? "You" : selectedChatUser.name}:
                  </strong>{" "}
                  {msg.text}
                </div>
              ))
            ) : (
              <div style={{ padding: "10px" }}>No messages yet.</div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div style={styles.inputBox}>
            <input
              type="text"
              placeholder="Type a message..."
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              style={styles.input}
              
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />
            <button
              onClick={handleSend}
              style={styles.button}
             
            >
              Send
            </button>
          </div>
        </div>

        {/* Online People */}
        <div className="col-md-4 rightcontainer p-3 bg-light mt-4">
          <h4>Online People</h4>
          {[...students, ...teachers].map((user) => {
            const isSelected = selectedChatUser && selectedChatUser._id === user._id;
            return (
              <div
                key={user._id}
                onClick={() => loadMessages(user)}
                style={{
                  ...styles.chatPreview,
                  backgroundColor: isSelected ? "#e1f5fe" : "#fff",
                  border: isSelected ? "2px solid #0288d1" : "none",
                }}
              >
                <img src={userImage} alt="avatar" style={styles.avatar} />
                <div style={styles.chatInfo}>
                  <strong>{user.name || user.fullName}</strong>
                  <p style={styles.previewText}>{user.type}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { width: "100%", margin: "0 auto" },
  chatHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#e0e0e0",
    borderRadius: "5px",
    fontSize: "16px",
  },
  chatBox: {
    border: "1px solid #ccc",
    height: "400px",
    padding: "10px",
    overflowY: "auto",
    background: "#f9f9f9",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  message: {
    padding: "5px 10px",
    marginBottom: "5px",
    backgroundColor: "#ffffff",
    borderRadius: "5px",
    maxWidth: "75%",
    display: "inline-block",
  },
  inputBox: { display: "flex" },
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
    borderRadius: "10px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
    cursor: "pointer",
  },
  chatInfo: { marginLeft: "10px" },
  previewText: { margin: 0, fontSize: "13px", color: "#555" },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  headerAvatar: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    objectFit: "cover",
  },
};

export default Message;
