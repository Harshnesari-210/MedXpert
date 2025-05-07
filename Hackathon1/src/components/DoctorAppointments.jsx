// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// function DoctorAppointments() {
//   const { doctorId } = useParams();
//   const [doctorDetails, setDoctorDetails] = useState(null);
//   const [date, setDate] = useState("");
//   const [timeSlot, setTimeSlot] = useState("");
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch doctor details
//   useEffect(() => {
//     const fetchDoctorDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/doctor/${doctorId}`);
//         const data = await response.json();
//         if (data.error) {
//           alert("Error fetching doctor details: " + data.error);
//           return;
//         }
//         setDoctorDetails(data.doctor);
//       } catch (error) {
//         console.error("Error:", error);
//         alert("Failed to fetch doctor details.");
//       }
//     };

//     fetchDoctorDetails();
//   }, [doctorId]);

//   // ✅ Updated to use /available-slots endpoint
//   useEffect(() => {
//     if (!date) return;

//     const fetchSlots = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/available-slots?doctorId=${doctorId}&date=${date}`);
//         const data = await response.json();
//         if (!data.success) {
//           alert("Error fetching slots: " + (data.message || data.error));
//           return;
//         }
//         setAvailableSlots(data.slots || []);
//       } catch (error) {
//         console.error("Error fetching slots:", error);
//       }
//     };

//     fetchSlots();
//   }, [doctorId, date]);

//   const handleBooking = async () => {
//     if (!date || !timeSlot) {
//       alert("Please select date and time slot.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const bookingData = { doctorId, date, timeSlot };

//       const response = await fetch("http://localhost:3000/book-slot", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include", // for cookie token
//         body: JSON.stringify(bookingData),
//       });

//       const data = await response.json();
//       if (data.success) {
//         alert("✅ Appointment booked successfully!");
//         setTimeSlot("");
//         setAvailableSlots((prev) => prev.filter(slot => slot !== timeSlot));
//       } else {
//         alert("❌ Booking failed: " + data.message);
//       }
//     } catch (error) {
//       console.error("Booking Error:", error);
//       alert("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!doctorDetails) return <div className="text-center mt-20 text-xl font-semibold">Loading doctor details...</div>;

//   return (
//     <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100">
//       <h1 className="text-3xl font-bold mb-6 text-blue-700">Book an Appointment</h1>

//       <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-semibold mb-1">Dr. {doctorDetails.firstName} {doctorDetails.lastName}</h2>
//         <p className="text-gray-700 mb-4"><strong>Specialization:</strong> {doctorDetails.speciality}</p>

//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Select Date:</label>
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className="w-full border rounded p-2"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Select Time Slot:</label>
//           <select
//             value={timeSlot}
//             onChange={(e) => setTimeSlot(e.target.value)}
//             className="w-full border rounded p-2"
//           >
//             <option value="">-- Choose Time Slot --</option>
//             {availableSlots.map((slot, idx) => (
//               <option key={idx} value={slot}>
//                 {slot}
//               </option>
//             ))}
//           </select>
//         </div>

//         <button
//           onClick={handleBooking}
//           disabled={loading}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold mt-2"
//         >
//           {loading ? "Booking..." : "Confirm Appointment"}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default DoctorAppointments;



import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function DoctorAppointments() {
  const { doctorId } = useParams();
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [loading, setLoading] = useState(false);
  const [weeklySlots, setWeeklySlots] = useState({});

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const res = await fetch(`http://localhost:3000/doctor/${doctorId}`);
        const data = await res.json();
        setDoctorDetails(data.doctor);
      } catch (err) {
        alert("Error fetching doctor details.");
      }
    };
    fetchDoctorDetails();
  }, [doctorId]);

  const getNext7Dates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      dates.push(d.toISOString().split("T")[0]);
    }
    return dates;
  };

  useEffect(() => {
    const fetchWeeklySlots = async () => {
      const results = {};
      const dates = getNext7Dates();
      for (const date of dates) {
        try {
          const res = await fetch(`http://localhost:3000/available-slots?doctorId=${doctorId}&date=${date}`);
          const data = await res.json();
          results[date] = data?.slots || [];
        } catch (err) {
          results[date] = [];
        }
      }
      setWeeklySlots(results);
    };
    fetchWeeklySlots();
  }, [doctorId]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setAvailableSlots(weeklySlots[date] || []);
    setSelectedTimeSlot(""); // reset time slot on date change
  };

  const handleTimeSelect = (slot) => {
    setSelectedTimeSlot(slot);
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTimeSlot) return;

    try {
      setLoading(true);
      const bookingData = { doctorId, date: selectedDate, timeSlot: selectedTimeSlot };

      const response = await fetch("http://localhost:3000/book-slot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();
      if (data.success) {
        alert("✅ Appointment booked!");
        // Refresh available slots
        setAvailableSlots((prev) => prev.filter((slot) => slot !== selectedTimeSlot));
        setWeeklySlots((prev) => ({
          ...prev,
          [selectedDate]: prev[selectedDate].filter((slot) => slot !== selectedTimeSlot),
        }));
        setSelectedTimeSlot(""); // reset after booking
      } else {
        alert("❌ Booking failed: " + data.message);
      }
    } catch (err) {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!doctorDetails) return <div className="text-center mt-20 text-xl font-semibold">Loading doctor details...</div>;

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Book an Appointment</h1>
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-1">Dr. {doctorDetails.firstName} {doctorDetails.lastName}</h2>
        <p className="text-gray-700 mb-4"><strong>Specialization:</strong> {doctorDetails.speciality}</p>

        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2">Select a Date:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {getNext7Dates().map((date) => {
              const isAvailable = (weeklySlots[date] || []).length > 0;
              return (
                <button
                  key={date}
                  onClick={() => handleDateSelect(date)}
                  className={`rounded p-3 text-sm font-medium border ${
                    selectedDate === date ? "ring-2 ring-blue-500" : ""
                  } ${
                    isAvailable
                      ? "bg-green-100 text-green-800 border-green-400 hover:bg-green-200"
                      : "bg-red-100 text-red-800 border-red-400 cursor-not-allowed"
                  }`}
                  disabled={!isAvailable}
                >
                  {new Date(date).toLocaleDateString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </button>
              );
            })}
          </div>
        </div>

        {selectedDate && (
          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-2">Available Time Slots:</h3>
            {availableSlots.length === 0 ? (
              <p className="text-red-600">No slots available for this date.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {availableSlots.map((slot, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTimeSelect(slot)}
                    className={`px-4 py-2 rounded text-sm border ${
                      selectedTimeSlot === slot
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-blue-700 border-blue-400 hover:bg-blue-100"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {selectedTimeSlot && (
          <div className="text-center mt-4">
            <button
              onClick={handleBooking}
              disabled={loading}
              className="bg-blue-700 text-white px-6 py-2 rounded-xl hover:bg-blue-800"
            >
              {loading ? "Booking..." : "Book Appointment"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorAppointments;
