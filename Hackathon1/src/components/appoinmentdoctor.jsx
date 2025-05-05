import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AppointmentDoctor() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/booked-slots', {
          withCredentials: true,
        });
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <p>Loading patient appointments...</p>;
  }

  if (appointments.length === 0) {
    return <p>No patients have booked appointments yet.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Appointments with Your Patients</h2>
      <ul className="space-y-4">
        {appointments.map((appt) => (
          <li key={appt._id} className="border p-4 rounded shadow">
            {appt.patientId ? (
              <>
                <p><strong>Patient:</strong> {appt.patientId.firstName} {appt.patientId.lastName}</p>
                <p><strong>Email:</strong> {appt.patientId.email}</p>
              </>
            ) : (
              <p>Patient information not available</p>
            )}
            <p><strong>Date:</strong> {new Date(appt.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {appt.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentDoctor;
