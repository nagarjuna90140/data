import React from 'react'
import Layout from '../components/layout/Layout'
import image from '../public/images/about.jpeg'

export default function About() {
  return (
    <div>
      
      <Layout title={'About us- Ecommerce app'}>
           <div className='row contactus'>
              <div className='col-md-6'>
                  <img src={image} alt="contactus"
                  style={{width:"100%"}}/>
              </div>
              <div className='col-md-4'>
                <h1 className='bg-dark p-2 text-white text-center'> About Us</h1>
                <p className='text-justify mt-2'>
                Introduction to Web Commerce Impetus for Web Commerce Electronic
                 Commerce Defined Applying E-Commerce Concepts to Focus Companies
                  Types of Electronic Commerce Microcommerce and Macrocommerce 
                  Benefits of Electronic Commerce Drawbacks of Electronic Commerce
                   E-Commerce Solutions Web Storefront Hardware and Softw
                  </p>
              
              </div>
           </div>
        </Layout>
    </div>
  )
}
