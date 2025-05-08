import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import database from "./src/config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Auth from "./src/modules/userAuth.js";
import Appointment from "./src/modules/appoinment.js";
import authenticateDoctor from "./src/middlewares/auth.js";
import path from "path";
import DoctorAvailability from "./src/modules/doctorAvailibility.js";
import medicalFileRoutes from "./src/routes/medicalFiles.js"
import MedicalFile from "./src/modules/medicalFiles.js";
import Prescription from "./src/modules/Prescription.js";

const app = express();
const PORT = 3000;
// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    credentials: true, // Ensure credentials are included in requests
  })
);

app.use(cookieParser());



app.use('/medical-files', medicalFileRoutes);



// Signup Route
app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, role, speciality } = req.body;
  console.log("sp",speciality)
  try {
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Auth({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      speciality: role === "doctor" ? speciality : null,
    });
    
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({_id: user._id }, "hackathon", { expiresIn: "1h" });
    res.cookie("token", token);
    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


app.get("/profile", async (req, res) => {
  try {
    const email = req.query.email;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await Auth.findOne({ email }).select("-password"); // Exclude the password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Fetch All Users
app.get("/patient/appointments", async (req, res) => {
  try {
    const users = await Auth.find().select("-password"); // Exclude passwords
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users." });
  }
});

// Update User Profile Route
app.put("/profile", async (req, res) => {
  try {
    const updates = req.body;

    const updatedProfile = await Auth.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true }
    ).select("-password"); // Exclude the password

    if (!updatedProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to fetch doctors based on recommendation
// app.post("/api/data", async (req, res) => {
//   const { recommended_doctor } = req.body;

//   console.log(">>> Received doctor recommendation for:", recommended_doctor);

//   if (!recommended_doctor) {
//     return res.status(400).json({ error: "Speciality is required" });
//   }

//   try {
//     const doctors = await Auth.find({
//       role: "doctor",
//       speciality: recommended_doctor,
//     }).select("-password"); // Exclude password

//     if (doctors.length === 0) {
//       return res.status(404).json({ error: "No matching doctors found" });
//     }

//     res.json({ doctors });
//   } catch (err) {
//     console.error("Error fetching doctors:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

app.post("/doc", async (req, res) => {
  try {
    const { recommended_doctor } = req.body;

    if (!recommended_doctor) {
      return res.status(400).json({ error: "Doctor specialization is required" });
    }

    // Case-insensitive match on 'speciality' field
    const doctors = await Auth.find({
      role: "doctor",
      speciality: { $regex: new RegExp(recommended_doctor, "i") },
    });


    const doctorList = doctors.map((doc) => ({
      _id:doc._id,
      name: `${doc.firstName} ${doc.lastName}`,
      specialization: doc.speciality,
      contact: doc.phone || doc.email, // fallback to email if phone is not present
    }));

    res.json({ doctors: doctorList });
  } catch (error) {
    console.error("Error in /api/data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/doctor/:doctorId', async (req, res) => {
  const { doctorId } = req.params;

  try {
    // Find the doctor by the doctorId
    const doctor = await Auth.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    console.log(doctor)

    // Return doctor details if found
    res.json({
      doctor: {
        name: doctor.firstName,
        specialization: doctor.speciality,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});





app.post("/book-appointment", async (req, res) => {
  const { doctorId, patientId, date, timeSlot } = req.body;

  if (!doctorId || !patientId || !date || !timeSlot) {
    return res.status(400).json({ success: false, error: "Missing required fields" });
  }

  try {
    const newAppointment = new Appointment({
      doctorId,
      patientId,
      timeSlot,
      date,
    });

    await newAppointment.save();

    res.status(201).json({ success: true, message: "Appointment booked!" });
  } catch (err) {
    console.error("Error booking appointment:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});




// Default time slots
const DEFAULT_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "01:00 PM",
  "03:00 PM"
];

//add available slots
app.post("/doctor/availability", authenticateDoctor, async (req, res) => {
  const { date, slots } = req.body;
  const doctorId = req.user._id; // Extract the doctor ID from the authenticated user

  if (!date || !slots || !Array.isArray(slots)) {
    return res.status(400).json({ error: "doctorId, date, and slots[] are required" });
  }

  try {
    const formattedDate = new Date(date);  // Store the date exactly as it is

    // Check if availability already exists for this doctor on this date
    const existing = await DoctorAvailability.findOne({ doctorId, date: formattedDate });

    if (existing) {
      // If availability exists, update the slots
      existing.slots = slots;
      await existing.save();
      return res.json({ success: true, message: "Availability updated", availability: existing });
    }

    // Otherwise, create new availability
    const newAvailability = new DoctorAvailability({
      doctorId,
      date: formattedDate,  // Store the date exactly as it is
      slots,
    });

    await newAvailability.save();
    res.json({ success: true, message: "Availability created", availability: newAvailability });
  } catch (err) {
    console.error("Error saving availability:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


//get available slots
app.get("/available-slots", async (req, res) => {
  const { doctorId, date } = req.query;
  console.log("Doctor ID:", doctorId);
  console.log("Original Date:", date);

  if (!doctorId || !date) {
    return res.status(400).json({ success: false, error: "doctorId and date are required" });
  }

  try {
    // Parse the date
    const parsedDate = new Date(date);  // Directly use the provided date without adjustments

    // Query for availability for the exact date
    const availability = await DoctorAvailability.findOne({
      doctorId,
      date: parsedDate,  // No complex time zone handling, use exact date as is
    });

    if (!availability) {
      return res.status(404).json({ success: false, message: "No availability found" });
    }

    const bookedAppointments = await Appointment.find({
      doctorId,
      date: parsedDate,  // Compare the exact date
    });

    const bookedSlots = bookedAppointments.map(app => app.timeSlot);

    const availableSlots = availability.slots.filter(slot => !bookedSlots.includes(slot));

    res.json({
      success: true,
      slots: availableSlots,
    });
  } catch (err) {
    console.error("Error fetching slots:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});





app.post("/book-slot", authenticateDoctor, async (req, res) => {
  const { doctorId, date, timeSlot } = req.body;
  const patientId = req.user._id;

  if (!doctorId || !date || !timeSlot) {
    return res.status(400).json({ success: false, message: "doctorId, date, and timeSlot are required" });
  }

  try {
    const formattedDate = new Date(date);
    formattedDate.setHours(0, 0, 0, 0); // Normalize to start of the day

    // Check if the slot is already booked
    const existing = await Appointment.findOne({
      doctorId,
      date: formattedDate,
      timeSlot
    });

    if (existing) {
      return res.status(409).json({ success: false, message: "This slot is already booked" });
    }

    // Book the appointment
    const newAppointment = new Appointment({
      doctorId,
      patientId,
      date: formattedDate,
      timeSlot,
    });

    await newAppointment.save();

    res.status(201).json({ success: true, message: "Appointment booked", appointment: newAppointment });
  } catch (err) {
    console.error("Error booking slot:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.get('/booked-slots', authenticateDoctor, async (req, res) => {
  try {
    let appointments;

    console.log(req.user);

    // Check if the user is a doctor or patient and populate fields accordingly
    if (req.user.role === 'doctor') {
      appointments = await Appointment.find({ doctorId: req.user._id })
        .populate('patientId', 'firstName lastName email')  // Populate patient details
        .populate('timeSlot');  // Populate timeSlot if necessary
    } else if (req.user.role === 'patient') {
      appointments = await Appointment.find({ patientId: req.user._id })
        .populate('doctorId', 'firstName lastName speciality email _id')  // Populate doctor details
        .populate('timeSlot');  // Populate timeSlot if necessary
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.get('/all-files', async (req, res) => {
  try {
    const files = await MedicalFile.find()
      .populate('patientId', 'firstName lastName email') // Optional: populate patient details
      .populate('sharedWith', 'firstName lastName email'); // Optional: who it's shared with

    res.status(200).json({ success: true, files });
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});



// In your Express app

// Fetch patient details by patientId
app.get('/patient/:patientId', authenticateDoctor, async (req, res) => {
  const { patientId } = req.params;

  try {
    const patient = await Auth.findById(patientId).select("-password");  // Exclude the password
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching patient details' });
  }
});

// In your Express app

// Fetch all medical files for a specific patient
app.get('/medical-files/:patientId', authenticateDoctor, async (req, res) => {
  const { patientId } = req.params;

  try {
    const files = await MedicalFile.find({ patientId });
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching medical files' });
  }
});




// Doctor adds a prescription
app.post('/prescriptions/:patientId', authenticateDoctor, async (req, res) => {
  const { patientId } = req.params;
  const doctorId = req.user._id;
  const { medicines } = req.body;

  try {
    const newPrescription = new Prescription({
      patientId,
      doctorId,
      medicines,
    });

    await newPrescription.save();
    res.status(201).json({ message: "Prescription saved", prescription: newPrescription });
  } catch (error) {
    res.status(500).json({ error: "Failed to save prescription" });
  }
});

// Get all prescriptions for a patient (Doctor or Patient can view)
app.get('/prescriptions/:patientId', async (req, res) => {
  const { patientId } = req.params;
  try {
    const prescriptions = await Prescription.find({ patientId }).populate("doctorId", "firstName lastName email");
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch prescriptions" });
  }
});``



// Serve static files

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));


// Database Connection
database()
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
  })
  .catch(() => {
    console.log("DB connection failed");
  });
