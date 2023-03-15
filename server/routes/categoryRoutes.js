const express=require("express")
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware")
const {createCategoryController,deleteCategoryController,updateCategoryController,categoryController,singleCategoryController} =require("../controllerss/categoryController")
const router=express.Router()

//create category
router.post("/create-category",requireSignIn,isAdmin,createCategoryController)

//update category

router.put("/update-category/:id",requireSignIn,isAdmin,updateCategoryController)

//Get all category

router.get("/get-category",categoryController)

//get single category

router.get("/single-category/:slug",singleCategoryController)

//delete category

router.delete("/delete-category/:id",requireSignIn,isAdmin,deleteCategoryController)
module.exports=router