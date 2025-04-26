import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function DoctorAppointments() {
  const { doctorId } = useParams();
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [availableSlots, setAvailableSlots] = useState([
    "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "03:00 PM"
  ]);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/doctor/${doctorId}`);
        const data = await response.json();

        if (data.error) {
          alert("Error fetching doctor details: " + data.error);
          return;
        }

        setDoctorDetails(data.doctor);
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to fetch doctor details.");
      }
    };

    fetchDoctorDetails();
  }, [doctorId]);

  const handleBooking = async () => {
    if (!date || !timeSlot) {
      alert("Please select date and time slot.");
      return;
    }

    const patientId = localStorage.getItem("userId"); // Or get from auth context

    try {
      const response = await fetch("http://localhost:3000/book-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId,
          patientId,
          timeSlot,
          date,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Appointment booked successfully!");
      } else {
        alert("Booking failed.");
      }
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Something went wrong.");
    }
  };

  if (!doctorDetails) return <div>Loading doctor details...</div>;

  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <h1 className="text-2xl font-bold mb-4">Book Appointment</h1>
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold mb-2">Dr. {doctorDetails.firstName} {doctorDetails.lastName}</h2>
        <p><strong>Specialization:</strong> {doctorDetails.speciality}</p>

        <label className="block mt-4">Select Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full mt-1 rounded"
        />

        <label className="block mt-4">Select Time Slot:</label>
        <select
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          className="border p-2 w-full mt-1 rounded"
        >
          <option value="">Select Slot</option>
          {availableSlots.map((slot, idx) => (
            <option key={idx} value={slot}>{slot}</option>
          ))}
        </select>

        <button
          onClick={handleBooking}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Confirm Appointment
        </button>
      </div>
    </div>
  );
}

export default DoctorAppointments;
