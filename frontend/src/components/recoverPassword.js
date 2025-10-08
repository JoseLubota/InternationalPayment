import React from "react";
import {Link, Navigate} from "react-router-dom";
export default class RecoverPassword extends React.Component {

    state = {
        username: '',
        accountNumber: "",
    };
    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({ [name]: value})
    };

    handleSubmit = async (event) =>{
        event.preventDefault()

        const {username, accountNumber} = this.state;

        try{
            const response = await fetch("http://localhost:4000/api/auth/recover-password", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, accountNumber}),
            });
            
            const data = await response.json();

            if(!response.ok){
                alert(data.message || "User not found");
                return;
            }

            this.setState({user_id: data.user.userID, redirect:true}); 

        }catch(error){
            console.error(error)
            alert("Something went wrong. Try again");
        }
    }

    render(){
                // If the submission occurs redirect user to a new page
                if(this.state.redirect){
                    return(
                        <Navigate
                        to="/reset-password"
                        state={{userID: this.state.user_id}}
                        />
                    )
                }
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