import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/shared/Card';
import { PrimaryButton } from '../../components/shared/Button';

export default function MoneyReceivedView() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReceivedPayments = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Please log in to view received payments.");
                    setLoading(false);
                    return;
                }

                const response = await fetch("https://localhost:4000/api/payments/my-payments", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    // Filter for completed payments
                    const completedPayments = data.payments.filter(p => p.status === 'completed');
                    setPayments(completedPayments);
                } else {
                    setError("Failed to load payment history.");
                }
            } catch (err) {
                setError("An error occurred while loading payments.");
            } finally {
                setLoading(false);
            }
        };

        fetchReceivedPayments();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatCurrency = (amount, currency) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency || 'USD'
        }).format(amount);
    };

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

    if (error) {
        return (
            <div className="App">
                <Card>
                    <div className="card-header">
                        <div className="card-icon">
                            ❌
                        </div>
                        <h1 className="card-title">Error</h1>
                        <p className="card-subtitle">{error}</p>
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

    if (payments.length === 0) {
        return (
            <div className="App">
                <Card>
                    <div className="card-header">
                        <div className="card-icon">
                            🏦
                        </div>
                        <h1 className="card-title">Money Received</h1>
                        <p className="card-subtitle">No completed transactions found.</p>
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

    return (
        <div className="App">
            <Card>
                <div className="card-header">
                    <div className="card-icon">
                        🏦
                    </div>
                    <h1 className="card-title">Completed Transactions</h1>
                    <p className="card-subtitle">You have {payments.length} completed transaction{payments.length !== 1 ? 's' : ''}</p>
                </div>

                <div style={{ marginTop: '24px' }}>
                    {payments.map((payment, index) => (
                        <div 
                            key={payment._id || index}
                            style={{
                                backgroundColor: '#f8f9fa',
                                padding: '16px',
                                borderRadius: '8px',
                                marginBottom: '16px',
                                border: '1px solid #dee2e6'
                            }}
                        >
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                                marginBottom: '12px'
                            }}>
                                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#28a745' }}>
                                    {formatCurrency(payment.amount, payment.currency)}
                                </div>
                                <div style={{ 
                                    fontSize: '12px', 
                                    padding: '4px 8px', 
                                    backgroundColor: '#28a745', 
                                    color: 'white',
                                    borderRadius: '4px',
                                    fontWeight: '500'
                                }}>
                                    COMPLETED
                                </div>
                            </div>

                            <div className="transaction-details" style={{ fontSize: '14px', lineHeight: '1.8' }}>
                                <div className="transaction-detail">
                                    <span className="transaction-label" style={{ fontWeight: 'bold', color: '#495057' }}>Beneficiary:</span>
                                    <span className="transaction-value" style={{ color: '#6c757d' }}>{payment.beneficiaryName}</span>
                                </div>
                                <div className="transaction-detail">
                                    <span className="transaction-label" style={{ fontWeight: 'bold', color: '#495057' }}>Account:</span>
                                    <span className="transaction-value" style={{ color: '#6c757d' }}>{payment.beneficiaryAccountNumber}</span>
                                </div>
                                <div className="transaction-detail">
                                    <span className="transaction-label" style={{ fontWeight: 'bold', color: '#495057' }}>Bank:</span>
                                    <span className="transaction-value" style={{ color: '#6c757d' }}>{payment.beneficiaryBankName}</span>
                                </div>
                                <div className="transaction-detail">
                                    <span className="transaction-label" style={{ fontWeight: 'bold', color: '#495057' }}>SWIFT Code:</span>
                                    <span className="transaction-value" style={{ color: '#6c757d' }}>{payment.swiftCode}</span>
                                </div>
                                <div className="transaction-detail">
                                    <span className="transaction-label" style={{ fontWeight: 'bold', color: '#495057' }}>Transaction ID:</span>
                                    <span className="transaction-value" style={{ color: '#6c757d', fontSize: '12px' }}>{payment.transactionId}</span>
                                </div>
                                <div className="transaction-detail">
                                    <span className="transaction-label" style={{ fontWeight: 'bold', color: '#495057' }}>Date:</span>
                                    <span className="transaction-value" style={{ color: '#6c757d' }}>{formatDate(payment.createdAt)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
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


