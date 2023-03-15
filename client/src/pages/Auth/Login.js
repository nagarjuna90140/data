import React,{useState} from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios';
import { useAuth } from '../../context/auth';


export default function Login() {

    const [email,setEmail]=useState("")

    const [password,setPassword]=useState("")
    const [auth,setAuth]=useAuth();

    const navigate=useNavigate();
    const location=useLocation();

    const handleSubmit=async(e)=>{
        e.preventDefault()
      
        try {
            const res=await axios.post(`/api/v1/auth/login`,
        {email,password})
        if(res && res.data.success){
           toast.success(res.data && res.data.message)
           navigate(location.state || '/')
           setAuth({
            ...auth,
            user:res.data.user,
            token:res.data.token
           })
           localStorage.setItem('auth',JSON.stringify(res.data))
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
                    <h1>Login Form</h1>
                    <form onSubmit={handleSubmit}>
                       
                        <div className="mb-3">
                            <input type="email" 
                             placeholder='Enter Email'
                              value={email}
                              onChange={(e)=>setEmail(e.target.value)}
                               className="form-control"  required 
                               />
                        </div>
                       
                       
                        <div className="mb-3">
                            <input type="password" 
                            placeholder='Enter Password'
                             value={password} 
                             onChange={(e)=>setPassword(e.target.value)}
                             className="form-control"   required />
                        </div>
                     
                       <div className='mb-3'>
                       <button type="button" onClick={()=>{navigate("/forgot-password")}} className="btn btn-primary">Forgot Password</button>

                       </div>
                        <button type="submit" className="btn btn-primary">Login</button>

                    </form>
                </div>
                </div>
            </Layout>
    
    )
}
