import express from "express";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const JWT_SECRET = "8847ee188f91e31bcb45d6c4c6189c6ca948b9623a52b370d9715528ba253ce66838ce17f38af573320794b398565f6d04a80d062df3c2daa2a20d395d38df66"

// Register new user

router.post("/register", async(req, res) =>{
    try{
        const {username, fullname, idNumber, accountNumber, email, password} = req.body;
        const existing = await User.findOne({email});

        if(existing) return res.status(400).json({message: "Email already exists"});

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            username,
            fullname,
            idNumber,
            accountNumber,
            email,
            password: hashedPassword,
        });

        await newUser.save()
        res.status(201).json({message: "User created succesfully"});
    }catch (err){
        res.status(500).json({error: err.message})
    }
});

// Login

router.post("/login", async(req, res) =>{
    try{
        const {username, accountNumber, password} = req.body;

        const user = await User.findOne({username});
        if(!user) return res.status(400).json({message: "Invalid username"});

        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword){
            return res.status(400).json({message: "Invalid password"});
        } 
        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email},
            JWT_SECRET,
            {expiresIn: "1d"}
            );

        // Send token and user information
        res.json({
            user: {
                id: user._id,
                username: user.username,
                accountNumber: user.accountNumber
            },
        });

    }catch(err){
        res.status(500).json({error: err.message})
    }
});

// Get all users (test only)
router.get("/users", async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.status(500).json({error: err.message});
    }
})

export default router;