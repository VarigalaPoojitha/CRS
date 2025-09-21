// frontend/src/components/Profile.js
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="profile-section">
      <h2>My Profile</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Role:</strong> {user.role}</p>

      {/* if you later expand backend to return email, gender, address — add them here */}

      <button onClick={logout} style={{ marginTop: "10px" }}>
        Logout
      </button>
    </div>
  );
}

export default Profile;
