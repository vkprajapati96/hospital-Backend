import mongoose from "mongoose";
export const dbconnection =()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"HOSPITAL_MANAGEMENT",
    }).then(()=>{
        console.log("connected to db");
        
    }).catch(err=>{
        console.log(`some error occured while connecting to database: ${err}`);
        
    })
}