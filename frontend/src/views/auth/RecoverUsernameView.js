import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/shared/Card';
import { FormGroup, FormInput } from '../../components/shared/Form';
import { PrimaryButton } from '../../components/shared/Button';

export default function RecoverUsernameView() {
    const [formData, setFormData] = useState({
        email: ''
    });
    const [step, setStep] = useState(1); // 1: email, 2: success

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSendCode = async (event) => {
        event.preventDefault();
        const { email } = formData;

        try {
            const response = await fetch("http://localhost:4000/api/auth/recover-username", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setStep(2);
            } else {
                alert(data.message || "Failed to send username");
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
                            🔄
                        </div>
                        <h1 className="card-title">Recover Username</h1>
                    </div>

                    <form onSubmit={handleSendCode}>
                        <FormGroup>
                            <FormInput
                                type="email"
                                value={formData.email}
                                name="email"
                                placeholder="Email"
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>

                        <PrimaryButton type="submit">
                            Send Code
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
                        <div className="card-icon success-icon">
                            ✓
                        </div>
                        <h1 className="card-title">Recover Username</h1>
                        <p className="card-subtitle">
                            Your username has been sent to your email address.
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

    return null;
}


