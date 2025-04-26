import { useState, useEffect } from "react";
import axios from "axios";

function DoctorProfile() {
  const [doctor, setDoctor] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    dob: "",
    phone: "",
    speciality: "", // New speciality field
  });

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch doctor data on mount
  useEffect(() => {
    axios
      .get("/doctor-profile", { withCredentials: true }) // Assuming API for doctor profile
      .then((response) => setDoctor(response.data))
      .catch((err) => {
        setError("Failed to load profile");
        console.error("Error fetching profile:", err);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const handleSave = () => {
    axios
      .put("/update-doctor-profile", doctor, { withCredentials: true })
      .then((response) => {
        setDoctor(response.data);
        setSuccess("Profile updated successfully!");
        setIsEditing(false); // Exit edit mode
      })
      .catch((err) => {
        setError("Failed to update profile");
        console.error("Error updating profile:", err);
      });
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded p-6">
      <h1 className="text-xl font-bold mb-4">Doctor Profile</h1>

      {/* Error/Success Messages */}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}

      {/* Profile Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={doctor.firstName}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className={`w-full px-3 py-2 border rounded ${
              isEditing ? "bg-gray-100" : "bg-gray-200 cursor-not-allowed"
            }`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={doctor.lastName}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className={`w-full px-3 py-2 border rounded ${
              isEditing ? "bg-gray-100" : "bg-gray-200 cursor-not-allowed"
            }`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={doctor.email}
            readOnly
            className="w-full px-3 py-2 border rounded bg-gray-200 cursor-not-allowed"
          />
        </div>

        {/* Gender Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select
            name="gender"
            value={doctor.gender}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`w-full px-3 py-2 border rounded ${
              isEditing ? "bg-gray-100" : "bg-gray-200 cursor-not-allowed"
            }`}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Speciality Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Speciality</label>
          <select
            name="speciality"
            value={doctor.speciality}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`w-full px-3 py-2 border rounded ${
              isEditing ? "bg-gray-100" : "bg-gray-200 cursor-not-allowed"
            }`}
          >
            {["cardiology", "neurology", "pediatrics", "orthopedics"].map(
              (speciality) => (
                <option key={speciality} value={speciality}>
                  {speciality.charAt(0).toUpperCase() + speciality.slice(1)}
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={doctor.dob}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className={`w-full px-3 py-2 border rounded ${
              isEditing ? "bg-gray-100" : "bg-gray-200 cursor-not-allowed"
            }`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={doctor.phone}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className={`w-full px-3 py-2 border rounded ${
              isEditing ? "bg-gray-100" : "bg-gray-200 cursor-not-allowed"
            }`}
          />
        </div>
      </div>

      {/* Edit/Save Buttons */}
      <div className="flex justify-between mt-4">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}

export default DoctorProfile;
