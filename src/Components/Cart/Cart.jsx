import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Cart() {

  let [category,setCategory]= useState([]);


  async function sendCategory(){
    let {data}= await axios.get("https://fakestoreapi.com/carts")
    console.log({data});
    // console.log(data.category);
    // console.log(data.category[0].name);
    setCategory(data);

  }

  useEffect(()=>{
    sendCategory();
},[])
  return (
    <>
    <div>Cart</div>
    <div className='container'>
          <div className='row'>
              
                  {category.map((ele)=>
                    ( 
                       <> 
                           <div className="col-md-3">
                             <div className="category text-center">
                                 <div>{ele.date} </div>
                                 {/* <div>{ele.products.quantity} </div> */}

                                 {/* <img src={ele.image.secure_url} alt={ele.name} className={`${style.img} w-120`} onClick={()=>getSubCategory(ele.id)}/> */}
                            </div>
                          </div>
                       </>
                    ))}
               
           </div>
      </div>
    </>
  )
}
