import mongoose, { Types } from "mongoose";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

  const userSchema =  mongoose.Schema({
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

    nic:{
        type:String,
        required:true,
        minLength:[6,"Nic Must Contain at least 13 character!"],
        maxLength:[6,"Nic Number Must Contain Exact 13 Digits"]
    },
    dob:{
        type:Date,
        required:[true,"DoB is required"]
    },
    gender:{
        type:String,
        required:true,
        lowercase:true,
        enum:["male","female"]
    },
    password:{
        type:String,
        minLength:[8,"password must contain at least 8 character"],
        required:true,
        select:false
    },
    role:{
    type:String,
    required:true,
    enum:["Admin","Patient","Doctor"]
    },
    doctorDepartment:{
        type:String
    },
    docAvatar:{
        public_id:String,
        url:String
    },

});

userSchema.pre("save",async function(next) {
    if (!this.isModified("password")){
        next();
    }
    this.password =await bcrypt.hash(this.password,10);
});

userSchema.methods.comparePassword =async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
    };

    userSchema.methods.genrateJsonWebToken = function(){
        return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRES});
    }


export const User = mongoose.model("User",userSchema);
