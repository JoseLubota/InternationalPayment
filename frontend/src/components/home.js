import React from "react";
import {Link} from "react-router-dom";
export default function Home() {

    return(
        <div>
            <h1>International Payment System</h1>
            
            <div>
                <Link to="/register">Register</Link>
            </div>
            
            <div>
                <Link to="/login">Login</Link>
            </div>

            <div>
                <Link to="/payment">Make Payment</Link>
            </div>
        </div>
    );

}