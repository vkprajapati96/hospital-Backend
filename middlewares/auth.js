import { User } from "../models/userSchema.js";
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt, { decode } from 'jsonwebtoken';


export const isAdminAuthenticated = catchAsyncError(async(req,res,next)=>{
//  const token = req.cookies.adminToken;
 const token = req.headers['authorization']
 
 
 if (!token) {
    return next(new ErrorHandler("Admin Not Authenticated!",400));
 }
 const decoded =jwt.verify(token,process.env.JWT_SECRET_KEY,);
 console.log(decoded);
 
    const user =  await User.findOne({_id:decoded.id});
    console.log(user);
    
   req.user = user
 
 if (req.user.role !== "Admin") {
    return next(new ErrorHandler(`${req.user.role} not authorized for this resources!`,403));
 }
 next();
})



export const isPatientAuthenticated = catchAsyncError(async(req,res,next)=>{
   //  const token = req.cookies.patientToken;
   const token = req.headers['authorization']
 
    if (!token) {
       return next(new ErrorHandler("patient Not Authenticated!",400));
    }
    const decoded =jwt.verify(token,process.env.JWT_SECRET_KEY,);
    req.user =await User.findById(decoded.id);
    if (req.user.role !== "Patient") {
       return next(new ErrorHandler(`${req.user.role} not authorized for this resources!`,403));
    }
    next();
   })