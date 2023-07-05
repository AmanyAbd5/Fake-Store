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
        slidesToShow: 4,
        slidesToScroll: 4
      };

    async function sendCategory(){
        let {data}= await axios.get("https://king-prawn-app-3mgea.ondigitalocean.app/category")
        // console.log({data});
        // console.log(data.category);
        // console.log(data.category[0].name);
        setCategory(data.category);
  
      }

      async function getSubCategory(id){
        let {data}= await axios.get(`https://king-prawn-app-3mgea.ondigitalocean.app/category/${id}/subcategory`)
        console.log(data.subcategory);
        setSubCategory(data.subcategory)
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
                           <div className="col-md-3">
                             <div className="category text-center">
                                 <div>{ele.name} </div>
                                 <img src={ele.image.secure_url} alt={ele.name} className={`${style.img} w-120`} onClick={()=>getSubCategory(ele.id)}/>
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
                        <p> {subcategory.name}</p>
                        <img src={subcategory.image.secure_url} alt={subcategory.name} className={`${style.imgSub} w-100`} />
                   </div>
                 </div>
                  </>
                ))}
        </div>
     </div>
      </>
    )
}
