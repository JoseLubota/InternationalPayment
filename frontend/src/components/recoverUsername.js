import React from "react";
import {Link, Navigate} from "react-router-dom";
export default class RecoverUsername extends React.Component {

    state = {
        fullname: '',
        idNumber: "",
        accountNumber: "",
    };

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({ [name]: value})
    };

    handleSubmit = async (event) =>{
        event.preventDefault()

        const {fullname, idNumber, accountNumber} = this.state;

        try{
            const response = await fetch("http://localhost:4000/api/auth/recover-username", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({fullname, idNumber, accountNumber}),
            });
            
            const data = await response.json();

            if(!response.ok){
                alert(data.message || "User not found");
                return;
            }

            this.setState({recoveredUsername: data.username, redirect:true}); 

        }catch(error){
            console.error(error)
            alert("Something went wrong. Try again");
        }
    };

    render(){
        // If the submission occurs redirect user to a new page
        if(this.state.redirect){
            return(
                <Navigate
                to="/recovered-username"
                state={{username: this.state.recoveredUsername}}
                />
            )
        }
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Full Name</label>
                        <input type="text"
                        value={this.state.fullname}
                        name="fullname"
                        placeholder="eg. Jane Doe"
                        onChange={this.handleChange}/>
                    </div>

                    <div>
                        <label>ID Number</label>
                        <input type="text"
                        name="idNumber"
                        placeholder="National ID or Passport"
                        value={this.state.idNumber}
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