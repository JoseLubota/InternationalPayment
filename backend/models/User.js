import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname : {type: String, required : true},
    idNumber : {type: String, required : true},
    accountNumber : {type: Number, required : true},
    email : {type: String, required : true, unique: true},
    fullname : {type: String, required : true},
});

export default mongoose.model("User", userSchema);