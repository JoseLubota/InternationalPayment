import express from "express";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Register new user

router.post("/register", async(req, res) =>{
    try{
        const {fullname, idNumber, accountNumber, email, password} = req.body;
        const existing = await User.findOne({email});

        if(existing) return res.status(400).json({message: "Email already exists"});

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
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
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "Invalid credentials"});

        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword) return res.status(400).json({message: "Invalid credentials"});

        res.json({token, user});

    }catch(err){
        res.status(500).json({error: err.message})
    }
});

export default router;