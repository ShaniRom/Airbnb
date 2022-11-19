import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    username:{type:String, unique: true } ,
    password: String,
    role:String,
   
  });
  const Users = mongoose.model("users", userSchema);
  export default Users;
  