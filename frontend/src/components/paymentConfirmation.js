import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function PaymentConfirmation() {
    const location = useLocation();
    const { accountNumber } = location.state || {};

    return (
        <div>
            <h2>Payment Confirmation</h2>
            
            <div>
                <p>Your money has successfully been sent to the Account Number {accountNumber || "XXXXXXXX"}</p>
            </div>

            <div>
                <Link to="/payment">
                    <button>Accept</button>
                </Link>
            </div>
        </div>
    );
}
