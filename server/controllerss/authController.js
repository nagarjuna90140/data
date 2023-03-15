
const jwt =require("jsonwebtoken")
const {hashPassword, comparePassword}=require("../helpers/authHelper.js")

var userModel=require('../Models/userModel')
 const registerController=async (req,res)=>{
try {
   const {name,email,password,phone,address,answer}=req.body
   if(!name){
    return res.send({message:"name is required"})
   }
   if(!email){
    return res.send({message:"email is required"})
   }
   if(!password){
    return res.send({message:"password is required"})
   }
   if(!phone){
    return res.send({message:"phone is required"})
   }
   if(!address){
    return res.send({message:"address is required"})
   }
   if(!answer){
    return res.send({message:"answer is required"})
   }

  //check user
const existingUser= await userModel.findOne({email})
//check existing user
if(existingUser){
  return res.status(200).send({
    success:false,
    message:"Already registered please login"
  })
}

//register user

const hashedPassword= await hashPassword(password)

const user= await new userModel({
  name,
  email,
  phone,
  address,
  answer,
  password:hashedPassword}).save()
res.status(201).send({
  success:true,
  message:"User registraion successfully",
  user
})

} catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Error to registration",
      error
    })
}
}


const loginController=async(req,res)=>{
   try {
       const {email,password}=req.body
       if(!email || !password){
        res.status(404).send({
          success:false,
          message:"Invalid user or password"
        })
       }
       const user=await userModel.findOne({email})
       if(!user){
           return res.status(404).send({
            success:false,
            message:"email is not registered"
           })
       }
       const match=await comparePassword(password,user.password)
      if(!match){
        return res.status(200).send({
          success:false,
          message:"Invalid passoword",
      
        })
      }

       const token=await jwt.sign({_id:user._id},process.env.JWT_SECRET,{
        expiresIn:'7d',
       })
       res.status(200).send({
        success:true,
        message:"login successfull",
        user:{
          name:user.name,
          email:user.email,
          phone:user.phone,
          address:user.address,
          role:user.role

        },
        token,
       })

   } catch (error) {
      console.log(error)
       res.status(500).send({
        success:false,
        message:"error in login",
        error
       })
    }
}
 //forgot password
const forgotPasswordController=async(req,res)=>{
  try {
       const {email,answer,newPassword}=req.body
       if(!email){
        res.status(400).send({
          message:"email is required"
        })
       }
       if(!answer){
        res.status(400).send({
          message:"answer is required"
        })
       }
       if(!newPassword){
        res.status(400).send({
          message:"New Password is required"
        })
       }

       const user=await userModel.findOne({email,answer})
       if(!user){
        return res.status(404).send({
          success:false,
          message:"wrong email or answer"
        })
       }
       const hashed =await hashPassword(newPassword)
       await userModel.findByIdAndUpdate(user._id,{password:hashed});
       res.status(200).send({
        success:true,
        message:"Password  reset successfully"
       })
      } catch (error) {
    res.status(500).send({
      success:false,
      message:"something went wrong",
      error
    })
  }
}
   
const testController=(req,res)=>{
res.send("protected rout")
}

const updateProfileController=async(req,res)=>{
  try {
    const {name,email,password,address,phone}=req.body
    const user=await userModel.findById(req.user._id)
    //password
    if(!password && password.length<6){
      return res.json({error:"Password is required and 6 characters long"})
    }
    const hashedPassword=password?await hashPassword(password):undefined
    const updatedUser=await userModel.findByIdAndUpdate(req.user._id,{
      name:name|| user.name,
      password:hashedPassword||user.password,
      phone:phone||user.phone,
      address:address||user.address,
    },{new:true})
    res.status(200).send({
      success:true,
      message:"Profile updated successfully",
      updatedUser,
    })
  } catch (error) {
    res.status(400).send({
      success:false,
      message:"error while updating profile",
      error
    })
  }
}
module.exports={registerController,updateProfileController,loginController,testController,forgotPasswordController}


