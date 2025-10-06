import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
dotenv.config()

const app = express();
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/auth", authRoutes);



// Connect to MongoDB
const connectionSting = process.env.ATLAS_URI
mongoose
    .connect(connectionSting)
    .then(() => console.log("connected to MongoDB Altas"))
    .catch((err) => console.error(err));

// start server

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log('Server running on port ',PORT));