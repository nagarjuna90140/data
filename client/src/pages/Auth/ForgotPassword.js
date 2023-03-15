
import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios';
import './register.css'
export default function ForgotPassword() {

    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [answer, setAnswer] = useState("")
  

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post(`/api/v1/auth/forgot-password`,
                { email, newPassword,answer })
            if (res && res.data.success) {
                toast.success(res.data && res.data.message)
                navigate('/login')
             
            } else {
                toast.error(res.data.message)
            }
        }


        catch (error) {
            console.log(error)
            toast.error("something went wrong")
        }
    }
    return (
        <div>

            <Layout title={"forgot-Password Ecoomerce-app"}>
                <div className='form-container'>
                    <h1>Reset Password</h1>
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <input type="email"
                                placeholder='Enter Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control" required
                            />
                        </div>
                        <div className="mb-3">
                            <input type="text"
                                placeholder='Enter your Answer'
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                className="form-control" required
                            />
                        </div>


                        <div className="mb-3">
                            <input type="password"
                                placeholder='Enter Password'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="form-control" required />
                        </div>

                    
                        <button type="submit" className="btn btn-primary ms-1">Reset</button>

                    </form>
                </div>
            </Layout>
        </div>
    )
}
