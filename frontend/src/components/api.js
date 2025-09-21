// frontend/src/components/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // your backend server
});

export default api;
