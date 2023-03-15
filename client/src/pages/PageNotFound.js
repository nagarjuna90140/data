import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/layout/Layout'

export default function PageNotFound() {
  return (
    <div>
        <Layout title={" go -back page not found"}>
          <div className='pnf'>
           <h1 className='pnf-title'>404</h1>
           <h2 className='pnf-heading'>Oops ! Page Not Found</h2><br></br>
           <Link to="/" className="pnf-btn">Go back</Link>
           </div>
        </Layout>
    </div>
  )
}
