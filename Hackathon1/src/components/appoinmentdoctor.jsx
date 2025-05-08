// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function AppointmentDoctor() {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/booked-slots', {
//           withCredentials: true,
//         });
//         setAppointments(response.data);
//       } catch (error) {
//         console.error("Error fetching appointments:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, []);

//   if (loading) {
//     return <p>Loading patient appointments...</p>;
//   }

//   if (appointments.length === 0) {
//     return <p>No patients have booked appointments yet.</p>;
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-4">Appointments with Your Patients</h2>
//       <ul className="space-y-4">
//         {appointments.map((appt) => (
//           <li key={appt._id} className="border p-4 rounded shadow">
//             {appt.patientId ? (
//               <>
//                 <p><strong>Patient:</strong> {appt.patientId.firstName} {appt.patientId.lastName}</p>
//                 <p><strong>Email:</strong> {appt.patientId.email}</p>
//               </>
//             ) : (
//               <p>Patient information not available</p>
//             )}
//             <p><strong>Date:</strong> {new Date(appt.date).toLocaleDateString()}</p>
//             <p><strong>Time:</strong> {appt.time}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default AppointmentDoctor;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AppointmentDoctor() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groupedAppointments, setGroupedAppointments] = useState({});
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/booked-slots', {
          withCredentials: true,
        });
        setAppointments(response.data);
        groupAppointmentsByDate(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const groupAppointmentsByDate = (appointments) => {
    const grouped = appointments.reduce((acc, appt) => {
      const date = new Date(appt.date).toLocaleDateString();
      if (!acc[date]) acc[date] = [];
      acc[date].push(appt);
      return acc;
    }, {});
    setGroupedAppointments(grouped);
  };

  const handleDateFilterChange = (event) => {
    setSelectedDate(event.target.value);
  };

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-500 animate-pulse">
        Loading patient appointments...
      </div>
    );
  }

  if (Object.keys(groupedAppointments).length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No patients have booked appointments yet.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-semibold mb-6 text-blue-700 text-center">
        Appointments with Your Patients
      </h2>

      {/* Date Filter */}
      <div className="mb-6">
        <label htmlFor="dateFilter" className="block text-lg font-medium text-gray-700">
          Filter by Date:
        </label>
        <select
          id="dateFilter"
          className="mt-2 p-2 w-full border border-gray-300 rounded-md"
          onChange={handleDateFilterChange}
          value={selectedDate}
        >
          <option value="">All Dates</option>
          {Object.keys(groupedAppointments).map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      {/* Appointments */}
      {Object.keys(groupedAppointments).map((date) =>
        (selectedDate === '' || selectedDate === date) ? (
          <div key={date}>
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">{date}</h3>
            <div className="space-y-6">
              {groupedAppointments[date].map((appt) => {
                const patient = appt.patientId;
                const patientName = patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown';

                return (
                  <Link
                    key={appt._id}
                    to={patient ? `/doctor/patient/${patient._id}` : '#'}
                    className="block bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    <div>
                      {patient ? (
                        <>
                          <p className="text-lg font-medium text-gray-800">
                            <strong className="text-blue-600">Patient:</strong> {patientName}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Email:</strong> {patient.email}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm text-gray-500">Patient information not available</p>
                      )}

                      <p className="text-sm text-gray-600 mt-2">
                        <strong className="text-blue-600">Date:</strong> {new Date(appt.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong className="text-blue-600">Time:</strong> {appt.timeSlot}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}

export default AppointmentDoctor;
