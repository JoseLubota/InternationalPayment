import React from "react";
import { Link } from "react-router-dom";

export default class RecoverUsername extends React.Component {
    state = {
        email: '',
        step: 1 // 1: email, 2: success
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSendCode = async (event) => {
        event.preventDefault();
        const { email } = this.state;

        try {
            const response = await fetch("http://localhost:4000/api/auth/recover-username", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                this.setState({ step: 2 });
            } else {
                alert(data.message || "Failed to send username");
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
                            <h1 className="card-title">Recover Username</h1>
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
                            <h1 className="card-title">Recover Username</h1>
                            <p className="card-subtitle">
                                Your username has been sent to your email address.
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