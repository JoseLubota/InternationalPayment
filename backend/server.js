import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import paymentRoutes from "./routes/payments.js";
dotenv.config()

const app = express();
app.use(express.json());
app.use(cors());

// Test endpoint
app.get("/test", (req, res) => {
    res.json({ message: "Server is running!" });
});

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);



// Connect to MongoDB
const connectionString = process.env.ATLAS_URI || "mongodb://localhost:27017/international-payment"
mongoose
    .connect(connectionString)
    .then(() => console.log("connected to MongoDB"))
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        console.log("Server will continue running without database connection");
    });

// start server

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log('Server running on port ',PORT));