// src/axiosInstance.js
import axios from "axios";

// Create an instance with default configuration
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // Base URL for your API
  timeout: 10000, // Timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

// You can also set up interceptors if needed
axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // e.g., add authentication tokens
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    // Handle response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
