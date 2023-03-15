const express=require("express")
const { createProductController ,
    updateProductController,
    deleteProductController,
    getproductController,
    getSingleProductController,
    productPhotoController,
    productFilterController,
    productCountController,
    productListController,
    searchProductController,
    relatedProductController,
    productCategoryController} = require("../controllerss/ProductController")
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware")
const formidable=require("express-formidable")
const router=express.Router()

router.post("/create-product",requireSignIn,isAdmin,formidable(),createProductController)

//get products

router.get("/get-product",getproductController)

//get single product

router.get("/get-product/:slug",getSingleProductController)

//get photo

router.get("/product-photo/:pid",productPhotoController)

//delete product

router.delete("/delete-product/:pid",deleteProductController)

//update product Put
router.put("/update-product/:pid",requireSignIn,isAdmin,formidable(),updateProductController)

//filter Product
router.post("/product-filters",productFilterController)

//pagination - product count

router.get("/product-count",productCountController)

//product per page

router.get("/product-list/:page",productListController)

//search products
router.get("/search/:keyword",searchProductController)

//similar products
router.get("/related-product/:pid/:cid",relatedProductController)

//category wise product

router.get("/product-category/:slug",productCategoryController)

module.exports=router