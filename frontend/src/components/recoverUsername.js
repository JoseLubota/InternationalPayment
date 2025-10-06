import React from "react";
import {Link} from "react-router-dom";
export default class RecoverUsername extends React.Component {

    state = {
        fullname: '',
        id: "",
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
                        <label>Full Name</label>
                        <input type="text"
                        value={this.state.fullname}
                        name="fullname"
                        placeholder="Jane Doe"
                        onChange={this.handleChange}/>
                    </div>

                    <div>
                        <label>ID Number</label>
                        <input type="text"
                        name="id"
                        placeholder="National ID or Passport"
                        value={this.state.id}
                        onChange={this.handleChange}/>
                    </div>

                    <div>
                        <label>Account Number</label>
                        <input type="number"
                        name="accountNumber"
                        placeholder="Your Bank Account Number"
                        value={this.state.accountNumber}
                        onChange={this.handleChange}/>
                    </div>

                    <div>
                        <button type="submit">Recover Username</button>
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