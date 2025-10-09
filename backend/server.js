import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// SSL/TLS Configuration
const sslKeyPath = path.join(__dirname, 'ssl', 'server.key');
const sslCertPath = path.join(__dirname, 'ssl', 'server.cert');

let httpsOptions = null;
let useHTTPS = false;

// Check if SSL certificate and key exist
if (fs.existsSync(sslKeyPath) && fs.existsSync(sslCertPath)) {
    try {
        httpsOptions = {
            key: fs.readFileSync(sslKeyPath),
            cert: fs.readFileSync(sslCertPath)
        };
        useHTTPS = true;
        console.log('SSL certificate and key loaded successfully');
    } catch (error) {
        console.error('Warning: Could not load SSL certificate:', error.message);
        console.log('   Falling back to HTTP');
    }
} else {
    console.log('Warning: SSL certificate not found');
    console.log('   Falling back to HTTP');
}

// Start server
const PORT = process.env.PORT || 4000;

if (useHTTPS) {
    // Start HTTPS server
    https.createServer(httpsOptions, app).listen(PORT, () => {
        console.log('='.repeat(60));
        console.log(`HTTPS Server running on port ${PORT}`);
        console.log(`Access at: https://localhost:${PORT}`);
        console.log('='.repeat(60));
    });
} else {
    // Fallback to HTTP server
    app.listen(PORT, () => {
        console.log('='.repeat(60));
        console.log(`HTTP Server running on port ${PORT}`);
        console.log(`Access at: http://localhost:${PORT}`);
        console.log('='.repeat(60));
    });
}