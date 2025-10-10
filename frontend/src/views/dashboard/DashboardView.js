import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/shared/Card';
import { PrimaryButton, SecondaryButton } from '../../components/shared/Button';

export default function DashboardView() {
    return (
        <div className="App">
            <Card>
                <div className="card-header">
                    <div className="card-icon">
                        🏦
                    </div>
                    <h1 className="card-title">Dashboard</h1>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <PrimaryButton>
                        <Link to="/send-money" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Send Money
                        </Link>
                    </PrimaryButton>

                    <SecondaryButton>
                        <Link to="/verify-transactions" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Verify Transactions
                        </Link>
                    </SecondaryButton>

                    <SecondaryButton>
                        <Link to="/money-received" style={{ textDecoration: 'none', color: 'inherit' }}>
                            View Received Money
                        </Link>
                    </SecondaryButton>

                    <SecondaryButton>
                        <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Logout
                        </Link>
                    </SecondaryButton>
                </div>
            </Card>
        </div>
    );
}


