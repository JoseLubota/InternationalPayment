import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { 
    hashPassword, 
    verifyPassword, 
    validatePasswordStrength,
    isPasswordUnique
} from "../utils/passwordSecurity.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "8847ee188f91e31bcb45d6c4c6189c6ca948b9623a52b370d9715528ba253ce66838ce17f38af573320794b398565f6d04a80d062df3c2daa2a20d395d38df66"

// Register new user with password security
router.post("/register", async(req, res) => {
    try {
        const {username, fullname, idNumber, accountNumber, email, password} = req.body;
        
        // Input validation
        if (!username || !fullname || !idNumber || !accountNumber || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                fields: ["username", "fullname", "idNumber", "accountNumber", "email", "password"]
            });
        }
        
        // Validate password strength
        const passwordValidation = validatePasswordStrength(password);
        if (!passwordValidation.isValid) {
            return res.status(400).json({
                message: "Password does not meet security requirements",
                errors: passwordValidation.errors,
                strength: passwordValidation.strength,
                requirements: [
                    "Minimum 8 characters",
                    "At least one uppercase letter",
                    "At least one lowercase letter",
                    "At least one number",
                    "At least one special character (!@#$%^&*()_+-=[]{};\':\"\\|,.<>/?)",
                    "No common passwords",
                    "No sequential or repeated characters"
                ]
            });
        }
        
        // Check if user already exists
        const existing = await User.findOne({email});
        if (existing) {
            return res.status(400).json({
                message: "Email already exists",
                field: "email"
            });
        }
        
        // Check if username already exists
        const existingUsername = await User.findOne({username});
        if (existingUsername) {
            return res.status(400).json({
                message: "Username already exists",
                field: "username"
            });
        }
        
        // Hash password with bcrypt (includes automatic salting)
        const hashedPassword = await hashPassword(password);
        
        // Create new user
        const newUser = new User({
            username,
            fullname,
            idNumber,
            accountNumber: Number(accountNumber),
            email,
            password: hashedPassword,
            passwordHistory: [hashedPassword], // Initialize password history
            lastPasswordChange: new Date()
        });
        
        await newUser.save();
        
        console.log(`New user registered: ${username} at ${new Date().toISOString()}`);
        
        res.status(201).json({
            message: "User created successfully",
            user: {
                username: newUser.username,
                email: newUser.email,
                accountNumber: newUser.accountNumber
            },
            security: {
                passwordStrength: passwordValidation.strength,
                lastPasswordChange: newUser.lastPasswordChange
            }
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({
            error: "An error occurred during registration",
            message: err.message
        });
    }
});

// Login with password verification
router.post("/login", async(req, res) => {
    try {
        const {username, accountNumber, password} = req.body;
        
        // Input validation
        if (!username || !accountNumber || !password) {
            return res.status(400).json({
                message: "All fields are required",
                fields: ["username", "accountNumber", "password"]
            });
        }
        
        // Find user
        const user = await User.findOne({username});
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }
        
        // Verify account number matches
        if (user.accountNumber !== Number(accountNumber)) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }
        
        // Verify password using bcrypt (includes timing-safe comparison)
        const isPasswordValid = await verifyPassword(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { 
                id: user._id, 
                email: user.email,
                username: user.username
            },
            JWT_SECRET,
            { expiresIn: "1d" }
        );
        
        console.log(`User logged in: ${user.username} at ${new Date().toISOString()}`);
        
        // Send response with token and user information
        res.json({
            message: "Login successful",
            token: token,
            user: {
                id: user._id,
                username: user.username,
                accountNumber: user.accountNumber,
                email: user.email,
                fullname: user.fullname
            }
        });
        
    } catch(err) {
        console.error('Login error:', err);
        res.status(500).json({
            error: "An error occurred during login"
        });
    }
});

// Change password (requires authentication)
router.post("/change-password", async (req, res) => {
    try {
        const {userId, currentPassword, newPassword} = req.body;
        
        // Input validation
        if (!userId || !currentPassword || !newPassword) {
            return res.status(400).json({
                message: "All fields are required",
                fields: ["userId", "currentPassword", "newPassword"]
            });
        }
        
        // Find user with password history
        const user = await User.findById(userId).select('+passwordHistory');
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        
        // Verify current password
        const isCurrentPasswordValid = await verifyPassword(currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            return res.status(401).json({
                message: "Current password is incorrect"
            });
        }
        
        // Validate new password strength
        const passwordValidation = validatePasswordStrength(newPassword);
        if (!passwordValidation.isValid) {
            return res.status(400).json({
                message: "New password does not meet security requirements",
                errors: passwordValidation.errors,
                strength: passwordValidation.strength
            });
        }
        
        // Check if new password is same as current
        const isSameAsCurrent = await verifyPassword(newPassword, user.password);
        if (isSameAsCurrent) {
            return res.status(400).json({
                message: "New password must be different from current password"
            });
        }
        
        // Check password history (prevent reuse of last 5 passwords)
        const isUnique = await isPasswordUnique(newPassword, user.passwordHistory);
        if (!isUnique) {
            return res.status(400).json({
                message: "Cannot reuse any of your last 5 passwords",
                security: "Please choose a password you haven't used recently"
            });
        }
        
        // Hash new password
        const hashedNewPassword = await hashPassword(newPassword);
        
        // Update password and add to history
        user.password = hashedNewPassword;
        await user.addToPasswordHistory(hashedNewPassword);
        
        // Log password change
        console.log(`Password changed for user: ${user.username} at ${new Date().toISOString()}`);
        
        res.json({
            message: "Password changed successfully",
            security: {
                lastPasswordChange: user.lastPasswordChange,
                passwordStrength: passwordValidation.strength
            }
        });
        
    } catch(err) {
        console.error('Password change error:', err);
        res.status(500).json({
            error: "An error occurred while changing password",
            message: err.message
        });
    }
});



// Get all users (test only - REMOVE IN PRODUCTION)
router.get("/users", async (req, res) => {
    try {
        // Don't send sensitive data
        const users = await User.find().select('-password -passwordHistory');
        res.json(users);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});

export default router;