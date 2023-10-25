import React from 'react'
import {Link} from "react-router-dom"
const PageNotFound = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center place-items-center p-0 m-0">
        <h2>Page Not Found</h2>
        <Link to="/">Go Home</Link>
    </div>
  )
}

export default PageNotFound