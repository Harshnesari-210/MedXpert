import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function DoctorAppointments() {
  const { doctorId } = useParams();
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch doctor details
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

  // ✅ Updated to use /available-slots endpoint
  useEffect(() => {
    if (!date) return;

    const fetchSlots = async () => {
      try {
        const response = await fetch(`http://localhost:3000/available-slots?doctorId=${doctorId}&date=${date}`);
        const data = await response.json();
        if (!data.success) {
          alert("Error fetching slots: " + (data.message || data.error));
          return;
        }
        setAvailableSlots(data.slots || []);
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };

    fetchSlots();
  }, [doctorId, date]);

  const handleBooking = async () => {
    if (!date || !timeSlot) {
      alert("Please select date and time slot.");
      return;
    }

    try {
      setLoading(true);
      const bookingData = { doctorId, date, timeSlot };

      const response = await fetch("http://localhost:3000/book-slot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // for cookie token
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();
      if (data.success) {
        alert("✅ Appointment booked successfully!");
        setTimeSlot("");
        setAvailableSlots((prev) => prev.filter(slot => slot !== timeSlot));
      } else {
        alert("❌ Booking failed: " + data.message);
      }
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!doctorDetails) return <div className="text-center mt-20 text-xl font-semibold">Loading doctor details...</div>;

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Book an Appointment</h1>

      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-1">Dr. {doctorDetails.firstName} {doctorDetails.lastName}</h2>
        <p className="text-gray-700 mb-4"><strong>Specialization:</strong> {doctorDetails.speciality}</p>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Select Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Select Time Slot:</label>
          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">-- Choose Time Slot --</option>
            {availableSlots.map((slot, idx) => (
              <option key={idx} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleBooking}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold mt-2"
        >
          {loading ? "Booking..." : "Confirm Appointment"}
        </button>
      </div>
    </div>
  );
}

export default DoctorAppointments;
