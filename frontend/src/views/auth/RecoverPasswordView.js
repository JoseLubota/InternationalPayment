import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/shared/Card';
import { FormGroup, FormInput } from '../../components/shared/Form';
import { PrimaryButton } from '../../components/shared/Button';

export default function RecoverPasswordView() {
    const [formData, setFormData] = useState({
        email: '',
        recoveryCode: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [step, setStep] = useState(1); // 1: email, 2: code, 3: reset password, 4: success

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSendCode = async (event) => {
        event.preventDefault();
        const { email } = formData;

        try {
            const response = await fetch("https://localhost:4000/api/auth/recover-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setStep(2);
            } else {
                alert(data.message || "Failed to send recovery code");
            }
        } catch (error) {
            console.error("Error: ", error);
            alert("Something went wrong. Try again.");
        }
    };

    const handleVerifyCode = async (event) => {
        event.preventDefault();
        const { email, recoveryCode } = formData;

        try {
            const response = await fetch("https://localhost:4000/api/auth/verify-recovery-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, recoveryCode }),
            });

            const data = await response.json();

            if (response.ok) {
                setStep(3);
            } else {
                alert(data.message || "Invalid recovery code");
            }
        } catch (error) {
            console.error("Error: ", error);
            alert("Something went wrong. Try again.");
        }
    };

    const handleResetPassword = async (event) => {
        event.preventDefault();
        const { email, recoveryCode, newPassword, confirmPassword } = formData;

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (newPassword.length < 8) {
            alert("Password must be at least 8 characters long");
            return;
        }

        try {
            const response = await fetch("https://localhost:4000/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, recoveryCode, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                setStep(4);
            } else {
                alert(data.message || "Failed to reset password");
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
                        <h1 className="card-title">Recover Password</h1>
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
                        <h1 className="card-title">Recover Password</h1>
                        <p className="card-subtitle">
                            A 6-digit recovery code has been sent to your email address. Please enter it below.
                        </p>
                    </div>

                    <form onSubmit={handleVerifyCode}>
                        <FormGroup>
                            <FormInput
                                type="text"
                                value={formData.recoveryCode}
                                name="recoveryCode"
                                placeholder="Recovery Code"
                                onChange={handleChange}
                                required
                                maxLength="6"
                            />
                        </FormGroup>

                        <PrimaryButton type="submit">
                            Verify Code
                        </PrimaryButton>
                    </form>
                </Card>
            </div>
        );
    }

    if (step === 3) {
        return (
            <div className="App">
                <Card>
                    <div className="card-header">
                        <div className="card-icon">
                            🔒
                        </div>
                        <h1 className="card-title">Reset Password</h1>
                    </div>

                    <form onSubmit={handleResetPassword}>
                        <FormGroup>
                            <FormInput
                                type="password"
                                value={formData.newPassword}
                                name="newPassword"
                                placeholder="New Password"
                                onChange={handleChange}
                                required
                                minLength="8"
                            />
                        </FormGroup>

                        <FormGroup>
                            <FormInput
                                type="password"
                                value={formData.confirmPassword}
                                name="confirmPassword"
                                placeholder="Confirm New Password"
                                onChange={handleChange}
                                required
                                minLength="8"
                            />
                        </FormGroup>

                        <PrimaryButton type="submit">
                            Reset Password
                        </PrimaryButton>
                    </form>
                </Card>
            </div>
        );
    }

    if (step === 4) {
        return (
            <div className="App">
                <Card>
                    <div className="card-header">
                        <div className="card-icon success-icon">
                            ✓
                        </div>
                        <h1 className="card-title">Reset Password</h1>
                        <p className="card-subtitle">
                            Your password has been reset successfully. Please login with your new password.
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


