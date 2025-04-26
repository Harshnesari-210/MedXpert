import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  const [userType, setUserType] = useState(""); // User role: patient or doctor
  // const navigate = useNavigate();

  useEffect(() => {
    // Check login status on page load
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("http://localhost:3000/profile", {
          withCredentials: true,
        }); // Verify token
        setIsLoggedIn(true);
        setUserType(response.data.role); // Assume `role` is stored in the database
      } catch (error) {
        console.error("Not logged in:", error.response?.data || error.message);
        setIsLoggedIn(false);
      }
    };
    checkAuthStatus();
  }, []);

  // const handleLogout = async () => {
  //   try {
  //     await axios.post(
  //       "http://localhost:3000/logout",
  //       {},
  //       { withCredentials: true }
  //     ); // Invalidate token
  //     setIsLoggedIn(false);
  //     setUserType("");
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Logout failed:", error.response?.data || error.message);
  //   }
  // };

  if (!isLoggedIn) {
    // Render login/signup page if not logged in
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Project</h1>
        <p className="mb-8">
          This project connects doctors and patients seamlessly.
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 text-white"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-700 text-white"
          >
            Signup
          </Link>
        </div>
      </div>
    );
  }

  // Redirect to respective dashboards based on user role
  // if (userType === "doctor") {
  //   navigate("/doctor-dashboard");
  // } else if (userType === "patient") {
  //   navigate("/patient-dashboard");
  // }

  return null; // Temporary loader while navigating
}

export default HomePage;
