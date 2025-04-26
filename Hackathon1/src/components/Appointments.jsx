function Appointments() {
  // Local database object
  const users = [
    {
      _id: "6748f042eca02cac690601dc",
      firstName: "Akash",
      lastName: "Halli",
      email: "aka@gmail.com",
      password: "$2b$10$lh.GPiB3de09tmfUHRqcdO2TYIyVdaUbFJWo4MyZJ5CUN/DbUrTzO",
      role: "patient",
      gender: null,
      dob: null,
      phone: "",
      speciality: null,
      __v: 0,
    },
    {
      _id: "6748f219ca690c16723de8ef",
      firstName: "Akash",
      lastName: "Halli",
      email: "10@gmail.com",
      password: "$2b$10$N8wLOVrgaSxhFupORNgHhu/gAScuVf29HfKHWdjGvtr5CtiTulTmS",
      role: "doctor",
      gender: null,
      dob: null,
      phone: "",
      speciality: "Neurologist",
      __v: 0,
    },
    {
      _id: "6748f23eca690c16723de8f3",
      firstName: "Akash",
      lastName: "Halli",
      email: "12@gmail.com",
      password: "$2b$10$p4iiliiZG21AkP6wrZM6Me2BNg4aeMyR7AMJz3WCmGqcG3vHHgQHq",
      role: "patient",
      gender: null,
      dob: null,
      phone: "",
      speciality: null,
      __v: 0,
    },
    {
      _id: "6748f23eca690c16723de8f3",
      firstName: "Harsh",
      lastName: "Nesari",
      email: "12@gmail.com",
      password: "$2b$10$p4iiliiZG21AkP6wrZM6Me2BNg4aeMyR7AMJz3WCmGqcG3vHHgQHq",
      role: "doctor",
      gender: null,
      dob: null,
      phone: "",
      speciality: "cardiologist",
      __v: 0,
    },
  ];

  // Filter out doctors from the local database
  const doctors = users.filter((user) => user.role === "doctor");

  // Handle Book Appointment button click
  const handleBookAppointment = (doctorId) => {
    alert(`Booking appointment with Doctor ID: ${doctorId}`);
    // You can navigate to a booking form or send a POST request here
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Available Doctors</h1>
      {/* Doctor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="border p-4 rounded shadow-md bg-white"
          >
            <h2 className="text-xl font-semibold mb-2">
              Dr. {doctor.firstName} {doctor.lastName}
            </h2>
            <p className="text-gray-700 mb-4">
              <strong>Specialization:</strong> {doctor.speciality || "N/A"}
            </p>
            <button
              onClick={() => handleBookAppointment(doctor._id)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>
      {/* If no doctors are available */}
      {doctors.length === 0 && (
        <p className="text-gray-600 mt-4">
          No doctors available at the moment.
        </p>
      )}
    </div>
  );
}

export default Appointments;
