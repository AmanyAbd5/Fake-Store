import React, { useEffect, useState } from 'react'
import axios from 'axios';
import style from './UpdateProduct.module.css';
import Slider from "react-slick";
import { useFormik } from 'formik'

export default function UpdateProduct() {

    let [category,setCategory]= useState([]);
    let [subCategory,setSubCategory]= useState([]);


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4
      };
    //   const [category, setCategory] = useState([]);
    
      let formik=useFormik({
          initialValues:{
              title:'',
              price:'',
              description:'',
              image:'',
              category:'',
          },
          onSubmit:getSubCategory,
          })

    async function sendCategory(){
        let {data}= await axios.get("https://fakestoreapi.com/products")
        console.log(data);
        console.log(data[1].title);

        // console.log(data.category);
        // console.log(data.category[0].name);
        setCategory(data);
  
      }

      async function getSubCategory(name,values){
        let {data}= await axios.put(`https://fakestoreapi.com/products/${name}`,values)
        console.log(data);
        setSubCategory(data)
      }
  
    useEffect(()=>{
        sendCategory();
    },[])
  
    return (
      <>
      {/* <div>Home</div> */}
      <div className='container'>
          <div className='row'>
               <Slider {...settings}>
                  {category.map((ele)=>
                    ( 
                       <> 
                           <div className="col-md-4" key= {ele.id}>
                             <div className="category text-center">
                                 <div >{ele.title} </div>
                                  {/* onClick={()=>getSubCategory(ele)}
                                  >{ele.tiltle} </div> */}
                                 <img src={ele.image} alt={ele.name} className={`${style.img} w-120`} />
                            </div>
                          </div>
                       </>
                    ))}
               </Slider>
           </div>
      </div>
      
      {/* <div className="mt-5">
        <div className="row">
               {subCategory.map((subcategory=>
                  <> 
                  <div className="col-md-3">
                    <div className="sub-category">
        <div className="card h-100">

                        <img src={subcategory.image} alt={subcategory.name} className={`${style.imgSub} w-100`} />
                        <p> {subcategory.title}</p>
                        <p> {subcategory.price}</p>
                        <p> {subcategory.category}</p>
                        <p> {subcategory.description}</p>
                        </div>
                   </div>
                 </div>
                  </>
                ))}
        </div>
     </div> */}


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
