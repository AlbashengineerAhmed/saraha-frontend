import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoute({loginData}) {
  return (
    <>
        {loginData? <Outlet/>:<Navigate to ='login'/>}
    </>
  )
}
