import React,{useState,useEffect} from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import toast from "react-hot-toast"
import axios from 'axios'
import { Select } from 'antd'
import { useNavigate } from 'react-router-dom'

const {Option}=Select
export default function CreateProduct() {
  const navigate=useNavigate()
  const [categories,setCategories]=useState([])
  const [name,setName]=useState("")
  const [category,setCategory]=useState("")
  const [description,setDescription]=useState("")
  const [price,setPrice]=useState("")
  const [quantity,setQuantity]=useState("")
  const [shipping,setShipping]=useState("")
  const [photo,setPhoto]=useState("")
 
  const getAllcategories=async()=>{
    try {
      const {data}=await axios.get("/api/v1/category/get-category")
      if(data?.success){
        setCategories(data?.category)
      }
    } catch (error) {
      console.log(error)
      toast.error("something went wrong in getting category")
    }
  }
  useEffect(()=>{
    getAllcategories();
  },[])

  //create product

  const  handleCreate=async(e)=>{
    e.preventDefault()
    try {

    
      const productData=await new FormData()
        productData.append("name",name)
        productData.append("description",description)
        productData.append("price",price)
        productData.append("quantity",quantity)
        productData.append("photo",photo)
        productData.append("category",category)
        
      
      const {data}= await axios.post("/api/v1/product/create-product",productData)
      if(data.success){
           toast.success("Product created successfully")
           navigate("/dashboard/admin/products")
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }
  return (
    <Layout title={"dashboard-createProduct"}>
    <div className='container-fluid m-3 p-3'>

        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9'>
                <h1>Create Product</h1>
                <div className='m-1 w-75'>
                  <Select bordered={false}
                   placeholder="select a category"
                   size="large"
                   showSearch
                   className='form-select mb-3' onChange={(value)=>{setCategory(value)}}>
                    {categories?.map((c)=>(
                      <Option key={c._id} value={c._id}>{c.name}</Option>
                    ))}
                   </Select>
                   <div className='mb-3 '>
                    <label className="btn btn-outline-secondary col-md-12">
                      {photo ? photo.name:"Upload photo"}
                      <input
                       type="file"
                        name="photo"
                         accept="image/*" 
                         onChange={(e)=>setPhoto(e.target.files[0])}hidden/>
                    </label>
                   </div>
                   <div className='mb-3'>
                    {photo && (
                      <div className='text-center'>
                        <img src={URL.createObjectURL(photo)} alt="product_photo" height={"200px"} className="img img-responsive"/>
                        </div>
                    )}
                   </div>
                   <div className='mb-3'>
                    <input type="text"
                     value={name} 
                     className="form-control"
                     placeholder="write a name"
                     onChange={(e)=>setName(e.target.value)}/>
                   </div>
                   <div className='mb-3'>
                    <input type="text-area"
                     value={description} 
                     className="form-control"
                     placeholder="description"
                     onChange={(e)=>setDescription(e.target.value)}/>
                   </div>
                   <div className='mb-3'>
                    <input type="Number"
                     value={price} 
                     className="form-control"
                     placeholder="enter price"
                     onChange={(e)=>setPrice(e.target.value)}/>
                   </div>
                   <div className='mb-3'>
                    <input type="Number"
                     value={quantity} 
                     className="form-control"
                     placeholder="enter quantity"
                     onChange={(e)=>setQuantity(e.target.value)}/>
                   </div>
                  <div className='mb-3'>
                   <Select
                   bordered={false}
                   size="large"
                   showSearch
                   className='form-select mb-3'
                   onChange={(value)=>{
                    setShipping(value);
                   }}>
                    <Option value="0">No</Option>
                    <Option value="1">yes</Option>
                   </Select>
                   </div>
                </div>
                <div className='mb-3'>
                  <button className='btn btn-primary' onClick={handleCreate}>CREATE PRODUCT</button>
                </div>
            </div>
           
        </div>
    </div>
    </Layout>
  )
}


