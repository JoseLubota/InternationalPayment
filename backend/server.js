import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// Basic middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);


// Connect to MongoDB
const connectionString = process.env.ATLAS_URI;

mongoose
    .connect(connectionString)
    .then(() => {
        console.log(" Connected to MongoDB Atlas");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('='.repeat(60));
    console.log(`Server running on port ${PORT}`);
    console.log('='.repeat(60));
});