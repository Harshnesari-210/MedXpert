// import Header from "./Header";
// import Footer from "./Footer";
// import PropTypes from "prop-types";
// import { Outlet, useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import ShimmerUI from "./ShimmerUI"; // Import the ShimmerUI component

// function DashboardLayout({ userType }) {
//   const location = useLocation(); // Get the current route
//   const [isLoading, setIsLoading] = useState(true); // Loading state

//   // Simulate a loading delay (e.g., fetching user or dashboard details)
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false); // Set loading to false after 2 seconds
//     }, 2000);
//     return () => clearTimeout(timer); // Cleanup timer on component unmount
//   }, []);

//   // Conditional content based on user type
//   const getProjectInfo = () => {
//     if (userType === "doctor") {
//       return (
//         <div className="bg-blue-100 p-6 rounded-md shadow-md mb-6">
//           <h2 className="text-2xl font-semibold text-blue-500 mb-4">
//             Doctor`s Dashboard
//           </h2>
//           <p className="text-gray-700">
//             As a doctor, you can use this tool to optimize healthcare workflows,
//             such as patient scheduling or resource management.
//           </p>
//         </div>
//       );
//     } else if (userType === "patient") {
//       return (
//         <div className="bg-green-100 p-6 rounded-md shadow-md mb-6">
//           <h2 className="text-2xl font-semibold text-green-500 mb-4">
//             Patient`s Dashboard
//           </h2>
//           <p className="text-gray-700">
//             This platform will assist in the smart management and secure storage
//             of patient data.
//           </p>
//         </div>
//       );
//     } else {
//       return (
//         <div className="bg-gray-100 p-6 rounded-md shadow-md mb-6">
//           <h2 className="text-2xl font-semibold text-gray-500 mb-4">
//             Welcome to the Project
//           </h2>
//           <p className="text-gray-700"></p>
//         </div>
//       );
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Fixed Header */}
//       <Header userType={userType} />

//       {/* Display projectInfo or Shimmer UI */}
//       {location.pathname === "/patient" &&
//         (isLoading ? <ShimmerUI /> : getProjectInfo())}

//       {/* Dynamic Main Content */}
//       <main className="flex-grow bg-gray-100 p-6">
//         {isLoading ? <ShimmerUI /> : <Outlet />}
//       </main>

//       {/* Fixed Footer */}
//       <Footer />
//     </div>
//   );
// }

// DashboardLayout.propTypes = {
//   userType: PropTypes.string.isRequired, // "doctor" or "patient"
// };

// export default DashboardLayout;

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
        <div className="bg-blue-50 p-8 rounded-md shadow-md mb-6">
          <h2 className="text-3xl font-semibold text-blue-600 mb-4">
            Doctor`s Dashboard
          </h2>
          <p className="text-gray-800 mb-4">
            Welcome, Doctor! This dashboard is designed to simplify your medical
            workflows. You can:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Manage patient appointments and scheduling efficiently.</li>
            <li>Access and update patient medical histories securely.</li>
            <li>
              Generate and view treatment summaries using ML-based insights.
            </li>
            <li>Streamline diagnosis with AI-powered recommendations.</li>
          </ul>
        </div>
      );
    } else if (userType === "patient") {
      return (
        <div className="bg-green-50 p-8 rounded-md shadow-md mb-6">
          <h2 className="text-3xl font-semibold text-green-600 mb-4">
            Patient`s Dashboard
          </h2>
          <p className="text-gray-800 mb-4">
            Welcome! Here you can manage your healthcare journey efficiently.
            Features include:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Secure access to medical reports and prescriptions.</li>
            <li>Book, view, or reschedule appointments with ease.</li>
            <li>
              Get personalized treatment insights with ML-powered
              summarizations.
            </li>
            <li>Track your billing and manage the transactions seamlessly.</li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="bg-gray-50 p-8 rounded-md shadow-md mb-6">
          <h2 className="text-3xl font-semibold text-gray-600 mb-4">
            Welcome to the Health Management System
          </h2>
          <p className="text-gray-800">
            This platform bridges the gap between patients and doctors, offering
            secure and intelligent healthcare solutions.
          </p>
        </div>
      );
    }
  };

  // ML Features Section
  // const renderMLFeatures = () => (
  //   <div className="bg-indigo-50 p-6 rounded-md shadow-md">
  //     <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
  //       Machine Learning Features
  //     </h2>
  //     <p className="text-gray-700 mb-4">
  //       Our system integrates advanced ML algorithms to enhance healthcare
  //       management:
  //     </p>
  //     <ul className="list-disc list-inside text-gray-700 space-y-2">
  //       <li>
  //         <strong>Medical Report Summarization:</strong> Generate concise,
  //         AI-powered summaries of complex medical reports.
  //       </li>
  //       <li>
  //         <strong>Patient Risk Analysis:</strong> Identify potential health
  //         risks using predictive analytics.
  //       </li>
  //       <li>
  //         <strong>Intelligent Scheduling:</strong> Optimize doctor availability
  //         and reduce patient wait times.
  //       </li>
  //     </ul>
  //   </div>
  // );

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      {/* Fixed Header */}
      <Header userType={userType} />

      {/* Main Content */}
      <main className="flex-grow p-6">
        {location.pathname === "/patient" &&
          (isLoading ? <ShimmerUI /> : getProjectInfo())}

        {location.pathname === "/doctor" &&
          (isLoading ? <ShimmerUI /> : getProjectInfo())}

        {/* Render ML Features */}
        {/* {!isLoading && renderMLFeatures()} */}

        {/* Dynamic Main Content */}
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
