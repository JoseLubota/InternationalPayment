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

    handleChange =  (event) => {
        const {name, value} = event.target;
        this.setState({ [name]: value})
    };

    handleSubmit = async (event) =>{
        event.preventDefault()
        try{
            const response = await fetch("http://localhost:4000/api/auth/register",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(this.state),
            });
            const data = await response.json();
            console.log(data);
            alert(data.message || "User Registered");
        }catch(error){
            console.error(error);
            alert("Registration Failed")
        }
    };

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