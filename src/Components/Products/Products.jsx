import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import style from './Products.module.css';
import slugify from 'slugify';


export default function Products() {

  let [products,setproducts]=useState([]);
  const navigate = useNavigate();

  const [number, setNumber] = useState('');

  const generateSlug = (title) => {
    const options = {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
      replacement: '-',
    };
  
    return slugify(title, options);
  };
  

  async function getProducts(){
    let{data}=await axios.get("https://fakestoreapi.com/products");
    console.log(data);
    setproducts(data);
  }
  
  useEffect(()=>{
    getProducts();
  },[])
  
  const handleAddNewProduct = () => {
    navigate('/product/products/add');
  };

  const handleUpdateProduct = () => {
    navigate('/product/products/update');
  };

  const handleDeleteProduct = () => {
    navigate('/product/products/delete');
  };


  const handleSortDescending = () => {
    navigate('/product/products/desc');
  };
  const handleSortAscending = () => {
    navigate('/product/products/asc');
  };


  const handleInputChange = (event) => {
    setNumber(event.target.value);
  };

  const handleSubmit = () => {
    handleNumber(number);
  };

  const handleNumber = (num) => {
   
    navigate(`/product/products/${num}`);
  };

  return (
    <>
     <div className="row w-100">
      <div className="d-flex align-items-center justify-content-between">
        <h2 className="my-4">Products</h2>
        <div className="d-flex">

       
         
        <button className="text-decoration-none text-dark btn" onClick={handleAddNewProduct}>
            <h6 className="my-1 ">Add new product</h6>
          </button>

          <button className="text-decoration-none text-dark btn" onClick={handleUpdateProduct}>
            <h6 className="my-1 ">Update a product</h6>
          </button>

          <button className="text-decoration-none text-dark btn" onClick={handleDeleteProduct}>
            <h6 className="my-1 ">Delete a product</h6>
          </button>


        <button className="text-decoration-none text-dark btn" onClick={handleSortAscending}>
          <h6 className="my-1 me-1">Sort ascending</h6>
          </button>

          <button className="text-decoration-none text-dark btn" onClick={handleSortDescending}>
            <h6 className="my-1 ">Sort descending</h6>
          </button>


          <div className=" d-flex text-decoration-none text-dark btn">
          <label htmlFor='Number'>Number of products:</label>
          <input type='text' name='Number' className=' my-1 ' id='Number'value={number}
          onChange={handleInputChange} ></input>
          </div>
        <button type='submit' className='btn btn-info' onClick={handleSubmit} >search</button>

        </div>
      </div>
    </div>
   
 

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
