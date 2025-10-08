import React from "react";
import { useLocation, Link } from "react-router-dom";

const RecoveredUsername = () => {
    const location = useLocation();
    const {username} = location.state || {};

    return(
        <div>
            {username? (
                <div>
                    <h2>Username Recovered Successfully!</h2>
                    <p>Your username is {username}</p>
                    <Link to="/login">Back to Login</Link>
                </div>
            ): (
                <div>
                    <h2>No username data found.</h2>
                    <Link to="/recover-username">Try Again</Link>
                </div>
            )}
        </div>
    );
};
export default RecoveredUsername;