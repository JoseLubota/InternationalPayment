import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/shared/Card';
import { FormGroup, FormInput } from '../../components/shared/Form';
import { PrimaryButton } from '../../components/shared/Button';

export default function VerifyTransactionsView() {
    const [formData, setFormData] = useState({
        transactionId: ''
    });
    const [step, setStep] = useState(1); // 1: input ID, 2: show details
    const [transactionDetails, setTransactionDetails] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleVerify = async (event) => {
        event.preventDefault();
        const { transactionId } = formData;

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`https://localhost:4000/api/transactions/verify/${transactionId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });

            const data = await response.json();

            if (response.ok) {
                setTransactionDetails(data);
                setStep(2);
            } else {
                alert(data.message || "Transaction not found");
            }
        } catch (error) {
            console.error("Error: ", error);
            alert("Something went wrong. Try again.");
        }
    };

    if (step === 1) {
        return (
            <div className="App">
                <Card>
                    <div className="card-header">
                        <div className="card-icon">
                            🏦
                        </div>
                        <h1 className="card-title">Verify Transactions</h1>
                    </div>

                    <form onSubmit={handleVerify}>
                        <FormGroup>
                            <FormInput
                                type="text"
                                value={formData.transactionId}
                                name="transactionId"
                                placeholder="Transaction ID"
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>

                        <PrimaryButton type="submit">
                            Verify
                        </PrimaryButton>
                    </form>
                </Card>
            </div>
        );
    }

    if (step === 2) {
        return (
            <div className="App">
                <Card>
                    <div className="card-header">
                        <div className="card-icon">
                            🏦
                        </div>
                        <h1 className="card-title">Verify Transactions</h1>
                    </div>

                    <div className="transaction-details">
                        <div className="transaction-detail">
                            <span className="transaction-label">Transaction ID:</span>
                            <span className="transaction-value">{transactionDetails?.id || '[ID]'}</span>
                        </div>
                        <div className="transaction-detail">
                            <span className="transaction-label">Sender:</span>
                            <span className="transaction-value">{transactionDetails?.sender || '[Name]'}</span>
                        </div>
                        <div className="transaction-detail">
                            <span className="transaction-label">Recipient:</span>
                            <span className="transaction-value">{transactionDetails?.recipient || '[Name]'}</span>
                        </div>
                        <div className="transaction-detail">
                            <span className="transaction-label">Amount:</span>
                            <span className="transaction-value">{transactionDetails?.amount || '[Amount]'}</span>
                        </div>
                        <div className="transaction-detail">
                            <span className="transaction-label">Date:</span>
                            <span className="transaction-value">{transactionDetails?.date || '[Date]'}</span>
                        </div>
                    </div>

                    <PrimaryButton>
                        <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Back to Dashboard
                        </Link>
                    </PrimaryButton>
                </Card>
            </div>
        );
    }

    return null;
}


