import React from "react";
import {Link} from "react-router-dom";
export default class Register extends React.Component {

    state = {
        username: "",
        fullname: '',
        idNumber: "",
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
            alert(data.message || "Could not save user, Please try again");
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
                        value={this.state.username}
                        name="username"
                        placeholder="Username"
                        onChange={this.handleChange}/>
                    </div>

                    <div>
                        <input type="text"
                        value={this.state.fullname}
                        name="fullname"
                        placeholder="Full Name"
                        onChange={this.handleChange}/>
                    </div>

                    <div>
                        <input type="text"
                        name="idNumber"
                        placeholder="ID Number"
                        value={this.state.idNumber}
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
                <form>
                    <div>
                    <p><strong>Username</strong> Username must be 3-30 characters long.</p>
                    </div>

                    <div>
                    <p><strong>Full Name</strong> Full name must contain only letters and spaces (3-50) character.</p>
                    </div>

                    <div>
                    <p><strong>ID Number</strong> ID Number must be 3-20 digits.</p>

                    </div>

                    <div>
                    <p><strong>Account Number</strong> Account number must be 6-15 digits. </p>
                    </div>

                    <div>
                    <p><strong>Email</strong> Email must include me in the format "@example.com". </p>

                    </div>

                    <div>
                    <p><strong>Password</strong> Must include a letter and number, and a minimum of 8 digits.</p>
                    </div>
                </form>
            </div>
        );

    }

}