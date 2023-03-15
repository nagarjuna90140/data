import React,{useState,useEffect} from 'react'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'
import Layout from '../components/layout/Layout'

export default function Categories() {
    const categories=useCategory()
  return (
   <Layout title={"All Categories"}>
       <div className='container'>
        <div className='row'>
            {categories?.map((c)=>(
             <div className='col-md-6 mt-5 mb-3 gx-3 gy-3'>
                    <Link to={`/category/${c.slug}`} className='btn btn-primary'>{c.name}</Link>
            </div>
            ))}
        
        </div>
       </div>
   </Layout>
  )
}

