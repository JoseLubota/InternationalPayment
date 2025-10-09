import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/shared/Card';
import { PrimaryButton } from '../../components/shared/Button';

export default function MoneySentView() {
    return (
        <div className="App">
            <Card>
                <div className="card-header">
                    <div className="card-icon success-icon">
                        ✓
                    </div>
                    <h1 className="card-title">Money Sent</h1>
                    <p className="card-subtitle">
                        Your money has been sent to [Recipient Name] with transaction ID: 00000000
                    </p>
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


