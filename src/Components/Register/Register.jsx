import axios from 'axios';
import { useFormik } from 'formik'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function Register() {

  // let [errors,setError]= useState([]);
  let [statuseErrors,setstatuseErrors]= useState([]);
  let [statuseErrorsemail,setstatuseErrorsemail]= useState('');
  let navigate =useNavigate();
  
  const schema =Yup.object({
    username:Yup.string().required("name is required").min(3,"min is 3 char").max(10,"max is 10 char"),
    email:Yup.string().required("email is required").email('not valid email'),
    password:Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{3,7}$/, "Password must be 3 to 7 characters long and alphanumeric"),
    // cPassword:Yup.string().required("confirm password is required").oneOf([Yup.ref('password')],'not match password'), 
  //   name:{firstname:Yup.string().required("firstname is required"),
  //   lastname:Yup.string().required("lastname is required"),
  // },
  // address:{
  //   city:Yup.string().required("city is required"),
  //   number:Yup.string().required("number is required"),
  //   zipcode:Yup.string().required("zipcode is required"),
  //   lat:Yup.string().required("lat is required"),
  //   long:Yup.string().required("long is required"),
  // },
    phone:Yup.string().required("phone is required"),
  });

  let formik=useFormik({
    initialValues:{
     
      email:'',
      username:'',
      password:'',
      name:{
          firstname:'',
          lastname:''
      },
      address:{
          city:'',
          street:'',
          number:'',
          zipcode:'',
          geolocation:{
              lat:'',
              long:''
          }
      },
      phone:''

    },validationSchema:schema,
    onSubmit:sendRegisterData,
    })

   async function sendRegisterData(values){
    console.log("jjjjjjjjjjjjjjjjj555555555jj");
      
      let response= await axios.post("https://fakestoreapi.com/users",values)
      // .catch((err)=>{
      //   console.log(err.response.data);
      //   console.log(err.response.data.validationErr);

      //   if(err.response.data.message=='Email exist'){
      //     // console.log("yes 22222");
      //     setstatuseErrorsemail(err.response.data.message);
      //   }
      //   else setstatuseErrorsemail('');
      //   if(err.response.data.validationErr){
      //     // console.log("no 11111111111");
      //     setstatuseErrors(err.response.data.validationErr);
      //   }
      //   else  setstatuseErrors([]);
      // })
      // console.log("ttttt");

      console.log(response.data);
      if(response.data){
        // setstatuseErrors([]);
        // setstatuseErrorsemail('');
        navigate('/login');
        console.log("welcome");
      }
      else{
        console.log("noooooooo");
        console.log(response);
        // setError(data.err);
      }

    }
  return (
    <div className='w-75 m-auto mt-5'>

      <h2>Register Now</h2>

     {/* <h2 className="text-danger">{statuseErrors}</h2> */}

     {statuseErrors.map((err,index)=>{ 
        return <div className='text-danger'>{err.message}</div>
      })}

     <div className="text-danger">{statuseErrorsemail}</div>


      {/* {errors.map((err)=>{ 
        return <div className='text-danger'>{err.message}</div>
      })} */}
      
      <form onSubmit={formik.handleSubmit}>
        
          
      
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' className='form-control my-3' id='email' 
          value={formik.values.email}
          onChange={formik.handleChange} ></input>
         
         {/* <p className='text-danger'>{formik.errors.email} </p> */}
         {formik.errors.email ? <p className='alert alert-danger'>{formik.errors.email} </p>:''}


         <label htmlFor='username'>User Name</label>
          <input type='text' name='username' className='form-control my-3 ' id='username' 
          value={formik.values.username} 
          onChange={formik.handleChange} ></input>

          {formik.errors.username ? <p className='alert alert-danger'>{formik.errors.username} </p>:''}


          <label htmlFor='password'>Password</label>
          <input type='password' name='password' className='form-control my-3' id='password' 
          value={formik.values.password} 
          onChange={formik.handleChange}></input>
      
         {formik.errors.password ? <p className='alert alert-danger'>{formik.errors.password} </p>:''}

         
          <div>Name</div>
           <div className='container'>
               <div className='row'>
                 <div className='col-md-4'>
                     <div className="row">
                          <div className='col'>
                              <label htmlFor='firstname'>First Name</label>
                              <input type='text' name='name.firstname' className='form-control my-3 ' id='firstname' 
                              value={formik.values.name.firstname} 
                              onChange={formik.handleChange} ></input>

                              {/* {formik.errors.name?.firstname ? <p className='alert alert-danger'>{formik.errors.name.firstname} </p>:''} */}
                           </div>
                         <div className='col'>
                               <label htmlFor='lastname'>Last Name</label>
                               <input type='text' name='name.lastname' className='form-control my-3 ' id='lastname' 
                               value={formik.values.name.lastname} 
                               onChange={formik.handleChange} ></input>

                              {/* {formik.errors.name?.lastname ? <p className='alert alert-danger'>{formik.errors.name.lastname} </p>:''} */}
                           </div>
                      </div>
                 </div>
              </div>
          </div>

        
          <div>Address</div>
          <div className='container'>
               <div className='row'>
                 {/* <div className='col-md-5'> */}
                     <div className="row">
                          <div className='col  w-100'>
                          <label htmlFor='city'>City</label>
          <input type='text' name='address.city' className='form-control my-3 ' id='city' 
          value={formik.values.address.city} 
          onChange={formik.handleChange} ></input>

          {/* {formik.errors.address ? <p className='alert alert-danger'>{formik.errors.address} </p>:''} */}
       
                          </div>
                          <div className='col'>
                          <label htmlFor='street'>street</label>
          <input type='text' name='address.street' className='form-control my-3 ' id='street' 
          value={formik.values.address.street} 
          onChange={formik.handleChange} ></input>

          {/* {formik.errors.address ? <p className='alert alert-danger'>{formik.errors.address} </p>:''} */}
       
                          </div>
                          <div className='col'>
                          <label htmlFor='number'>number</label>
          <input type='number' name='address.number' className='form-control my-3 ' id='number' 
          value={formik.values.address.number} 
          onChange={formik.handleChange} ></input>

          {/* {formik.errors.address ? <p className='alert alert-danger'>{formik.errors.address} </p>:''} */}
       
                          </div>
                          <div className='col'>
                          <label htmlFor='zipcode'>zipcode</label>
          <input type='text' name='address.zipcode' className='form-control my-3 ' id='zipcode' 
          value={formik.values.address.zipcode} 
          onChange={formik.handleChange} ></input>

          {/* {formik.errors.address ? <p className='alert alert-danger'>{formik.errors.address} </p>:''} */}
       
                          </div>
                          <div className='col'>
                            <div>geolocation</div>
                            <div className="row">
                              <div className="col">
                              <label htmlFor='lat'>lat</label>
          <input type='text' name='address.geolocation.lat' className='form-control my-3 ' id='lat' 
          value={formik.values.address.geolocation.lat} 
          onChange={formik.handleChange} ></input>

          {/* {formik.errors.address ? <p className='alert alert-danger'>{formik.errors.address} </p>:''} */}
                              </div>
                              <div className="col">
                              <label htmlFor='long'>long</label>
          <input type='text' name='address.geolocation.long' className='form-control my-3 ' id='long' 
          value={formik.values.address.geolocation.long} 
          onChange={formik.handleChange} ></input>

          {/* {formik.errors.address ? <p className='alert alert-danger'>{formik.errors.address} </p>:''} */}
                              </div>
                            </div>
       
                          </div>
                 </div>
                 </div>
                </div>
           {/* </div> */}


        


        



       



         



       

          


        


          <label htmlFor='phone'>Phone</label>
          <input type='text' name='phone' className='form-control my-3 ' id='phone' 
          value={formik.values.phone} 
          onChange={formik.handleChange} ></input>

          {formik.errors.phone ? <p className='alert alert-danger'>{formik.errors.phone} </p>:''}

      

        <button type='submit' className='btn btn-info'>Register</button>
      </form>
    </div>
  )
}
