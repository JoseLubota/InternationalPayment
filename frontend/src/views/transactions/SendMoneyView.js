import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/shared/Card';
import { FormGroup, FormInput } from '../../components/shared/Form';
import { PrimaryButton } from '../../components/shared/Button';

export default function SendMoneyView() {
    const [formData, setFormData] = useState({
        amount: '',
        currency: '',
        recipientAccountNumber: '',
        swiftCode: ''
    });
    const [currencies, setCurrencies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

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
                // Use fallback currencies
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
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Client-side validation
    const validateForm = () => {
        const newErrors = {};
        
        // Amount validation
        if (!formData.amount || parseFloat(formData.amount) <= 0) {
            newErrors.amount = 'Amount must be greater than 0';
        } else if (parseFloat(formData.amount) > 1000000) {
            newErrors.amount = 'Amount cannot exceed 1,000,000';
        }
        
        // Currency validation
        if (!formData.currency) {
            newErrors.currency = 'Please select a currency';
        }
        
        // Account number validation
        if (!formData.recipientAccountNumber) {
            newErrors.recipientAccountNumber = 'Recipient account number is required';
        } else if (!/^[0-9]{8,20}$/.test(formData.recipientAccountNumber)) {
            newErrors.recipientAccountNumber = 'Account number must be 8-20 digits';
        }
        
        // SWIFT code validation
        if (!formData.swiftCode) {
            newErrors.swiftCode = 'SWIFT code is required';
        } else if (!/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(formData.swiftCode.toUpperCase())) {
            newErrors.swiftCode = 'SWIFT code must be 8 or 11 characters (6 letters + 2 alphanumeric + 3 optional)';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setLoading(true);
        
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please log in first to send money.");
                window.location.href = "/login";
                return;
            }

            const response = await fetch("https://localhost:4000/api/payments/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    amount: parseFloat(formData.amount),
                    currency: formData.currency,
                    beneficiaryAccountNumber: formData.recipientAccountNumber,
                    swiftCode: formData.swiftCode.toUpperCase(),
                    beneficiaryName: "Recipient", // Default value
                    beneficiaryBankName: "Recipient Bank", // Default value
                    beneficiaryAddress: "Recipient Address" // Default value
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store transaction details for the success page
                localStorage.setItem("lastTransaction", JSON.stringify({
                    transactionId: data.transactionId,
                    amount: formData.amount,
                    currency: formData.currency,
                    recipientAccountNumber: formData.recipientAccountNumber,
                    swiftCode: formData.swiftCode
                }));
                
                window.location.href = "/money-sent";
            } else {
                alert(data.message || "Failed to send money");
            }
        } catch (error) {
            console.error("Error: ", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <Card>
                <div className="card-header">
                    <div className="card-icon">
                        💸
                    </div>
                    <h1 className="card-title">Send Money</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Amount Field - First */}
                    <FormGroup>
                        <FormInput
                            type="number"
                            value={formData.amount}
                            name="amount"
                            placeholder="Amount"
                            onChange={handleChange}
                            required
                            min="0.01"
                            step="0.01"
                            disabled={loading}
                        />
                        {errors.amount && <div className="error-message">{errors.amount}</div>}
                    </FormGroup>

                    {/* Currency Dropdown - Second */}
                    <FormGroup>
                        <select
                            value={formData.currency}
                            name="currency"
                            onChange={handleChange}
                            required
                            disabled={loading}
                            className="form-select"
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '16px',
                                backgroundColor: 'white'
                            }}
                        >
                            <option value="">Select Currency</option>
                            {currencies.map(currency => (
                                <option key={currency.code} value={currency.code}>
                                    {currency.symbol} {currency.name} ({currency.code})
                                </option>
                            ))}
                        </select>
                        {errors.currency && <div className="error-message">{errors.currency}</div>}
                    </FormGroup>

                    {/* Recipient Account Number - Third */}
                    <FormGroup>
                        <FormInput
                            type="text"
                            value={formData.recipientAccountNumber}
                            name="recipientAccountNumber"
                            placeholder="Recipient Account Number"
                            onChange={handleChange}
                            required
                            disabled={loading}
                            maxLength="20"
                        />
                        {errors.recipientAccountNumber && <div className="error-message">{errors.recipientAccountNumber}</div>}
                    </FormGroup>

                    {/* SWIFT Code - Fourth */}
                    <FormGroup>
                        <FormInput
                            type="text"
                            value={formData.swiftCode}
                            name="swiftCode"
                            placeholder="SWIFT Code (e.g., CHASUS33XXX)"
                            onChange={handleChange}
                            required
                            disabled={loading}
                            maxLength="11"
                            style={{ textTransform: 'uppercase' }}
                        />
                        {errors.swiftCode && <div className="error-message">{errors.swiftCode}</div>}
                    </FormGroup>

                    <PrimaryButton type="submit" disabled={loading}>
                        {loading ? 'Processing...' : 'Pay now'}
                    </PrimaryButton>
                </form>
            </Card>
        </div>
    );
}
