import React, { useState, useEffect } from "react";
import "./UserItem.css";

async function DeleteUser(ID) {
  try {
    console.log(ID);
    const response = await fetch("http://localhost:3000/admin/deleteUser", {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: ID
      }),
      credentials: "include"
    });
    console.log("Command Sended")

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`User ${ID} deleted successfully:`, data);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}

function UserItem({ user }) {
  const [open, setOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const handleDeleteClick = (e) => {
    console.log("show pop up");
    e.stopPropagation(); 
    setShowPopup(true);
    setCountdown(5);
    console.log("end of this fct");
  };

  const handleValidate = (ID) => {
    console.log("in function");
    DeleteUser(ID)
    setShowPopup(false);
    console.log("exit the function");
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    if (!showPopup || countdown === 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [showPopup, countdown]);

  return (
    <div className="user-element" onClick={() => setOpen(!open)}>
      <div>{user.username || user.name || user.email}</div>

      {open && (
        <div className="user-element-opened">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>ID:</strong> {user.id}</p>
          <button className="delete-user-button" onClick={handleDeleteClick}>
            Delete User
          </button>
        </div>
      )}

      {showPopup && (
        <div className="popup-overlay" onClick={handleCancel}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <p>Are you sure you want to delete this user?</p>
            <button
              className="validate-btn"
              onClick={() => handleValidate(user.id)}
              disabled={countdown > 0}
            >
              {countdown > 0 ? `Wait ${countdown}s` : "Validate"}
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserItem;
