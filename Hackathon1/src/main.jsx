import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App"; // Your main App component
import "./index.css"; // Your global CSS file
import './fonts.css';
import axios from 'axios';

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

// Add request interceptor for debugging
axios.interceptors.request.use(request => {
  console.log('Starting Request:', request);
  return request;
});

// Add response interceptor for debugging
axios.interceptors.response.use(
  response => {
    console.log('Response:', response);
    return response;
  },
  error => {
    console.error('Axios Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: error.config
    });
    return Promise.reject(error);
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
