import React, { useState } from "react";

function Profile() {
  const [profile, setProfile] = useState({
    name: "Guest User",
    gender: "Other",
    address: ""
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    alert("Profile saved: " + JSON.stringify(profile));
  };

  return (
    <div className="profile-section">
      <h2>Profile</h2>
      <label>Name</label>
      <input type="text" name="name" value={profile.name} onChange={handleChange} />
      <label>Gender</label>
      <select name="gender" value={profile.gender} onChange={handleChange}>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
      <label>Address</label>
      <textarea name="address" value={profile.address} onChange={handleChange} />
      <button onClick={saveProfile}>Save Profile</button>
    </div>
  );
}

export default Profile;