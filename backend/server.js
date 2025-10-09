import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
dotenv.config()

const app = express();

// Set secure HTTP Headers
app.use(helmet());

app.use(express.json());

app.use(cors({
    origin : process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
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
app.use(limiter);

// Enforce HTTPS when deployed
app.enable("trust proxy");
app.use((req, res, next) => {
    if(process.env.NODE_ENV === "production" && req.headers["x-forwarded-proto"] !== "https") {
        return res.redirect("https://" + req.headers.host + req.url);
    }
    next();
});

// Web application Firewall - protection agains SQL Injection, XSS, etc
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

// Parse JSON
app.use(express.json());


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