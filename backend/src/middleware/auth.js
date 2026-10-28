import jwt from "jsonwebtoken";
// verify if a user is logged in before letting them access private data
export const authenticateToken = (req, res, next) => {
  //extract the token from the browser header
  const header = req.headers.authorization; 
  const token = header && header.startsWith("Bearer ") ? header.split(" ")[1] : null; 
  //blocks unauthenticated users
  if (!token) return res.status(401).json({ message: "Not authenticated" });
  //verifies the token & grants access
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET); // extract data{ userId, username, iat, exp } - attach the user to request object so route handlers know who's making the request
    next(); //pass control to the actual API route function
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" , error: error.message});
  }
};