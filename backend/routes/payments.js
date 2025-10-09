import express from "express";
import jwt from "jsonwebtoken";
import Payment from "../models/Payment.js";
import User from "../models/User.js";

const router = express.Router();
const JWT_SECRET = "8847ee188f91e31bcb45d6c4c6189c6ca948b9623a52b370d9715528ba253ce66838ce17f38af573320794b398565f6d04a80d062df3c2daa2a20d395d38df66";

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
};

// Create a new payment transaction
router.post("/create", verifyToken, async (req, res) => {
    try {
        const {
            amount,
            currency,
            provider,
            beneficiaryAccountNumber,
            beneficiaryName,
            beneficiaryBankName,
            swiftCode,
            beneficiaryAddress
        } = req.body;

        // Validate required fields
        if (!amount || !currency || !beneficiaryAccountNumber || !swiftCode) {
            return res.status(400).json({ message: "Amount, currency, beneficiary account number, and SWIFT code are required" });
        }

        // Validate amount
        if (amount <= 0) {
            return res.status(400).json({ message: "Amount must be greater than 0" });
        }

        // Validate SWIFT code format
        const swiftCodeRegex = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/;
        if (!swiftCodeRegex.test(swiftCode)) {
            return res.status(400).json({ message: "Invalid SWIFT code format" });
        }

        // Create new payment transaction with SWIFT as default provider
        const newPayment = new Payment({
            userId: req.user.id,
            amount,
            currency,
            provider: "SWIFT",
            beneficiaryAccountNumber,
            beneficiaryName: beneficiaryName || "Default Beneficiary",
            beneficiaryBankName: beneficiaryBankName || "Default Bank",
            swiftCode,
            beneficiaryAddress: beneficiaryAddress || "Default Address",
            status: 'pending'
        });

        await newPayment.save();

        res.status(201).json({
            message: "Payment transaction created successfully",
            transactionId: newPayment.transactionId,
            payment: {
                id: newPayment._id,
                amount: newPayment.amount,
                currency: newPayment.currency,
                provider: newPayment.provider,
                status: newPayment.status,
                createdAt: newPayment.createdAt
            }
        });

    } catch (error) {
        console.error("Payment creation error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get all payments for a user
router.get("/my-payments", verifyToken, async (req, res) => {
    try {
        const payments = await Payment.find({ userId: req.user.id })
            .sort({ createdAt: -1 })
            .select('-__v');

        res.json({
            payments,
            count: payments.length
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific payment by transaction ID
router.get("/:transactionId", verifyToken, async (req, res) => {
    try {
        const { transactionId } = req.params;
        
        const payment = await Payment.findOne({ 
            transactionId,
            userId: req.user.id 
        });

        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        res.json({ payment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update payment status (for admin use or payment processing)
router.patch("/:transactionId/status", verifyToken, async (req, res) => {
    try {
        const { transactionId } = req.params;
        const { status } = req.body;

        const validStatuses = ['pending', 'processing', 'completed', 'failed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const payment = await Payment.findOneAndUpdate(
            { transactionId, userId: req.user.id },
            { status, updatedAt: Date.now() },
            { new: true }
        );

        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        res.json({
            message: "Payment status updated successfully",
            payment: {
                transactionId: payment.transactionId,
                status: payment.status,
                updatedAt: payment.updatedAt
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get supported currencies
router.get("/currencies/supported", (req, res) => {
    const supportedCurrencies = [
        { code: 'USD', name: 'US Dollar', symbol: '$' },
        { code: 'EUR', name: 'Euro', symbol: '€' },
        { code: 'GBP', name: 'British Pound', symbol: '£' },
        { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
        { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
        { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
        { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
        { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
        { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
        { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' }
    ];

    res.json({ currencies: supportedCurrencies });
});

// Get supported payment providers (SWIFT only)
router.get("/providers/supported", (req, res) => {
    const supportedProviders = [
        { 
            code: 'SWIFT', 
            name: 'SWIFT Network', 
            description: 'Society for Worldwide Interbank Financial Telecommunication',
            fees: 'Variable based on amount and destination'
        }
    ];

    res.json({ providers: supportedProviders });
});

export default router;
