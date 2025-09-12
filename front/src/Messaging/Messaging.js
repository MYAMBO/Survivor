// MessagingPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Messaging.css";

export default function MessagingPage() {
  const [conversations] = useState([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ]);

  const [activeChat, setActiveChat] = useState(1);
  const [messages, setMessages] = useState({
    1: [
      { from: "Alice", text: "Hey! How are you?" },
      { from: "Me", text: "I’m good, thanks!" },
    ],
    2: [{ from: "Bob", text: "Are you joining later?" }],
    3: [],
  });

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages((prev) => ({
      ...prev,
      [activeChat]: [...prev[activeChat], { from: "Me", text: newMessage }],
    }));
    setNewMessage("");
  };

  return (
    <div className="messaging-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title">Chats</h2>
        <div className="conversation-list">
          {conversations.map((c) => (
            <div
              key={c.id}
              className={`conversation ${activeChat === c.id ? "active" : ""}`}
              onClick={() => setActiveChat(c.id)}
            >
              {c.name}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="chat-section">
        {/* Messages */}
        <div className="messages">
          {messages[activeChat]?.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`message ${m.from === "Me" ? "sent" : "received"}`}
            >
              {m.text}
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="input-section">
          <input
            className="message-input"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button className="send-button" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
