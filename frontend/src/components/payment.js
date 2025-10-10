import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Payment() {
    const navigate = useNavigate();
    const [currencies, setCurrencies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [paymentData, setPaymentData] = useState({
        amount: "",
        currency: "",
        beneficiaryAccountNumber: "",
        swiftCode: ""
    });

    // Load supported currencies on component mount
    useEffect(() => {
        const loadCurrencies = async () => {
            try {
                const response = await fetch("https://localhost:4000/api/payments/currencies/supported");
                if (response.ok) {
                    const data = await response.json();
                    setCurrencies(data.currencies);
                } else {
                    // Fallback currencies if API fails
                    setCurrencies([
                        { code: 'USD', name: 'US Dollar', symbol: '$' },
                        { code: 'EUR', name: 'Euro', symbol: '€' },
                        { code: 'GBP', name: 'British Pound', symbol: '£' },
                        { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
                        { code: 'ZAR', name: 'South African Rand', symbol: 'R' }
                    ]);
                }
            } catch (error) {
                console.error("Error loading currencies:", error);
                // Fallback currencies if network fails
                setCurrencies([
                    { code: 'USD', name: 'US Dollar', symbol: '$' },
                    { code: 'EUR', name: 'Euro', symbol: '€' },
                    { code: 'GBP', name: 'British Pound', symbol: '£' },
                    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
                    { code: 'ZAR', name: 'South African Rand', symbol: 'R' }
                ]);
            }
        };

        loadCurrencies();
        
        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (!token) {
            setError("Please log in first to make a payment. Click 'Login' to sign in.");
        }
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPaymentData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        // Basic validation
        if (!paymentData.amount || paymentData.amount <= 0) {
            setError("Please enter a valid amount");
            return;
        }
        if (!paymentData.currency) {
            setError("Please select a currency");
            return;
        }
        if (!paymentData.beneficiaryAccountNumber) {
            setError("Please enter beneficiary account number");
            return;
        }
        if (!paymentData.swiftCode) {
            setError("Please enter SWIFT code");
            return;
        }

        setLoading(true);

        try {
            // Get token from localStorage
            const token = localStorage.getItem('token');
            if (!token) {
                setError("Please log in first to make a payment. Go to the login page and sign in.");
                setLoading(false);
                return;
            }

            // Prepare payment data with SWIFT as default provider
            const paymentPayload = {
                ...paymentData,
                provider: "SWIFT",
                beneficiaryName: "Default Beneficiary",
                beneficiaryBankName: "Default Bank",
                beneficiaryAddress: "Default Address"
            };

            const response = await fetch("https://localhost:4000/api/payments/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(paymentPayload)
            });

            const data = await response.json();

            if (response.ok) {
                // Navigate to confirmation screen with account number
                navigate('/payment-confirmation', { 
                    state: { accountNumber: paymentData.beneficiaryAccountNumber } 
                });
            } else {
                setError(data.message || "Payment failed. Please try again.");
            }
        } catch (error) {
            console.error("Payment error:", error);
            setError("Network error. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>International Payment</h2>
            
            {error && (
                <div style={{ color: 'red' }}>
                    {error}
                    {!localStorage.getItem('token') && (
                        <div>
                            <Link to="/login">Click here to login</Link>
                        </div>
                    )}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={paymentData.amount}
                        onChange={handleChange}
                        placeholder="Enter amount"
                        required
                    />
                </div>

                <div>
                    <label>Currency</label>
                    <select
                        name="currency"
                        value={paymentData.currency}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Currency</option>
                        {currencies.map(currency => (
                            <option key={currency.code} value={currency.code}>
                                {currency.code}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Beneficiary Account Number</label>
                    <input
                        type="text"
                        name="beneficiaryAccountNumber"
                        value={paymentData.beneficiaryAccountNumber}
                        onChange={handleChange}
                        placeholder="Enter account number"
                        required
                    />
                </div>

                <div>
                    <label>SWIFT Code</label>
                    <input
                        type="text"
                        name="swiftCode"
                        value={paymentData.swiftCode}
                        onChange={handleChange}
                        placeholder="Enter SWIFT code"
                        required
                    />
                </div>

                <div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Processing...' : 'Pay Now'}
                    </button>
                </div>
            </form>

            <div>
                <Link to="/">Back to Home</Link>
            </div>
        </div>
    );
}
