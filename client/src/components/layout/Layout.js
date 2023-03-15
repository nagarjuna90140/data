import React from 'react'
import Footer from './Footer'
import Header from './Header'
import {Helmet} from 'react-helmet'
import {Toaster} from 'react-hot-toast'


export default function Layout({children,title,description,keywords,author,}) {
  return (
    <div>
      <Helmet>
        <meta charset='utf-8'/>
        <meta name="description" content={description}/>
        <meta name="keywords" content={keywords}/>
        <meta name="author" content={author}/>
        <title>{title}</title>
      </Helmet>
       <Header/>
       <main style={{minHeight:"70vh"}}>
        <Toaster/>
       {children}
       </main>
       <Footer/>
      
    </div>
  
  )
}

Layout.defaultProps={
  title:"Ecommerce app-shop now",
  description:"Mern Stack Project",
  keywords:"mern,react,node,mongodb",
  author:"Techinfoyt"

}
