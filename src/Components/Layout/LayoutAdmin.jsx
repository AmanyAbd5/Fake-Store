import React from 'react'
import Navbar from '../../Admin/Navbar/Navbar'
import { Outlet } from 'react-router-dom'


export default function LayoutAdmin() {
  return (
    <>
    <Navbar/>
    <Outlet></Outlet>
    </>
  )
}
