// src/services/api.js

import axios from "axios";

// IMPORTANT: Replace with your actual backend API URL
const API_URL = "http://localhost:5000/api"; // Example for a Node.js backend on port 5000

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add the token to every request if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
