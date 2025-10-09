import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/shared/Card';
import { FormGroup, FormInput } from '../../components/shared/Form';
import { PrimaryButton } from '../../components/shared/Button';

export default function SendMoneyView() {
    const [formData, setFormData] = useState({
        recipientAccountNumber: '',
        amount: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { recipientAccountNumber, amount } = formData;

        try {
            const token = localStorage.getItem("token");
            const response = await fetch("https://localhost:4000/api/transactions/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ recipientAccountNumber, amount: parseFloat(amount) }),
            });

            const data = await response.json();

            if (response.ok) {
                window.location.href = "/money-sent";
            } else {
                alert(data.message || "Failed to send money");
            }
        } catch (error) {
            console.error("Error: ", error);
            alert("Something went wrong. Try again.");
        }
    };

    return (
        <div className="App">
            <Card>
                <div className="card-header">
                    <div className="card-icon">
                        🏦
                    </div>
                    <h1 className="card-title">Send Money</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <FormInput
                            type="text"
                            value={formData.recipientAccountNumber}
                            name="recipientAccountNumber"
                            placeholder="Recipient Account Number"
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>

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
                        />
                    </FormGroup>

                    <PrimaryButton type="submit">
                        Send
                    </PrimaryButton>
                </form>
            </Card>
        </div>
    );
}


