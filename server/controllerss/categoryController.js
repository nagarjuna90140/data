const categoryModel=require("../Models/categoryModel.js")
const slugify=require("slugify")
const createCategoryController=async(req,res)=>{
    try {
        const {name}=req.body
        if(!name){
            return res.status(401).send({message:"Name is required"})
        }
        const existingCategory=await categoryModel.findOne({name})
        if(existingCategory){
            return res.status(200).send({
                success:true,
                message:"category already exists"
            })
        }
        const category=await new categoryModel({
            name,
            slug:slugify(name)})
            .save()
            res.status(201).send({
            success:true,
            message:"new category created",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error from category",
            error,
        })
    }

}
//update category
const updateCategoryController=async(req,res)=>{
try {
    const {name}=req.body
    const {id}=req.params
    const category=await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
    res.status(200).send({
        success:true,
        messaage:"category updated successfully",
        category
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"error whole updating category",
        error,
    })
}
}

//get all categories

const categoryController=async (req,res)=>{
   try {
    const category=await categoryModel.find({})
    res.status(200).send({
        success:true,
        message:"all categories list",
        category
    })
   } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"unable to display the categories",
        error,
    })
   }
}


const singleCategoryController=async(req,res)=>{
    try {
        const category=await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:"get single category",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error while displaying single category",
            error,
        })
    }
}

const deleteCategoryController=async(req,res)=>{
  try {
    const {id}=req.params
    await categoryModel.findByIdAndDelete(id)
    res.status(200).send({
        success:true,
        message:"successfully deleted"
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"error while deleting the category",
        error,
    })
  }
}
module.exports={createCategoryController,singleCategoryController,updateCategoryController,categoryController,deleteCategoryController}