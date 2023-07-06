import React, { useEffect, useState } from 'react'
import axios from 'axios';
import style from './Category.module.css';
import Slider from "react-slick";

export default function Category() {

    let [category,setCategory]= useState([]);
    let [subCategory,setSubCategory]= useState([]);


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2
      };

    async function sendCategory(){
        let {data}= await axios.get("https://fakestoreapi.com/products/categories")
        console.log(data);
        // console.log(data.category);
        // console.log(data.category[0].name);
        setCategory(data);
  
      }

      async function getSubCategory(name){
        let {data}= await axios.get(`https://fakestoreapi.com/products/category/${name}`)
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
                           <div className="col-md-4">
                             <div className="category text-center">
                                 <div onClick={()=>getSubCategory(ele)}>{ele} </div>
                                 {/* <img src={ele.image.secure_url} alt={ele.name} className={`${style.img} w-120`} onClick={()=>getSubCategory(ele.id)}/> */}
                            </div>
                          </div>
                       </>
                    ))}
               </Slider>
           </div>
      </div>
      <div className="mt-5">
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
     </div>
      </>
    )
}
