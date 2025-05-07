// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Appointments() {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const res = await fetch('http://localhost:3000/booked-slots', {
//           credentials: 'include',
//         });
//         const data = await res.json();
//         if (res.ok) {
//           setAppointments(data);
//         } else {
//           console.error("Failed to fetch appointments");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, []);

//   const handleCardClick = (patientId) => {
//     if (patientId) {
//       navigate(`/patient/prescriptions/${patientId}`);
//     } else {
//       console.warn("No patient ID found for this appointment");
//     }
//   };

//   if (loading) return <p className="p-4 text-center">Loading appointments...</p>;
//   if (appointments.length === 0) return <p className="p-4 text-center">No appointments found.</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">Your Booked Appointments</h2>
//       <div className="grid gap-4 max-w-3xl mx-auto">
//         {appointments.map((appt) => (
//           <div
//             key={appt._id}
//             onClick={() => handleCardClick(appt.patientId)}
//             className="cursor-pointer bg-white p-5 rounded-xl shadow hover:bg-gray-50 transition"
//           >
//             {appt.doctorId ? (
//               <>
//                 <p><strong>Doctor:</strong> {appt.doctorId.firstName} {appt.doctorId.lastName}</p>
//                 <p><strong>Email:</strong> {appt.doctorId.email}</p>
//               </>
//             ) : (
//               <p>Doctor details not available</p>
//             )}
//             <p><strong>Date:</strong> {new Date(appt.date).toLocaleDateString()}</p>
//             <p><strong>Time:</strong> {appt.time}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Appointments;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch('http://localhost:3000/booked-slots', {
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok) {
          setAppointments(data);
        } else {
          console.error("Failed to fetch appointments");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleCardClick = (patientId) => {
    if (patientId) {
      navigate(`/patient/prescriptions/${patientId}`);
    } else {
      console.warn("No patient ID found for this appointment");
    }
  };

  if (loading) return <p className="p-4 text-center text-blue-500">Loading appointments...</p>;
  if (appointments.length === 0) return <p className="p-4 text-center text-blue-500">No appointments found.</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-semibold text-center text-blue-700 mb-8">Your Booked Appointments</h2>

      <div className="grid gap-6 max-w-4xl mx-auto md:grid-cols-2 lg:grid-cols-3">
        {appointments.map((appt) => (
          <div
            key={appt._id}
            onClick={() => handleCardClick(appt.patientId)}
            className="cursor-pointer bg-white p-6 rounded-lg shadow-lg hover:bg-gray-100 transition transform hover:scale-105"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-lg font-semibold text-blue-700">Doctor:</p>
                <p className="text-md text-gray-700">{appt.doctorId ? `${appt.doctorId.firstName} ${appt.doctorId.lastName}` : "Doctor details not available"}</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-blue-700">Time:</p>
                <p className="text-md text-gray-700">{appt.timeSlot}</p>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-lg font-semibold text-blue-700">Date:</p>
                <p className="text-md text-gray-700">{new Date(appt.date).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div>
                <p className="text-lg font-semibold text-blue-700">Email:</p>
                <p className="text-md text-gray-700">{appt.doctorId ? appt.doctorId.email : "No email available"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Appointments;
