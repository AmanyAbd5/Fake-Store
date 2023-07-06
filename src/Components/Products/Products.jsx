import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Products() {

  let [products,setproducts]=useState([]);

  async function getProducts(){
    let{data}=await axios.get("https://king-prawn-app-3mgea.ondigitalocean.app/product");
    console.log(data.products);
    setproducts(data.products);
  }
  
  useEffect(()=>{
    getProducts();
  },[])

  return (
    <>
    <div className="row"></div>
    <div className='my-4'>Products</div>

    <div className="row">
       {products.map((product)=>
          <div className="col-md-4" key={product._id}>
            <Link to={`/products/${product.slug}`} state={{id:product._id}}>
            <img src={product.mainImage.secure_url} alt={product.name} className='w-100' />
            <p>{product.name}</p>
            </Link>
          </div>
        )}
    </div>
   </>
  )
}
