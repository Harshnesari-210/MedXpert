import jwt from "jsonwebtoken";
import Auth from "../modules/userAuth.js";

const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("Cookies received:", req.cookies); // Debug log

  if (!token) {
    return res.status(403).json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, "hackathon");
    const user = await Auth.findById(decoded._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    req.userId = user._id;
    next();
  } catch (error) {
    console.error("Invalid token:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

const authenticateDoctor = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("Cookies received:", req.cookies); // Debug log

  if (!token) {
    return res.status(403).json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, "hackathon");
    const user = await Auth.findById(decoded._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "doctor") {
      return res.status(403).json({ message: "Access denied, doctor role required" });
    }

    req.user = user;
    req.userId = user._id;
    next();
  } catch (error) {
    console.error("Invalid token:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

export { authenticateUser, authenticateDoctor };