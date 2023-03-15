const productModel=require('../Models/productModel')
const fs=require("fs")
const categoryModel=require("../Models/categoryModel")
const { default: slugify } = require('slugify')
const { randomBytes } = require('crypto')
 const createProductController=async(req,res)=>{
    try {
        const {name,description,price,slug,category,quantity,shipping}=req.fields
        const  {photo}=req.files

        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:"Name is required"})
           
            case !description:
                return res.status(500).send({error:"dscription is required"})
            case !price:
                return res.status(500).send({error:"price is required"})
            case !quantity:
                return res.status(500).send({error:"quantity is required"})

            case !category:
                return res.status(500).send({error:"category is required"})
            case photo && photo.size>100000:
                return res.status(500).send({error:"photo is required and should be less than 1mb"})
            }   
        const products= new productModel({...req.fields,slug:slugify(name)})
        if(photo){
            products.photo.data=  fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success:true,
            message:"product created successfully",
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error while creating product",
            error,
        })
    }
 }

 //get product

 const getproductController=async(req,res)=>{
      try {
        const products=await productModel.find({}).populate("category").select("-photo").limit(12).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            countTotal:products.length,
            message:"All products",
            products
        })
      } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error while getting products",
            error,
        })
      }
 }
 
 //get single product

const getSingleProductController=async(req,res)=>{
 try {
    const product=await productModel.findOne({slug:req.params.slug}).select("-photo").populate("category")
    res.status(200).send({
        success:true,
        message:"single product fetched",
        product
    })
 } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"error while getting  single products",
        error,
    })
 }
}

//get photo

const productPhotoController=async(req,res)=>{
   try {
    const product=await productModel.findById(req.params.pid).select("photo")
    if(product.photo.data){
        res.set("content-type",product.photo.contentType)
        return res.status(200).send(product.photo.data)
    }
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"error while getting  photo ",
        error,
    })
   }
}

//delete product controller

const deleteProductController=async(req,res)=>{
   try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo")
    res.status(200).send({
        success:true,
        message:"product deleted successfully"
    })
   } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"error while deleting  product ",
        error,
    })
   }
}

//update product controller

const updateProductController=async(req,res)=>{
    try {
        const {name,description,price,slug,category,quantity,shipping}=req.fields
        const  {photo}=req.files

        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:"Name is required"})
           
            case !description:
                return res.status(500).send({error:"dscription is required"})
            case !price:
                return res.status(500).send({error:"price is required"})
            case !quantity:
                return res.status(500).send({error:"quantity is required"})

            case !category:
                return res.status(500).send({error:"category is required"})
            case photo && photo.size>100000:
                return res.status(500).send({error:"photo is required and should be less than 1mb"})
            }   
        const products= await productModel.findByIdAndUpdate(req.params.pid,
            {...req.fields,slug:slugify(name)},{new:true})
        if(photo){
            products.photo.data=  fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success:true,
            message:"product updated successfully",
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error while updating product",
            error,
        })
    }
}

//filter product
const productFilterController=async(req,res)=>{
try {
    const {checked,radio}=req.body
    let args={}
    if(checked.length>0) args.category=checked
    if(radio.length) args.price={$gte:radio[0],$lte:radio[1]}
    const products=await productModel.find(args)
    res.status(200).send({
        success:true,
       products
    })
} catch (error) {
    console.log(error)
    res.status(400).send({
        success:false,
        message:"error while filtering the products"
    })
}
}

//product count pagination

const productCountController=async(req,res)=>{
try {
    const total=await  productModel.find({}).estimatedDocumentCount()
    res.status(200).send({
        success:true,
        total
    })
} catch (error) {
    console.log(error)
    res.status(400).send({
        success:false,
        message:"error in product count"
    })
}
}

const productListController=async(req,res)=>{
    try {
        const perPage=6
        const page=req.params.page ? req.params.page:1 
        const products=await productModel.find({})
        .select("-photo")
        .skip((page - 1)*perPage)
        .limit(perPage)
        .sort({createdAt:-1});
        res.status(200).send({
            success:true,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:"error in per page count"
        })
    }
}

const searchProductController=async(req,res)=>{
    try {
        const {keyword}=req.params
        const results=await productModel.find({
            $or:[
                {name:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}}
            ],
        }).select("-photo");
        res.json(results);
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:"error in searching product"
        })
    }
}

const relatedProductController=async(req,res)=>{
  try {
    const {pid,cid}=req.params
    const products=await productModel.find({
        category:cid,
        _id:{$ne:pid}
    }).select("-photo")
    .limit(3)
    .populate("category");
    res.status(200).send({
        success:true,
        products
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
        success:false,
        message:"error in searching related product"
    })
  }
}

const productCategoryController=async(req,res)=>{
    try {
         const category=await categoryModel.findOne({slug:req.params.slug})
         const products=await productModel.find({category}).populate("category")
         res.status(200).send({
            success:true,
            category,
            products
         })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:"error in getting product"
        })
    }
}
module.exports={createProductController,
    getproductController,
    productPhotoController,
    getSingleProductController,
    updateProductController,
    deleteProductController,
    productFilterController,
    productCountController,
    productListController,
    searchProductController,
    relatedProductController,
    productCategoryController}