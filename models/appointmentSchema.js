import mongoose from "mongoose";
import validator from 'validator';

const appointmentSchema =  mongoose.Schema({
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
    appointment_date: {
        type: String,
        required: [true, "Appointment Date Is Required!"],
      },
      department: {
        type: String,
        required: [true, "Department Name Is Required!"],
      },
      doctor: {
        firstName: {
          type: String,
          required: [true, "Doctor Name Is Required!"],
        },
        lastName: {
          type: String,
          required: [true, "Doctor Name Is Required!"],
        },
      },
      hasVisited: {
        type: Boolean,
        default: false,
      },
      address: {
        type: String,
        required: [true, "Address Is Required!"],
      },
      doctorId: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Doctor Id Is Invalid!"],
      },
      patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Patient Id Is Required!"],
      },
      status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
      },
    });
    
    export const Appointment = mongoose.model("Appointment", appointmentSchema);
  

