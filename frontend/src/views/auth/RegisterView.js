import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/shared/Card';
import { FormGroup, FormInput } from '../../components/shared/Form';
import { PrimaryButton } from '../../components/shared/Button';

export default function RegisterView() {
    const [formData, setFormData] = useState({
        username: "",
        fullname: '',
        idNumber: "",
        accountNumber: "",
        email: "",
        password: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("https://localhost:4000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok) {
                window.location.href = "/account-registered";
            } else {
                alert(data.message || "Could not save user, Please try again");
            }
        } catch (error) {
            // Registration error occurred
            alert("Registration Failed");
        }
    };

    return (
        <div className="App">
            <Card>
                <div className="card-header">
                    <div className="card-icon">
                        🏦
                    </div>
                    <h1 className="card-title">Welcome</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <FormInput
                            type="text"
                            value={formData.username}
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormInput
                            type="text"
                            value={formData.fullname}
                            name="fullname"
                            placeholder="Full Name"
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormInput
                            type="text"
                            name="idNumber"
                            placeholder="ID Number"
                            value={formData.idNumber}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormInput
                            type="number"
                            name="accountNumber"
                            placeholder="Account Number"
                            value={formData.accountNumber}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormInput
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormInput
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength="8"
                        />
                    </FormGroup>

                    <PrimaryButton type="submit">
                        Register
                    </PrimaryButton>

                    <div className="link-text">
                        <Link to="/login">or Login</Link>
                    </div>
                </form>
            </Card>
        </div>
    );
}


