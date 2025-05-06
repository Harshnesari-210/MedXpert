import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/booked-slots', {
          withCredentials: true, // Needed if using cookies for auth
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
    return <p>Loading appointments...</p>;
  }

  if (appointments.length === 0) {
    return <p>No appointments found.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Your Booked Appointments</h2>
      <ul className="space-y-4">
        {appointments.map((appt) => (
          <li key={appt._id} className="border p-4 rounded shadow">
            {appt.doctorId ? (
              <>
                <p><strong>Doctor:</strong> {appt.doctorId.firstName} {appt.doctorId.lastName}</p>
                <p><strong>Speciality:</strong> {appt.doctorId.speciality}</p>
                <p><strong>Email:</strong> {appt.doctorId.email}</p>
              </>
            ) : appt.patientId ? (
              <>
                <p><strong>Patient:</strong> {appt.patientId.firstName} {appt.patientId.lastName}</p>
                <p><strong>Email:</strong> {appt.patientId.email}</p>
              </>
            ) : (
              <p>Unknown role</p>
            )}
            <p><strong>Date:</strong> {new Date(appt.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {appt.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Appointments;

