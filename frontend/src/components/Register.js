// frontend/src/components/Register.js
import React, { useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    address: "",
    role: "customer", // default role
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.post("/auth/register", form);
      setSuccess("Registration successful! You can now log in.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Gender:</label>
          <select name="gender" value={form.gender} onChange={handleChange} required>
            <option value="">-- Select --</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Role:</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
          </select>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
