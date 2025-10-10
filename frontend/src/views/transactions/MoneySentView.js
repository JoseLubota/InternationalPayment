import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/shared/Card';
import { PrimaryButton } from '../../components/shared/Button';

export default function MoneySentView() {
    const [transactionData, setTransactionData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get transaction data from localStorage
        const lastTransaction = localStorage.getItem("lastTransaction");
        if (lastTransaction) {
            try {
                const transaction = JSON.parse(lastTransaction);
                setTransactionData(transaction);
            } catch (error) {
                console.error("Error parsing transaction data:", error);
            }
        }
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="App">
                <Card>
                    <div className="card-header">
                        <div className="card-icon">
                            ⏳
                        </div>
                        <h1 className="card-title">Loading...</h1>
                    </div>
                </Card>
            </div>
        );
    }

    if (!transactionData) {
        return (
            <div className="App">
                <Card>
                    <div className="card-header">
                        <div className="card-icon error-icon">
                            ❌
                        </div>
                        <h1 className="card-title">Transaction Not Found</h1>
                        <p className="card-subtitle">
                            No transaction data available. Please try sending money again.
                        </p>
                    </div>

                    <PrimaryButton>
                        <Link to="/send-money" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Send Money Again
                        </Link>
                    </PrimaryButton>
                </Card>
            </div>
        );
    }

    return (
        <div className="App">
            <Card>
                <div className="card-header">
                    <div className="card-icon success-icon" style={{ 
                        fontSize: '48px', 
                        color: '#28a745',
                        marginBottom: '16px'
                    }}>
                        ✅
                    </div>
                    <h1 className="card-title" style={{ color: '#28a745' }}>Money Sent Successfully!</h1>
                    <p className="card-subtitle" style={{ 
                        fontSize: '18px', 
                        marginBottom: '8px',
                        fontWeight: '500'
                    }}>
                        Your money has been successfully sent to Account Number: <strong>{transactionData.recipientAccountNumber}</strong>
                    </p>
                    <div style={{ 
                        backgroundColor: '#f8f9fa', 
                        padding: '16px', 
                        borderRadius: '8px',
                        marginTop: '16px',
                        textAlign: 'left'
                    }}>
                        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#495057' }}>Transaction Details:</h3>
                        <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                            <p style={{ margin: '4px 0' }}><strong>Amount:</strong> {transactionData.amount} {transactionData.currency}</p>
                            <p style={{ margin: '4px 0' }}><strong>Recipient Account:</strong> {transactionData.recipientAccountNumber}</p>
                            <p style={{ margin: '4px 0' }}><strong>SWIFT Code:</strong> {transactionData.swiftCode}</p>
                            <p style={{ margin: '4px 0' }}><strong>Transaction ID:</strong> {transactionData.transactionId}</p>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '24px' }}>
                    <PrimaryButton>
                        <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Back to Dashboard
                        </Link>
                    </PrimaryButton>
                </div>
            </Card>
        </div>
    );
}
