import React from "react";
import { Link } from "react-router-dom";

export default class RecoverPassword extends React.Component {
    state = {
        email: '',
        recoveryCode: '',
        newPassword: '',
        confirmPassword: '',
        step: 1 // 1: email, 2: code, 3: reset password, 4: success
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSendCode = async (event) => {
        event.preventDefault();
        const { email } = this.state;

        try {
            const response = await fetch("http://localhost:4000/api/auth/recover-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                this.setState({ step: 2 });
            } else {
                alert(data.message || "Failed to send recovery code");
            }
        } catch (error) {
            console.error("Error: ", error);
            alert("Something went wrong. Try again.");
        }
    };

    handleVerifyCode = async (event) => {
        event.preventDefault();
        const { email, recoveryCode } = this.state;

        try {
            const response = await fetch("http://localhost:4000/api/auth/verify-recovery-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, recoveryCode }),
            });

            const data = await response.json();

            if (response.ok) {
                this.setState({ step: 3 });
            } else {
                alert(data.message || "Invalid recovery code");
            }
        } catch (error) {
            console.error("Error: ", error);
            alert("Something went wrong. Try again.");
        }
    };

    handleResetPassword = async (event) => {
        event.preventDefault();
        const { email, recoveryCode, newPassword, confirmPassword } = this.state;

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (newPassword.length < 8) {
            alert("Password must be at least 8 characters long");
            return;
        }

        try {
            const response = await fetch("http://localhost:4000/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, recoveryCode, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                this.setState({ step: 4 });
            } else {
                alert(data.message || "Failed to reset password");
            }
        } catch (error) {
            console.error("Error: ", error);
            alert("Something went wrong. Try again.");
        }
    };

    render() {
        const { step } = this.state;

        if (step === 1) {
            return (
                <div className="App">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-icon">
                                🔄
                            </div>
                            <h1 className="card-title">Recover Password</h1>
                        </div>

                        <form onSubmit={this.handleSendCode}>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-input"
                                    value={this.state.email}
                                    name="email"
                                    placeholder="Email"
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Send Code
                            </button>
                        </form>
                    </div>
                </div>
            );
        }

        if (step === 2) {
            return (
                <div className="App">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-icon success-icon">
                                ✓
                            </div>
                            <h1 className="card-title">Recover Password</h1>
                            <p className="card-subtitle">
                                A 6-digit recovery code has been sent to your email address. Please enter it below.
                            </p>
                        </div>

                        <form onSubmit={this.handleVerifyCode}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-input"
                                    value={this.state.recoveryCode}
                                    name="recoveryCode"
                                    placeholder="Recovery Code"
                                    onChange={this.handleChange}
                                    required
                                    maxLength="6"
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Verify Code
                            </button>
                        </form>
                    </div>
                </div>
            );
        }

        if (step === 3) {
            return (
                <div className="App">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-icon">
                                🔒
                            </div>
                            <h1 className="card-title">Reset Password</h1>
                        </div>

                        <form onSubmit={this.handleResetPassword}>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-input"
                                    value={this.state.newPassword}
                                    name="newPassword"
                                    placeholder="New Password"
                                    onChange={this.handleChange}
                                    required
                                    minLength="8"
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-input"
                                    value={this.state.confirmPassword}
                                    name="confirmPassword"
                                    placeholder="Confirm New Password"
                                    onChange={this.handleChange}
                                    required
                                    minLength="8"
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Reset Password
                            </button>
                        </form>
                    </div>
                </div>
            );
        }

        if (step === 4) {
            return (
                <div className="App">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-icon success-icon">
                                ✓
                            </div>
                            <h1 className="card-title">Reset Password</h1>
                            <p className="card-subtitle">
                                Your password has been reset successfully. Please login with your new password.
                            </p>
                        </div>

                        <button className="btn btn-primary">
                            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Back to Login
                            </Link>
                        </button>
                    </div>
                </div>
            );
        }

        return null;
    }
}