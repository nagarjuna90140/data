const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
   name:{
    type:String,
    required:true,
    trim:true,
   
   },
   email:{
    type:String,
    required:true,
    trim:true,
    unique:true
   },
   password:{
    type:String,
    required:true,
    trim:true
   },
   phone:{
    type:String,
    required:true,
    trim:true
   },
   address:{
    type:String,
    required:true,
    trim:true
   },
   answer:{
      type:String,
       require:true
   },
   role:{
    type:Number,
    default:0
   },
   
},{timestamps:true})

module.exports=mongoose.model("Users",userSchema)