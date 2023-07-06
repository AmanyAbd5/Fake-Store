import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import style from './SortAscending.module.css';
import slugify from 'slugify';


export default function SortAscending() {
    let [products,setproducts]=useState([]);
    // const navigate = useNavigate();
  
    const generateSlug = (title) => {
      const options = {
        lower: true,
        remove: /[*+~.()'"!:@]/g,
        replacement: '-',
      };
    
      return slugify(title, options);
    };
    
  
    async function getProducts(){
      let{data}=await axios.get("https://fakestoreapi.com/products?sort=asc");
      console.log(data);
      setproducts(data);
    }
    
    useEffect(()=>{
      getProducts();
    },[])

  return (
    <>
    
    <h2 className='my-4'>Sort Ascending</h2>
 

<div className="row mx-5">
  {products.map((product) => (
    <div className="col-md-3 mb-4" key={product._id}>
      <Link to={`/products/${generateSlug(product.title)}`} state={{ id: product.id }} className="text-decoration-none text-dark">
        <div className="card h-100">

          <img src={product.image} alt={product.title} className={`${style.img} w-100  h-50`} />
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
              <p className="mb-0">{product.rating.rate}</p>
            </div>

            <div className="d-flex align-items-center">
              <p className="me-2 mb-0">Count:</p>
              <p className="mb-0">{product.rating.count}</p>
            </div>

            <p className="dec-text mt-3">{product.description}</p>
          </div>
        </div>
      </Link>
    </div>
  ))}
</div>

   </>
  )
}
