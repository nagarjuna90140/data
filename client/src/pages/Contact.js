import React from 'react'
import Layout from '../components/layout/Layout'
import image from '../public/images/contact.jpeg'
import{BiMailSend,BiPhoneCall,BiSupport} from 'react-icons/bi'

export default function Contact() {
  return (
    <div>
        <Layout title={"Contact us"}>
           <div className='row contactus'>
              <div className='col-md-6'>
                  <img src={image} alt="contactus"
                  style={{width:"100%"}}/>
              </div>
              <div className='col-md-4'>
                <h1 className='bg-dark p-2 text-white text-center'> CONTACT US</h1>
                <p className='text-justify mt-2'>
                  any query and info about product feel free to call anytime we 24/7 available
                </p>
                <p className='mt-3'>
                   <BiMailSend/>:www.help@ecommerceapp.com
                </p>
                <p className='mt-3'>
                  <BiPhoneCall/>:9014071865
                </p>
                <p className='mt-3'>
                   <BiSupport/>:1800-09900-0000(toll free)
                </p>
              </div>
           </div>
        </Layout>
    </div>
  )
}
