import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

function AuthPage({ isSignup }) {
  const [isSignupMode, setIsSignupMode] = useState(isSignup);
  const [firstName, setFirstName] = useState(""); // Declare first name state
  const [lastName, setLastName] = useState(""); // Declare last name state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("patient");
  const [speciality, setSpeciality] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignupMode) {
      try {
        const response = await axios.post("http://localhost:3000/signup", {
          firstName,
          lastName,
          email,
          password,
          role: userType,
          speciality: userType === "doctor" ? speciality.trim() : null, // Send speciality for doctors
        });

        console.log(response.data);
        // alert("Signup successful! Please login.");
        setIsSignupMode(false);
      } catch (error) {
        console.error(
          "Error during signup:",
          error.response?.data || error.message
        );
        // alert("Signup failed. Please try again.");
      }
    } else {
      try {
        const response = await axios.post("http://localhost:3000/login", {
          email,
          password,
        });

        console.log(response.data);
        // alert("Login successful!");

        if (response.data.role === "patient") {
          navigate("/patient");
        } else {
          navigate("/doctor");
        }
      } catch (error) {
        console.error(
          "Error during login:",
          error.response?.data || error.message
        );
        // alert("Login failed. Please check your credentials.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {/* Tabs for switching between Signup and Login */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-6 py-2 border-b-2 ${
            isSignupMode ? "border-blue-500" : "border-transparent"
          }`}
          onClick={() => setIsSignupMode(true)}
        >
          Signup
        </button>
        <button
          className={`px-6 py-2 border-b-2 ${
            !isSignupMode ? "border-blue-500" : "border-transparent"
          }`}
          onClick={() => setIsSignupMode(false)}
        >
          Login
        </button>
      </div>

      {/* Form */}
      <form
        className="bg-gray-800 p-8 rounded shadow-lg w-96"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold mb-6">
          {isSignupMode ? "Signup" : "Login"}
        </h1>
        {/* User Type Dropdown - Shown only for Signup */}
        {isSignupMode && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">I am a:</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none text-black"
            >
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
            </select>
          </div>
        )}

        {/* Show First Name and Last Name fields only for Signup */}
        {isSignupMode && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none text-black"
                placeholder="Enter your first name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none text-black"
                placeholder="Enter your last name"
              />
            </div>
          </>
        )}

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none text-black"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none text-black"
            placeholder="Enter your password"
          />
        </div>

        {/* Speciality Field */}
        {userType === "doctor" && isSignupMode && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Speciality
              </label>
              <select
                name="speciality"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none text-black"
              >
                {[
                  "Gastroenterologist",
  "Neurologist",
  "Endocrinologist",
  "Infectious Disease Specialist",
  "General Practitioner",
  "Cardiologist",
].map((spec) => (
  <option key={spec} value={spec}>
    {spec}
  </option>
))}

              </select>
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded"
        >
          {isSignupMode ? "Signup" : "Login"}
        </button>
      </form>
    </div>
  );
}

// Prop validation
AuthPage.propTypes = {
  isSignup: PropTypes.bool.isRequired,
};

export default AuthPage;
