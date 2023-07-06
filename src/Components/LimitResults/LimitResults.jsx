import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams , useLocation} from 'react-router-dom';
import { Link ,useNavigate} from 'react-router-dom';
import style from './LimitResults.module.css';
import slugify from 'slugify';
    
export default function LimitResults() {
    
        let { number } = useParams();
    
        let[product,setProduct]= useState([]);
        let[imges,setImges]= useState([]);
  
        console.log(number);

        const generateSlug = (title) => {
            const options = {
              lower: true,
              remove: /[*+~.()'"!:@]/g,
              replacement: '-',
            };
          
            return slugify(title, options);
          };
    
    
        async function getProduct(number){
           let {data}=await axios.get(`https://fakestoreapi.com/products?limit=${number}`);
           console.log(data);
          //  console.log(data.product.subImages.secure_url);
          //  setImges(data);
           setProduct(data);
        }
    
        useEffect(()=>{
            getProduct(number);
        },[])
    
      return (
        <>
    
        <div className="row mx-5">
  {product.map((product) => (
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
    