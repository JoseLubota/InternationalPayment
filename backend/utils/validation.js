export const validadeUserInput = (data) => {
    const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;
    const fullnamePattern = /^[a-zA-Z\s]{3,50}$/;
    const idNumberPattern =  /^[a-zA-Z0-9_]{3,20}$/;
    const accountNumberPattern = /^[0-9]{6,15}$/; 
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/ 

    if(data.username && !usernamePattern.test(data.username))
        throw new Error("Username longer than 20, please write a shorter one");

    if(data.fullname && !fullnamePattern.test(data.fullname))
        throw new Error("Invalid fullname formtat");

    if(data.idNumber && !idNumberPattern.test(data.idNumber))
        throw new Error("Invalid ID number format");

    if(data.accountNumber && !accountNumberPattern.test(data.accountNumber))
        throw new Error("Invalid account number format");

    if(data.email && !emailPattern.test(data.email))
        throw new Error("Invalid email format");

    if(data.password && !passwordPattern.test(data.password))
        throw new Error("Weak password. It must have 8 charecters, one number and not be shorter than 8");

};