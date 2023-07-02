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
    userName:Yup.string().required("name is required").min(3,"min is 3 char").max(10,"max is 10 char"),
    email:Yup.string().required("email is required").email('not valid email'),
    password:Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{3,7}$/),
    cPassword:Yup.string().required("confirm password is required").oneOf([Yup.ref('password')],'not match password'),  
  })

  let formik=useFormik({
    initialValues:{
      userName:'',
      email:'',
      password:'',
      cPassword:'',
    },validationSchema:schema,
    onSubmit:sendRegisterData,
    })

   async function sendRegisterData(values){
    console.log("jjjjjjjjjjjjjjjjj555555555jj");
      
      let response= await axios.post("https://king-prawn-app-3mgea.ondigitalocean.app/auth/signup",values)
      .catch((err)=>{
        console.log(err.response.data);
        console.log(err.response.data.validationErr);

        if(err.response.data.message=='Email exist'){
          // console.log("yes 22222");
          setstatuseErrorsemail(err.response.data.message);
        }
        else setstatuseErrorsemail('');
        if(err.response.data.validationErr){
          // console.log("no 11111111111");
          setstatuseErrors(err.response.data.validationErr);
        }
        else  setstatuseErrors([]);
      })
      console.log("ttttt");

      console.log(response.data.message);
      if(response.data.message=='Done'){
        setstatuseErrors([]);
        setstatuseErrorsemail('');
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
        
          <label htmlFor='userName'>Name</label>
          <input type='text' name='userName' className='form-control my-3 ' id='userName' 
          value={formik.values.userName} 
          onChange={formik.handleChange} ></input>

          {formik.errors.userName ? <p className='alert alert-danger'>{formik.errors.userName} </p>:''}
      

       
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' className='form-control my-3' id='email' 
          value={formik.values.email}
          onChange={formik.handleChange} ></input>
         
         {/* <p className='text-danger'>{formik.errors.email} </p> */}
         {formik.errors.email ? <p className='alert alert-danger'>{formik.errors.email} </p>:''}


          <label htmlFor='password'>Password</label>
          <input type='password' name='password' className='form-control my-3' id='password' 
          value={formik.values.password} 
          onChange={formik.handleChange}></input>
      
         {formik.errors.password ? <p className='alert alert-danger'>{formik.errors.password} </p>:''}
        
          <label htmlFor='cPassword'>Confirm Password</label>
          <input type='password' name='cPassword' className='form-control my-3' id='cPassword' 
          value={formik.values.cPassword} 
          onChange={formik.handleChange}></input>

         {formik.errors.cPassword ? <p className='alert alert-danger'>{formik.errors.cPassword} </p>:''}

      

        <button type='submit' className='btn btn-info'>Register</button>
      </form>
    </div>
  )
}
