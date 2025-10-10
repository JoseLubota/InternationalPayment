import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import https from "https";
import helmet from "helmet";
import fs from "fs";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import paymentRoutes from "./routes/payments.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Set secure HTTP Headers
app.use(helmet.contentSecurityPolicy({
    directives : {
        default: ["'self'"],
        scriptSrc: ["'slfe'", "'unsafe-inline'", "'https://cdn.example.com'"],
        styleSrc: ["'self'", "data:"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        },
    })
);

// CORS configuration to allow frontend access
app.use(cors({
    origin: ['http://localhost:3000', 'https://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Limit repeated requests to public API
const limiter = rateLimit({
    // 15 minutes
    windowMs: 15 * 60 * 1000, 
    // Limit each IP to 100 reuests per windoMs
    limit: 100,
    message: {message: "Too many requests, please try again later."},
    standardHeaders: true,
    legacyHeaders: false,
});

// Enforce HTTPS when deployed
app.enable("trust proxy");
app.use((req, res, next) => {
    if(process.env.NODE_ENV === "production" && req.headers["x-forwarded-proto"] !== "https") {
        return res.redirect("https://" + req.headers.host + req.url);
    }
    next();
});

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test endpoint
app.get("/test", (req, res) => {
    res.json({ message: "Server is running!" });
});

// Web application Firewall - protection against SQL Injection, XSS, etc
app.use((req, res, next) => {
    const payload = JSON.stringify(req.body);
    const backlist = [
        /<script.*?>.*?<\/script>/gi,
        /(\%27)(\')|(\-\-)|(\%23)|(#)/i,
        /<.*?on\w+=/gi
    ];
    for(const pattern of backlist){
        if(pattern.test(payload)){
            return res.status(403).json({message: "Malicious payload detected."})
        }
    }
    next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);


// Connect to MongoDB
const connectionString = process.env.ATLAS_URI || "mongodb://localhost:27017/international-payment";

mongoose
    .connect(connectionString)
    .then(() => {
        console.log(" Connected to MongoDB Atlas");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        console.log("Server will continue running without database connection");
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