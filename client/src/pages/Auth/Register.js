import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios';
import './register.css'

export default function Register() {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [phone,setPhone]=useState("")
    const [address,setAddress]=useState("")
    const [password,setPassword]=useState("")
    const [answer,setAnswer]=useState("")

    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const res=await axios.post('/api/v1/auth/register',
        {name,email,password,phone,address,answer})
        if(res && res.data.success){
           toast.success(res.data && res.data.message)
           navigate('/login')
        }else{
            toast.error(res.data.message)
        }
        }
        
 
        catch (error) {
            console.log(error)
            toast.error("something went wrong")
        }
    }
   
    return (
       
            <Layout title={"Register Ecommerce-app"}>
            <div className='form-container'>
                <div className='register'>
                    <h1>Registration Form</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="text"
                             placeholder='Enter Name' 
                             value={name} 
                             onChange={(e)=>setName(e.target.value)}
                             className="form-control" required
                               />
                        </div>
                        <div className="mb-3">
                            <input type="email" 
                             placeholder='Enter Email'
                              value={email}
                              onChange={(e)=>setEmail(e.target.value)}
                               className="form-control"  required 
                               />
                        </div>
                        <div className="mb-3">
                            <input type="Number"
                             placeholder='Enter phone number'
                             value={phone} 
                             onChange={(e)=>setPhone(e.target.value)}
                             className="form-control"  required
                              />
                        </div>
                        <div className="mb-3">
                            <input type="text"
                              placeholder='Enter address'
                               value={address}
                                onChange={(e)=>setAddress(e.target.value)}
                                className="form-control"
                                required />
                        </div>
                        <div className="mb-3">
                            <input type="password" 
                            placeholder='Enter Password'
                             value={password} 
                             onChange={(e)=>setPassword(e.target.value)}
                             className="form-control"   required />
                        </div>
                        <div className="mb-3">
                            <input type="text" 
                            placeholder='what is your favourite sports'
                             value={answer} 
                             onChange={(e)=>setAnswer(e.target.value)}
                             className="form-control"
                                required />
                        </div>
                      
                      
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
                </div>
            </Layout>
        
    )
}
