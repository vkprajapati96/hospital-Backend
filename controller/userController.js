// import { use } from 'bcrypt/promises.js';
import {catchAsyncError} from '../middlewares/catchAsyncError.js'
import ErrorHandler from '../middlewares/errorMiddleware.js'
// import { Message } from '../models/messageSchema.js';
import { User } from '../models/userSchema.js';
import { generateToken } from '../utils/jwtToken.js'
import cloudinary from 'cloudinary';

// sign up ya register patient
export const patientRegister =catchAsyncError(async (req,res,next)=>{
    const {firstName,lastName,email,phone,password, gender,dob, nic, }=req.body;

    
    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic ) {
       return next(new ErrorHandler("Please fill full form",400)); 
    }
    let user =await User.findOne({email});
    if (user) {
        return next(new ErrorHandler("User Already Registered",400));     
    }
    //register user /sign-up 
    user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password, 
        gender, 
        dob, 
        nic, 
        role:"Patient"
    });
    generateToken(user,"User Registered",200,res);
});

//// login user
export const login =catchAsyncError(async(req,res,next)=>{
const {email,password,confirmPassword,role} =req.body;
if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("please provide all details!",400))
}
if (password !== confirmPassword) {
    return next(new ErrorHandler("password and confirmpassword not same",400))
}
const user = await User.findOne({email}).select("+password");
if (!user) {
    return next(new ErrorHandler("invalid Email or Password!",400))
}
const isPasswordMatched = await user.comparePassword(password);
if (!isPasswordMatched) {
    return next(new ErrorHandler("invalid Email or Password!",400))   
}
if (role !==user.role) {
    return next(new ErrorHandler("User with this role not found!",400))   
}

generateToken(user,"User Login successfully",200,res);


});

////   add new admin
export const addNewAdmin =catchAsyncError(async(req,res,next)=>{
const {firstName,lastName,email,phone,password, gender,dob, nic}=req.body;
if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic){
    return next(new ErrorHandler("Please fill full form",400));  
}
const isRegistered = await User.findOne({email});
if(isRegistered){
    return next(new ErrorHandler(`${isRegistered.role} With This Email Already Exists!`))
}
const admin =await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob, 
    nic,
    role:"Admin"
})
res.status(200).json({success:true,message:"New Admin Registered!"})
});

 // get all doctors (find all the doctors )
export const getAllDoctors = catchAsyncError(async(req,res,next)=>{
    const doctors  =await User.find({role:"Doctor"});
    res.status(200).json({success:true,doctors});
});
 // get all patient (find all the patient)
export const getUserDetails = catchAsyncError(async(req,res,next)=>{
    const user =req.user;
    res.status(200).json({success:true,user});  
});

//logout Admin
export const logoutAdmin = catchAsyncError(async(req,res,next)=>{
    res.status(200)
    .cookie("adminToken","",{
    httpOnly:true,
    expires:new Date(Date.now()),
}).json({success:true,message:"Admin Logged Out Successfully!"});
})

//logout patient
export const logoutPatient = catchAsyncError(async(req,res,next)=>{
    res.status(200)
    .cookie("patientToken","",{
    httpOnly:true,
    expires:new Date(Date.now()),
}).json({success:true,message:"Patient Logged Out Successfully!"});
})


// add new doctor

export const addNewDoctor = catchAsyncError(async (req, res, next) => {
  console.log(req.body);
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return next(new ErrorHandler("Doctor Avatar Required!", 400));
    }
    const { docAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(docAvatar.mimetype)) {
      return next(new ErrorHandler("File Format Not Supported!", 400));
    }
    const {
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password,
      doctorDepartment,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !nic ||
      !dob ||
      !gender ||
      !password ||
      !doctorDepartment ||
      !docAvatar
    ) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return next(
        new ErrorHandler("Doctor With This Email Already Exists!", 400)
      );
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
      docAvatar.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary Error:",
        cloudinaryResponse.error || "Unknown Cloudinary error"
      );
      return next(
        new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
      );
    }
    const doctor = await User.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password,
      role: "Doctor",
      doctorDepartment,
      docAvatar: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });
    res.status(200).json({
      success: true,
      message: "New Doctor Registered",
      doctor,
    });
  });
  
