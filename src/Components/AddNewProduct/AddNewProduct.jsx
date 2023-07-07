import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik'

export default function AddNewProduct() {

    let [products,setproducts]=useState([]);


    // const [title, setTitle] = useState('');
    // const [price, setPrice] = useState(0);
    // const [description, setDescription] = useState('');
    // const [image, setImage] = useState('');
    const [category, setCategory] = useState([]);
    
    let formik=useFormik({
        initialValues:{
            title:'',
            price:'',
            description:'',
            image:'',
            category:'',
        },
        onSubmit:addProducts,
        })


    async function addProducts(values){
      let{data}=await axios.post("https://fakestoreapi.com/products",values);
      console.log(data);
      setproducts(data);
      alert("done");
      
    }
      
    async function sendCategory(){
        let {data}= await axios.get("https://fakestoreapi.com/products/categories")
        console.log(data);
        // console.log(data.category);
        // console.log(data.category[0].name);
        setCategory(data);
  
      }

      useEffect(()=>{
        sendCategory();
    },[])

  return (
   
    <>
     
        <h2>Add New Product</h2>
        <form onSubmit={formik.handleSubmit}>

          <div className=' row my-3 '>
            <label htmlFor="title">Title:</label>
            <input className='w-50'
              type="text"
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
          </div>
          <div className=' row my-3'>
            <label htmlFor="price">Price:</label>
            <input className='w-50'
              type="number"
              id="price"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
          </div>
          <div className='row my-3'>
            <label htmlFor="description">Description:</label>
            <textarea className='w-50'
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            ></textarea>
          </div>
          <div className='row my-3'>
            <label htmlFor="image">Image:</label>
            <input className='w-50'
              type="text"
              id="image"
              name="image"
              value={formik.values.image}
              onChange={formik.handleChange}
            />
          </div>
          <div className=' row my-3'>
            <label htmlFor="category">Category:</label>
            <select className='w-50'
              id="category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
            >
              <option value="">Select a category</option>
              {category.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <button type="submit" className='btn btn-info'>Submit</button>
        </form>

    </>
  )
}


