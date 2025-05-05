// import { Link, useNavigate } from "react-router-dom";
// import PropTypes from "prop-types";
// import {
//   AiOutlineHome,
//   AiOutlineCalendar,
//   AiOutlineFileText,
//   AiOutlineDollarCircle,
//   AiOutlineUser,
// } from "react-icons/ai"; // Import icons from react-icons

// function Header({ userType }) {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Handle logout logic here (clear cookies, redirect to login, etc.)
//     navigate("/login");
//   };

//   return (
//     <>
//       <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 shadow-lg">
//         <div className="container mx-auto flex justify-between items-center">
//           {/* Logo */}
//           <div className="text-3xl font-extrabold">
//             {userType === "patient" ? "MedChain" : "Dashboard"}
//           </div>

//           {/* Navigation Links */}
//           <nav className="flex gap-4">
//             <Link
//               to={`/${userType}`}
//               className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-blue-100 hover:scale-105 transition-transform"
//             >
//               <AiOutlineHome className="text-lg" />
//               Home
//             </Link>
//             {userType === "patient" && (
//               <>
//                 <Link
//                   to={`/${userType}/appointments`}
//                   className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-blue-100 hover:scale-105 transition-transform"
//                 >
//                   <AiOutlineCalendar className="text-lg" />
//                   Appointments
//                 </Link>
//                 <Link
//                   to={`/${userType}/labreports`}
//                   className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-blue-100 hover:scale-105 transition-transform"
//                 >
//                   <AiOutlineFileText className="text-lg" />
//                   Lab Reports
//                 </Link>
//                 <Link
//                   to={`/${userType}/billing`}
//                   className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-blue-100 hover:scale-105 transition-transform"
//                 >
//                   <AiOutlineDollarCircle className="text-lg" />
//                   Billing
//                 </Link>
//               </>
//             )}
//             {userType === "doctor" && (
//               <>
//                 <Link
//                   to={`/${userType}/profile`}
//                   className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-blue-100 hover:scale-105 transition-transform"
//                 >
//                   <AiOutlineUser className="text-lg" />
//                   Profile
//                 </Link>
//                 <Link
//                   to={`/${userType}/appointments`}
//                   className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-blue-100 hover:scale-105 transition-transform"
//                 >
//                   <AiOutlineCalendar className="text-lg" />
//                   Appointments
//                 </Link>
//               </>
//             )}
//           </nav>

//           {/* Logout */}
//           <button
//             onClick={handleLogout}
//             className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 hover:scale-105 transition-transform"
//           >
//             Logout
//           </button>
//         </div>
//       </header>
//     </>
//   );
// }

// Header.propTypes = {
//   userType: PropTypes.string.isRequired,
// };

// export default Header;

import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AiOutlineHome,
  AiOutlineCalendar,
  AiOutlineFileText,
  AiOutlineDollarCircle,
  AiOutlineUser,
  AiOutlineUpload,
} from "react-icons/ai";
import axios from "axios";

function Header({ userType }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file); // adjust based on your backend key
    formData.append("description", "Uploaded via header");

    try {
      const response = await axios.post("http://localhost:3000/medical-files/upload", formData, {
        withCredentials: true, // important for sending cookies
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("File uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to upload file.");
    }
  };

  return (
    <>
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-3xl font-extrabold">
            {userType === "patient" ? "MedChain" : "Dashboard"}
          </div>

          {/* Navigation Links */}
          <nav className="flex gap-4 items-center">
            <Link
              to={`/${userType}`}
              className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-blue-100 hover:scale-105 transition-transform"
            >
              <AiOutlineHome className="text-lg" />
              Home
            </Link>

            {userType === "patient" && (
              <>
                <Link
                  to={`/${userType}/appointments`}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-blue-100 hover:scale-105 transition-transform"
                >
                  <AiOutlineCalendar className="text-lg" />
                  Appointments
                </Link>
                <Link
                  to={`/${userType}/labreports`}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-blue-100 hover:scale-105 transition-transform"
                >
                  <AiOutlineFileText className="text-lg" />
                  Lab Reports
                </Link>
                <Link
                  to={`/${userType}/billing`}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-blue-100 hover:scale-105 transition-transform"
                >
                  <AiOutlineDollarCircle className="text-lg" />
                  Billing
                </Link>

                {/* Upload Button */}
                <Link
  to={`/${userType}/uploadData`}
  className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-blue-100 hover:scale-105 transition-transform"
>
  <AiOutlineUpload className="text-lg" />
  Upload
</Link>
<Link
  to={`/${userType}/Myfiles`}
  className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-blue-100 hover:scale-105 transition-transform"
>
  <AiOutlineUpload className="text-lg" />
  My Files
</Link>

              </>
            )}

            {userType === "doctor" && (
              <>
                <Link
                  to={`/${userType}/profile`}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-blue-100 hover:scale-105 transition-transform"
                >
                  <AiOutlineUser className="text-lg" />
                  Profile
                </Link>
                <Link
                  to={`/${userType}/appointments`}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-blue-100 hover:scale-105 transition-transform"
                >
                  <AiOutlineCalendar className="text-lg" />
                  Appointments
                </Link>
                <Link
  to={`/${userType}/availability`}
  className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-blue-100 hover:scale-105 transition-transform"
>
  <AiOutlineUpload className="text-lg" />
  SEt availability
</Link>
              </>
            )}
          </nav>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 hover:scale-105 transition-transform"
          >
            Logout
          </button>
        </div>
      </header>
    </>
  );
}

Header.propTypes = {
  userType: PropTypes.string.isRequired,
};

export default Header;
