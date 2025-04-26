import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import database from "./src/config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Auth from "./src/modules/userAuth.js";
import Appointment from "./src/modules/appoinment.js";

// import Doctor from "./src/modules/doctorAuth.js";
import path from "path";

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





// Serve static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Database Connection
database()
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
  })
  .catch(() => {
    console.log("DB connection failed");
  });
