import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const header = req.headers.authorization; 
  const token = header && header.startsWith("Bearer ") ? header.split(" ")[1] : null; // reads the header

  if (!token) return res.status(401).json({ message: "Not authenticated" }); //checks the token

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET); // { userId, username, iat, exp } and attaches the user to the request.
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" , error: error.message});
  }
};