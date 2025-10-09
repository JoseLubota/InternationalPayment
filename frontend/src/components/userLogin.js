import React from "react";
import {Link} from "react-router-dom";
export default class UserLogin extends React.Component {

    state = {
        username: '',
        password: '',
        accountNumber: ''};

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({ [name]: value})
    };

    handleSubmit = async (event) =>{
        event.preventDefault()
        const{ username, password, accountNumber} = this.state;

        try{
            // Send data to Backend
            const response = await fetch("http://localhost:4000/api/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, accountNumber, password}),
            });

            const data = await response.json();

            if(!response.ok){
                alert(data.message || "Login Failed. Please check your details.");
                return
            }

            //Save token to localhost
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert("Login Successful!");
            console.log("user details: ", data.user);

            // redirect to ???
            window.location.href = "/";
        }catch(error){
            console.error("Error: ", error);
            alert("Something went wrong. Try again.");

        }
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input type="text"
                            value={this.state.username}
                            name="username"
                            placeholder="Username"
                            onChange={this.handleChange}/>
                    </div>

                    <div>
                        <input type="number"
                        name="accountNumber"
                        placeholder="Account Number"
                        value={this.state.accountNumber}
                        onChange={this.handleChange}/>
                    </div>


                    <div>
                        <input type="password"
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}/>

                    </div>
                    <div>
                        <text>
                            Forgot
                            <Link to="/recoverUsername">Username</Link>
                            or 
                            <Link to="/recoverPassword">Password</Link>
                        </text> 
                    </div>

                    <div>
                        <button type="submit">Login</button>
                    </div>    

                    <div>
                        <Link to="/register">or Register</Link>
                    </div>
                    
                </form>
            </div>
        );

    }

}