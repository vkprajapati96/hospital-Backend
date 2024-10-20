// import { promise } from "bcrypt/promises";

export const catchAsyncError= (theFunction)=>{
    return (req,res,next)=>{
        Promise.resolve(theFunction(req,res,next)).catch(next);
    };
    // console.log(promise);
    
};