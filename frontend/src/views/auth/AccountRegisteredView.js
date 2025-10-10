import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/shared/Card';
import { PrimaryButton } from '../../components/shared/Button';

export default function AccountRegisteredView() {
    return (
        <div className="App">
            <Card>
                <div className="card-header">
                    <div className="card-icon success-icon">
                        ✓
                    </div>
                    <h1 className="card-title">Account Registered</h1>
                    <p className="card-subtitle">
                        Your account has been opened and details sent to your email address.
                    </p>
                </div>

                <PrimaryButton>
                    <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Back to Login
                    </Link>
                </PrimaryButton>
            </Card>
        </div>
    );
}


