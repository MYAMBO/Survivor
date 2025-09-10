import React, { useState } from "react";

function UserItem({ user }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="user-element"
      onClick={() => setOpen(!open)}
    >
      <div style={{ fontWeight: "bold" }}>
        {user.username || user.name || user.email}
      </div>

      {open && (
        <div className="user-element-opened">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>ID:</strong> {user.id}</p>
        </div>
      )}
    </div>
  );
}

export default UserItem;//localhost