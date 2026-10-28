import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

//create the token
const signToken = (user) =>
  jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

const publicUser = (user) => ({ id: user.id, username: user.username, email: user.email });

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (username.trim().length < 3) {
      return res.status(400).json({ message: "Username must be at least 3 characters" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email address" });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanUsername = username.trim();

    const existing = await User.findOne({ $or: [{ email: cleanEmail }, { username: cleanUsername }] });
    if (existing) {
      return res.status(409).json({ message: "That email or username is already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: cleanUsername,
      email: cleanEmail,
      password: hashedPassword,
    });

    // log the user in straight away , res with create token
    res.status(201).json({ token: signToken(user), user: publicUser(user) });
  } catch (error) {
    console.error("Error in register controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    const isMatch = user && (await bcrypt.compare(password, user.password));

    // same message for "no such email" and "wrong password"
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    //res with create token
    res.status(200).json({ token: signToken(user), user: publicUser(user) });
  } catch (error) {
    console.error("Error in login controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// React calls this on page load to check the saved token is still good
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(401).json({ message: "User no longer exists" });
    res.status(200).json({ user: publicUser(user) });
  } catch (error) {
    console.error("Error in getMe controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};