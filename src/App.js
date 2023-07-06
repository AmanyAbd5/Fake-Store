import React, { useEffect, useState } from 'react'
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Pagenotfound from './Components/Pagenotfound/Pagenotfound';
import Layout from './Components/Layout/Layout';
import Products from './Components/Products/Products';
import jwt from 'jwt-decode';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Cart from './Components/Cart/Cart';
import ProtectedRouter from './Components/ProtectedRouter/ProtectedRouter';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import SortDescending from './Components/SortDescending/SortDescending';
import SortAscending from './Components/Sortascending/SortAscending';
import LimitResults from './Components/LimitResults/LimitResults';
import AddNewProduct from './Components/AddNewProduct/AddNewProduct';
import UpdateProduct from './Components/UpdateProduct/UpdateProduct';
import DeleteProduct from './Components/DeleteProduct/DeleteProduct';


export default function App() {
  let [user,setUser]=useState(null);

  function saveCurrentUser(){
    let token = localStorage.getItem('userToken');
    let decode =jwt(token);
    // console.log(decode);
    setUser(decode);
  }

  let router = createBrowserRouter([
    {
      path:'',
      element: <Layout user={user} setUser={setUser}/>,
      children:[
        {index:true,element:<Home />},
        {path:'products',element:<Products />},
        {path:'products/:slug',element:<ProductDetails />},

        {path:'product/products/add',element:<AddNewProduct />},
        {path:'product/products/update',element:<UpdateProduct />},
        {path:'product/products/delete',element:<DeleteProduct />},

        {path:'product/products/desc',element:<SortDescending />},
        {path:'product/products/asc',element:<SortAscending />},
        {path:'product/products/:number',element:<LimitResults />},


        {path:'cart',element:<ProtectedRouter><Cart /></ProtectedRouter>},
        {path:'register',element:<Register />},
        {path:'login',element:<Login info={saveCurrentUser}/>},

        {path:'*',element:<Pagenotfound />},
      ]

    },

  ]);

  useEffect(()=>{
    if(localStorage.getItem('userToken'))
    saveCurrentUser();
  },[])
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}
