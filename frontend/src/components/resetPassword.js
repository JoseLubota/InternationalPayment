import React, {useState} from "react";
import { useLocation, Link } from "react-router-dom";

const ResetPassword = () => {
    const location = useLocation();
    const [userID, setUserID] = useState(location.state?.userID || null);

    const [formData, setFormData] = useState ({
        password: "",
        confirmPassword: "",
    });
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prev) => ({...prev, [name]: value}));
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const {password, confirmPassword} = formData;

        if (password !== confirmPassword) {
            alert("Passwors do not match");
            return;
        }

        try{
            const response = await fetch("http://localhost:4000/api/auth/reset-password",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({userID, password}),
            });

            const data = await response.json();

            if(!response.ok){
                alert(data.message || "Error resetting passwor");
                return;
            }
            alert("Password reset succes");

            setUserID(null)

            
        }catch(err){
            alert("Something went wrong, please try again.");
        }
    }
 
    return(
        <div>
            {userID? (
                <div>
                    <h2>Reset Password</h2>  
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>New password</label>
                                <input type="text"
                                value={formData.password}
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}/>
                            </div>

                            <div>
                                <label>Confirm Password</label>
                                <input type="text" 
                                name="confirmPassword"
                                placeholder="Password"  
                                value={formData.confirmPassword}
                                onChange={handleChange}/>
                            </div>

                            <div>
                                <button type="submit">Recover Password</button>
                            </div>

                        </form>
                    </div>             
                </div>
            ): (
                <div>
                    <h2>Password Reset.</h2>
                    <p>Your password has been reset successfully!</p>
                    <Link to="/login">Return to login</Link>
                </div>
            )}
        </div>
    );
};
export default ResetPassword;