const express=require("express")
const mongoose=require("mongoose")
const authRoutes=require("./routes/auths")
const dotenv=require("dotenv")
const colors=require("colors")
const productRoutes=require("./routes/ProductRoutes")
const categoryRoutes=require("./routes/categoryRoutes")
const app=express()
const cors=require("cors")
 
dotenv.config()
app.use(cors())
app.use(express.json())
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/category",categoryRoutes)
app.use("/api/v1/product",productRoutes)


mongoose.set('strictQuery', true);

mongoose.connect("mongodb://127.0.0.1:27017/",
  {
    dbName: "Ecommerce",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) =>
    err ? console.log(err) : console.log(
      "Connected to database")
);


app.listen(8080,(req,res)=>{
    console.log("server running at 8080")
})