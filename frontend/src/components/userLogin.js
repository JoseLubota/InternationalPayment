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

    handleSubmit = (event) =>{
        event.preventDefault()
        console.log('Form submitted')
        // Add logic later
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