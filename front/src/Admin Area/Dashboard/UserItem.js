import React, { useState } from "react";

function UserItem({ user }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        margin: "8px 0",
        padding: "12px",
        cursor: "pointer",
        backgroundColor: open ? "#f9f9f9" : "white",
      }}
    >
      <div style={{ fontWeight: "bold" }}>
        {user.username || user.name || user.email}
      </div>

      {open && (
        <div style={{ marginTop: "8px", fontSize: "14px", color: "#333" }}>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Created at:</strong> {user.createdAt}</p>
        </div>
      )}
    </div>
  );
}

export default UserItem;