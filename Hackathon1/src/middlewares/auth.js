import jwt from "jsonwebtoken";
import Auth from "../modules/userAuth.js";
const authenticateDoctor = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, "hackathon"); // Assuming "hackathon" is your JWT secret
    const user = await Auth.findById(decoded._id)
    req.user = user;
    console.log(req.user)
    next();
  } catch (error) {
    console.error("Invalid token:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authenticateDoctor;