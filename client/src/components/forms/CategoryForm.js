import React, { useState } from 'react'

export default function CategoryForm({handleSubmit,value,setvalue}) {
  return (
    <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" className="form-control"
            placeHolder="enter new category"
            value={value}onChange={(e)=>setvalue(e.target.value)}/>
        </div>
          <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
