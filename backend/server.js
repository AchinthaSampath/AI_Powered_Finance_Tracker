import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import transactionRoutes from "./src/routes/transactionRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);   
app.use("/api", transactionRoutes);
   


// Health check
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
