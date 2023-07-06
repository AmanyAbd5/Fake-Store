import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams , useLocation} from 'react-router-dom';
import style from './ProductDetails.module.css';

export default function ProductDetails() {

    // let { id } = useParams();

    let[product,setProduct]= useState({});
    let[imges,setImges]= useState([]);
    const location=useLocation();
    // console.log(location);
    let {id}=location.state ;
    console.log(id);


    async function getProduct(id){
       let {data}=await axios.get(`https://fakestoreapi.com/products/${id}`);
       console.log(data);
      //  console.log(data.product.subImages.secure_url);
      //  setImges(data);
       setProduct(data);
    }

    useEffect(()=>{
        getProduct(id);
    },[])

  return (
    <>
    <div>ProductDetails</div>
    <div>{product.title}</div>

    
    <div className="card h-100">

          <img src={product.image} alt={product.title} className= {`${style.img} w-50`}/>
          <div className="card-body">
            <h5 className="title">{product.title}</h5>

            <div className="d-flex align-items-center">
              <p className="me-2 mb-0">Price:</p>
              <p className="mb-0">{product.price}</p>
            </div>

            <div className="d-flex align-items-center">
              <p className="me-2 mb-0">Category:</p>
              <p className="mb-0">{product.category}</p>
            </div>

            <div className="d-flex align-items-center">
              <p className="me-2 mb-0">Rate:</p>
              <p className="mb-0">{product.rate}</p>
            </div>

            <div className="d-flex align-items-center">
              <p className="me-2 mb-0">Count:</p>
              <p className="mb-0">{product.count}</p>
            </div>

            <p className="dec-text mt-3">{product.description}</p>
          </div>
        </div>
    </>
  )
}
