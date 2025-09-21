// frontend/src/components/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // backend server
});

// 🔑 Add interceptor to include token automatically
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token; // token stored in AuthContext login()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
