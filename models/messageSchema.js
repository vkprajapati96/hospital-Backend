import mongoose, { Types } from "mongoose";
import validator from 'validator';
  const messageSchema =  mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First Name Must Contain At Least 3 Character!"]

    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"Lirst Name Must Contain At Least 3 Character!"]
        
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail, "please provide a valid email"]        
    },
    phone:{
        type:String,
        required:true,
        minLength:[10,"Phone Number Must Contain Exact 10 Digits"],
        maxLength:[10,"Phone Number Must Contain Exact 10 Digits"]
        
    },
    message:{
        type:String,
        required:true,
        minLength:[5,"message Must Contain at least 5 character!"],
        
        
    }
  })

  export const Message = mongoose.model("Message",messageSchema);