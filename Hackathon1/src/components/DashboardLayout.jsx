import Header from "./Header";
import Footer from "./Footer";
import PropTypes from "prop-types";
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ShimmerUI from "./ShimmerUI"; // Import the ShimmerUI component

function DashboardLayout({ userType }) {
  const location = useLocation(); // Get the current route
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Simulate a loading delay (e.g., fetching user or dashboard details)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after 2 seconds
    }, 2000);
    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  // Conditional content based on user type
  const getProjectInfo = () => {
    if (userType === "doctor") {
      return (
        <div className="bg-blue-100 p-6 rounded-md shadow-md mb-6">
          <h2 className="text-2xl font-semibold text-blue-500 mb-4">
            Doctor`s Dashboard
          </h2>
          <p className="text-gray-700">
            As a doctor, you can use this tool to optimize healthcare workflows,
            such as patient scheduling or resource management.
          </p>
        </div>
      );
    } else if (userType === "patient") {
      return (
        <div className="bg-green-100 p-6 rounded-md shadow-md mb-6">
          <h2 className="text-2xl font-semibold text-green-500 mb-4">
            Patient`s Dashboard
          </h2>
          <p className="text-gray-700">
            This platform will assist in the smart management and secure storage
            of patient data.
          </p>
        </div>
      );
    } else {
      return (
        <div className="bg-gray-100 p-6 rounded-md shadow-md mb-6">
          <h2 className="text-2xl font-semibold text-gray-500 mb-4">
            Welcome to the Project
          </h2>
          <p className="text-gray-700"></p>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Header */}
      <Header userType={userType} />

      {/* Display projectInfo or Shimmer UI */}
      {location.pathname === "/patient" &&
        (isLoading ? <ShimmerUI /> : getProjectInfo())}

      {/* Dynamic Main Content */}
      <main className="flex-grow bg-gray-100 p-6">
        {isLoading ? <ShimmerUI /> : <Outlet />}
      </main>

      {/* Fixed Footer */}
      <Footer />
    </div>
  );
}

DashboardLayout.propTypes = {
  userType: PropTypes.string.isRequired, // "doctor" or "patient"
};

export default DashboardLayout;

