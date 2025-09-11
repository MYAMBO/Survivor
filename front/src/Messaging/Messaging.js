import React, { useState, useEffect } from 'react';
import './Messaging.css'

function Messaging() {
  const role = localStorage.getItem("role") || "none";
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/getAllConv", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      credentials: 'include'
    })
    .then(res => res.json())
    .then((data) => (Array.isArray(data) ? setConversations(data) : setConversations([])))
    .catch(err => {console.error("Error fetching conversations:", err);});
  }, []);

  if (role === "none") {
    return (
      <div className="messaging messaging-denied">
        <h2>Access Denied</h2>
        <p>You must be logged in to access the messaging feature.</p>
        <button onClick={() => window.location.href = '/login'}>Go to Login</button>
      </div>
    )
  }


  return (
    <div className="messaging">
      <aside className="chat-sidebar">
        <h3>Conversations</h3>
        <ul>
        <li className="active">Alice</li>
          <li>Bob</li>
          <li>Charlie</li>
        </ul>
      </aside>

      <main className="chat-main">
        <div className="chat-header">
          <h3>Alice</h3>
        </div>

        <div className="chat-messages">
          <div className="message received">
            <p>Salut 👋</p>
            <span>10:32</span>
          </div>
          <div className="message sent">
            <p>Hey Alice ! Comment ça va ?</p>
            <span>10:33</span>
          </div>
          <div className="message received">
            <p>Ça va super, merci 🙌</p>
            <span>10:34</span>
          </div>
        </div>

        <div className="chat-input">
          <input type="text" placeholder="Écris ton message..." />
          <button>Envoyer</button>
        </div>
      </main>
    </div>
  )
}

export default Messaging
