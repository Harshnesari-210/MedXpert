// // // import { useState } from "react";

// // // function LabReport() {
// // //   const [selectedFile, setSelectedFile] = useState(null); // State to hold the selected file

// // //   // Handle file selection
// // //   const handleFileChange = (e) => {
// // //     setSelectedFile(e.target.files[0]);
// // //   };

// // // // LabReport.jsx
// // // const handleSubmit = async (e) => {
// // //   e.preventDefault();

// // //   if (!selectedFile) {
// // //     alert("Please select a PDF file first.");
// // //     return;
// // //   }

// // //   const formData = new FormData();
// // //   formData.append("file", selectedFile);

// // //   try {
// // //     const response = await fetch("http://localhost:5000/generate_report", {
// // //       method: "POST",
// // //       body: formData,
// // //     });

// // //     const data = await response.json();

// // //     if (data.error) {
// // //       alert("Error: " + data.error);
// // //     } else {
// // //       console.log("Recommended Doctor:", data.recommended_doctor);
// // //       // You can send this to backend for matching doctors or display in UI
// // //     }
// // //   } catch (error) {
// // //     console.error("Error uploading file:", error);
// // //     alert("Something went wrong while uploading the report.");
// // //   }
// // // };


// // //   return (
// // //     <div className="flex flex-col items-center justify-center h-4/5">
// // //       <h1 className="text-2xl font-bold mb-6">Upload Your Lab Report</h1>

// // //       {/* Form to upload the PDF */}
// // //       <form
// // //         onSubmit={handleSubmit}
// // //         className="bg-white p-6 rounded shadow-md w-96 flex flex-col items-center"
// // //       >
// // //         <label className="block text-gray-700 font-medium mb-4">
// // //           Add your lab report (PDF):
// // //         </label>

// // //         <input
// // //   type="file"
// // //   name="file"  // Add this!
// // //   accept="application/pdf"
// // //   onChange={handleFileChange}
// // //   className="mb-4 border border-gray-300 rounded px-3 py-2 w-full"
// // // />


// // //         {/* Submit Button */}
// // //         <button
// // //           type="submit"
// // //           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// // //         >
// // //           Submit
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // }

// // // export default LabReport;


// // import { useState } from "react";

// // function LabReport() {
// //   const [selectedFile, setSelectedFile] = useState(null);
// //   const [recommendedDoctor, setRecommendedDoctor] = useState(null);
// //   const [matchedDoctors, setMatchedDoctors] = useState([]);

// //   const handleFileChange = (e) => {
// //     setSelectedFile(e.target.files[0]);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!selectedFile) {
// //       alert("Please select a PDF file first.");
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append("file", selectedFile);

// //     try {
// //       // 1. Send to Flask for doctor recommendation
// //       const response = await fetch("http://localhost:5000/generate_report", {
// //         method: "POST",
// //         body: formData,
// //       });

// //       const data = await response.json();

// //       if (data.error) {
// //         alert("Error: " + data.error);
// //         return;
// //       }

// //       const doctorSpeciality = data.recommended_doctor;
// //       setRecommendedDoctor(doctorSpeciality);

// //       // 2. Send to Express for doctor matching
// //       const compareResponse = await fetch("http://localhost:3000/api/data", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ recommended_doctor: doctorSpeciality }),
// //       });

// //       const compareData = await compareResponse.json();

// //       if (compareData.error) {
// //         alert(compareData.error);
// //       } else {
// //         setMatchedDoctors(compareData.doctors);
// //       }
// //     } catch (error) {
// //       console.error("Error:", error);
// //       alert("Something went wrong.");
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col items-center justify-center h-4/5">
// //       <h1 className="text-2xl font-bold mb-6">Upload Your Lab Report</h1>

// //       <form
// //         onSubmit={handleSubmit}
// //         className="bg-white p-6 rounded shadow-md w-96 flex flex-col items-center"
// //       >
// //         <input
// //           type="file"
// //           name="file"
// //           accept="application/pdf"
// //           onChange={handleFileChange}
// //           className="mb-4 border border-gray-300 rounded px-3 py-2 w-full"
// //         />
// //         <button
// //           type="submit"
// //           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// //         >
// //           Submit
// //         </button>
// //       </form>

// //       {recommendedDoctor && (
// //         <div className="mt-6 text-left">
// //           <h3 className="font-semibold">Recommended Doctor Specialization:</h3>
// //           <p>{recommendedDoctor}</p>

// //           {matchedDoctors.length > 0 && (
// //             <>
// //               <h3 className="font-semibold mt-4">Matched Doctors:</h3>
// //               {matchedDoctors.map((doc, index) => (
// //                 <div key={index} className="border p-2 my-2 rounded">
// //                   <p><strong>Name:</strong> {doc.Name}</p>
// //                   <p><strong>Speciality:</strong> {doc["Doctor Specialization"]}</p>
// //                   <p><strong>Contact:</strong> {doc.Contact}</p>
// //                 </div>
// //               ))}
// //             </>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default LabReport;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

// function LabReport() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [recommendedDoctor, setRecommendedDoctor] = useState(null);
//   const [matchedDoctors, setMatchedDoctors] = useState([]);
//   const navigate = useNavigate(); // Initialize navigate for page redirection



  

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedFile) {
//       alert("Please select a PDF file first.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     try {
//       // Step 1: Send to Flask for recommendation
//       const response = await fetch("http://localhost:5000/generate_report", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
     
//       if (data.error) {
//         alert("Error: " + data.error);
//         return;
//       }

//       const doctorSpeciality = data.recommended_doctor;
//       setRecommendedDoctor(doctorSpeciality);

//       // Step 2: Send to Express for matching doctors
//       const compareResponse = await fetch("http://localhost:3000/doc", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ recommended_doctor: doctorSpeciality }),
//       });

//       const compareData = await compareResponse.json();
      
//       if (compareData.error) {
//         alert(compareData.error);
//       } else {
//         setMatchedDoctors(compareData.doctors);
//         console.log(matchedDoctors)
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Something went wrong.");
//     }
//   };
  
//   const handleAppointment = (doctorId) => {
//     console.log('Navigating to appointments for doctor:', doctorId); // Check if doctorId is correct
//     navigate(`/patient/appointments/${doctorId}`);
//   };
  
  
  
//   return (
//     <div className="flex flex-col items-center justify-center h-4/5">
//       <h1 className="text-2xl font-bold mb-6">Upload Your Lab Report</h1>
  
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded shadow-md w-96 flex flex-col items-center"
//       >
//         <input
//           type="file"
//           name="file"
//           accept="application/pdf"
//           onChange={handleFileChange}
//           className="mb-4 border border-gray-300 rounded px-3 py-2 w-full"
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Submit
//         </button>
//       </form>
  
//       {recommendedDoctor && (
//         <div className="mt-6 text-left w-96">
//           <h3 className="font-semibold mb-2 text-lg">Recommended Specialization:</h3>
//           <p className="mb-4 text-blue-700">{recommendedDoctor}</p>
  
//           {matchedDoctors.length > 0 ? (
//             <>
//               <h3 className="font-semibold text-lg mb-2">Matched Doctors:</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {matchedDoctors.map((doc, index) => (
//                   <div
//                     key={index}
//                     className="bg-white p-5 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
//                   >
//                     <div className="text-center">
//                       <h4 className="font-semibold text-xl text-gray-800">{doc.name}</h4>
//                       <p className="text-gray-600">{doc.specialization}</p>
//                     </div>
//                     <div className="mt-4 text-center">
//                       <p className="text-gray-500">Contact: {doc.contact}</p>
//                       <button
//                         onClick={() => handleAppointment(doc._id)} // Pass the doctor ID here
//                         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-200"
//                       >
//                         Book Appointment
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           ) : (
//             <p className="text-red-500">No matching doctors found.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }  

// export default LabReport;


import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LabReport() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [recommendedDoctor, setRecommendedDoctor] = useState(null);
  const [matchedDoctors, setMatchedDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a PDF file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/generate_report", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.error) {
        alert(data.error);
        return;
      }

      setRecommendedDoctor(data.recommended_doctor);

      const compareResponse = await fetch("http://localhost:3000/doc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recommended_doctor: data.recommended_doctor }),
      });

      const compareData = await compareResponse.json();
      if (compareData.error) {
        alert(compareData.error);
      } else {
        setMatchedDoctors(compareData.doctors);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleAppointment = (doctorId) => navigate(`/patient/appointments/${doctorId}`);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Upload Lab Report
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6"
      >
        <label className="block mb-4 font-medium text-gray-700">
          Select PDF Report:
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mb-6 w-full border border-gray-300 p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>

      {loading && (
        <div className="flex flex-col items-center mt-10">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-blue-700 font-medium">Processing report...</p>
        </div>
      )}

      {!loading && recommendedDoctor && (
        <div className="max-w-4xl mx-auto mt-10">
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Recommended Specialization:
            </h2>
            <p className="text-blue-800 font-bold text-lg">{recommendedDoctor}</p>
          </div>

          {matchedDoctors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedDoctors.map((doc, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow p-4 border border-gray-200"
                >
                  <h3 className="text-lg font-semibold text-gray-800">{doc.name}</h3>
                  <p className="text-sm text-gray-600">{doc.specialization}</p>
                  <p className="text-sm text-gray-500 mt-1">Contact: {doc.contact}</p>
                  <button
                    onClick={() => handleAppointment(doc._id)}
                    className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                  >
                    Book Appointment
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-red-500 mt-4">No matching doctors found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default LabReport;
