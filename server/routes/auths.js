var express=require("express")
var {registerController,
    loginController,
    forgotPasswordController,
    testController,
    updateProfileController}=require("../controllerss/authController")
var router=express.Router()
var {requireSignIn,isAdmin}=require("../middlewares/authMiddleware")

router.post("/register",registerController)

//LOGIN  || POST request

router.post("/login",loginController)

router.get("/test",requireSignIn,isAdmin,testController)

//forgot password

router.post("/forgot-password",forgotPasswordController)
//protected route
router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})
//protected  Admin route
router.get("/admin-auth",requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})

//update profile
router.put("/profile",requireSignIn,updateProfileController)
module.exports=router