import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0.01
    },
    currency: {
        type: String,
        required: true,
        enum: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'SEK', 'NZD']
    },
    provider: {
        type: String,
        required: true,
        enum: ['SWIFT', 'SEPA', 'ACH', 'FEDWIRE']
    },
    // SWIFT specific fields
    beneficiaryAccountNumber: {
        type: String,
        required: true
    },
    beneficiaryName: {
        type: String,
        required: true
    },
    beneficiaryBankName: {
        type: String,
        required: true
    },
    swiftCode: {
        type: String,
        required: true,
        match: /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/
    },
    beneficiaryAddress: {
        type: String,
        required: true
    },
    // Transaction details
    transactionId: {
        type: String,
        unique: true,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'failed', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
paymentSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Generate unique transaction ID before saving
paymentSchema.pre('save', function(next) {
    if (!this.transactionId) {
        this.transactionId = 'TXN' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
    }
    next();
});

export default mongoose.model("Payment", paymentSchema);
