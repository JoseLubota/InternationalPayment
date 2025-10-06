import React from "react";
import {Link} from "react-router-dom";
export default class Register extends React.Component {

    state = {
        fullname: '',
        id: "",
        accountNumber: "",
        email: "",
        password: ""
    };

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
                        value={this.state.fullname}
                        name="fullname"
                        placeholder="Full Name"
                        onChange={this.handleChange}/>
                    </div>

                    <div>
                        <input type="text"
                        name="id"
                        placeholder="ID Number"
                        value={this.state.id}
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
                        <input type="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleChange}/>

                    </div>

                    <div>
                        <input type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}/>
                    </div>

                    <div>
                        <button type="submit">Register</button>
                    </div>

                    <div>
                        <text>
                            or
                            <Link to="/login">Login</Link>
                        </text> 
                    </div>

                </form>
            </div>
        );

    }

}