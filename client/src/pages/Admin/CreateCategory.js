import React,{useEffect,useState} from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import toast from "react-hot-toast"
import axios from 'axios'
import CategoryForm from '../../components/forms/CategoryForm'
import { Modal } from 'antd'
export default function CreateCategory() {

  const [categories,setCategories]=useState([])
  const [name,setName]=useState("")
  const [visible,setVisible]=useState(false)
  const [selected,setselected]=useState(null)
  const [updatedName,setUpdatedName]=useState("")


  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      const {data}=await axios.post("/api/v1/category/create-category",{name})
      if(data.success){
        toast.success(`${name} is created`)
        getAllcategories();
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("something went wrong in input field")
    }
  }
//Get all category
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

  // update category
  const handleUpdate=async(e)=>{
    e.preventDefault()
    try {
      const {data}=await  axios.put(`/api/v1/category/update-category/${selected._id}`,{name:updatedName})
      if(data.success){
        toast.success(`${updatedName} is updated`)
        setselected(null)
        setUpdatedName("")
        setVisible(false)
        getAllcategories()
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("something went wrong")
    }
  }

  //delete category

  
  const handleDelete=async(pid)=>{
    try {
      const {data}=await  axios.delete(`/api/v1/category/delete-category/${pid}`,{name:updatedName})
      if(data.success){
        toast.success(`${name} is deleted`)
        getAllcategories()
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("something went wrong")
    }
  }
  return (
    <Layout title={"dashboard-createCategory"}>
    <div className='container-fluid m-3 p-3'>

        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9'>
                <h1>Manage category</h1>
                <div className='w-75'>
                  <div className='p-3 w-50'>
                    <CategoryForm handleSubmit={handleSubmit
                    } value={name} setvalue={setName}/>
                  </div>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                    
                        {categories?.map((c)=>(
                            <tr>
                          <>
                          <td key={c._id}>{c.name}</td>
                          <td>
                            <button className='btn btn-primary ms-2' 
                            onClick={()=>{setVisible(true);
                            setUpdatedName(c.name);setselected(c)}}>Edit</button>
                            <button className='btn btn-danger ms-2' onClick={()=>{handleDelete
                            (c._id)}}>delete</button>
                          </td>
                          </>
                          </tr>
                        ))}
                     
                    </tbody>
                  </table>
                </div>
                <Modal onCancel={()=>setVisible(false)}footer={null} visible={visible}>
                  <CategoryForm value={updatedName} setvalue={setUpdatedName} handleSubmit={handleUpdate}/>
                </Modal>
            </div>
        </div>
      </div>
    </Layout>
  )
}
