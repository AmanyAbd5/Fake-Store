import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams , useLocation} from 'react-router-dom';
export default function ProductDetails() {

    // let { id } = useParams();

    let[product,setProduct]= useState({});
    let[imges,setImges]= useState([]);
    const location=useLocation();
    console.log(location);
    let {id}=location.state;

    async function getProduct(id){
       let {data}=await axios.get(`https://king-prawn-app-3mgea.ondigitalocean.app/product/${id}`);
      //  console.log(data.product);
      //  console.log(data.product.subImages.secure_url);
       setImges(data.product.subImages);
       setProduct(data.product);
    }

    useEffect(()=>{
        getProduct(id);
    },[])

  return (
    <>
    <div>ProductDetails</div>
    <div>{product.name}</div>

    <div className="row">
    {imges.map((imgs)=>
    <div className="col-md-3 ">
      <div className="w-100">
        <img src={imgs.secure_url}  />
        </div>
        </div>
    )}
    </div>
    </>
  )
}
