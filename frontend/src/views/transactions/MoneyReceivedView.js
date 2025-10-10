import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/shared/Card';
import { PrimaryButton } from '../../components/shared/Button';

export default function MoneyReceivedView() {
    return (
        <div className="App">
            <Card>
                <div className="card-header">
                    <div className="card-icon">
                        🏦
                    </div>
                    <h1 className="card-title">Money received</h1>
                </div>

                <div className="transaction-details">
                    <div className="transaction-detail">
                        <span className="transaction-label">Sender:</span>
                        <span className="transaction-value">[Name]</span>
                    </div>
                    <div className="transaction-detail">
                        <span className="transaction-label">Amount:</span>
                        <span className="transaction-value">[Amount]</span>
                    </div>
                    <div className="transaction-detail">
                        <span className="transaction-label">Date:</span>
                        <span className="transaction-value">[Date]</span>
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


