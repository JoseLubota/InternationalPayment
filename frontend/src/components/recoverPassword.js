import React from "react";
import {Link} from "react-router-dom";
export default class RecoverPassword extends React.Component {

    state = {
        username: '',
        accountNumber: "",
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
                        <label>Username</label>
                        <input type="text"
                        value={this.state.username}
                        name="username"
                        placeholder="JohnSmith01"
                        onChange={this.handleChange}/>
                    </div>

                    <div>
                        <label>Account Number</label>
                        <input type="number" 
                        name="accountNumber"
                        placeholder="Account Number"  
                        value={this.state.accountNumber}
                        onChange={this.handleChange}/>
                    </div>

                    <div>
                        <button type="submit">Recover Password</button>
                    </div>

                    <div>
                        <text>
                            or
                            <Link to="/login">Back to Login</Link>
                        </text> 
                    </div>
                </form>
            </div>
        );

    }

}