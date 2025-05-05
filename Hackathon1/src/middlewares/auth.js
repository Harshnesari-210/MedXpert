import jwt from "jsonwebtoken";
import Auth from "../modules/userAuth.js";
const authenticateDoctor = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, "hackathon"); // use process.env.JWT_SECRET ideally
    const user = await Auth.findById(decoded._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;          // optional, in case you need full user later
    req.userId = user._id;    // ✅ this is what your controller expects
    next();
  } catch (error) {
    console.error("Invalid token:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};


export default authenticateDoctor;