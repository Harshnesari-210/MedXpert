import React, { useState } from "react";
import axios from "axios";

const DEFAULT_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "01:00 PM",
  "03:00 PM",
];

const SetAvailability = () => {
  const [date, setDate] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [message, setMessage] = useState("");

  const handleSlotToggle = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter((s) => s !== slot));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || selectedSlots.length === 0) {
      setMessage("Please select a date and at least one time slot.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:3000/doctor/availability",
        {
          date,
          slots: selectedSlots,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
    } catch (err) {
      const errorMsg =
        err.response?.data?.error || "Something went wrong.";
      setMessage(errorMsg);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-10 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Set Availability</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Select Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Select Time Slots</label>
          <div className="grid grid-cols-2 gap-3">
            {DEFAULT_SLOTS.map((slot) => (
              <label key={slot} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={slot}
                  checked={selectedSlots.includes(slot)}
                  onChange={() => handleSlotToggle(slot)}
                />
                <span>{slot}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
        >
          Save Availability
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm text-blue-600">{message}</p>
      )}
    </div>
  );
};

export default SetAvailability;
