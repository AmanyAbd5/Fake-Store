import axios from 'axios';
import { useFormik } from 'formik'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function Login(props) {

  // let [errors,setError]= useState([]);
  let [statuseErrors,setstatuseErrors]= useState([]);
  let [statuseErrorsemail,setstatuseErrorsemail]= useState('');
  let navigate =useNavigate();
  
  const schema =Yup.object({
    email:Yup.string().required("email is required").email('not valid email'),
    password:Yup.string().required("password is required"),
  })

  let formik=useFormik({
    initialValues:{
      email:'',
      password:'',
    },validationSchema:schema,
    onSubmit:sendLoginData,
    })

  
   async function sendLoginData(values){
    console.log("jjjjjjjjjjjjjjjjj555555555jj");
      
      let response= await axios.post("https://king-prawn-app-3mgea.ondigitalocean.app/auth/login",values)
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

      console.log(response.data);
      if(response.data.message=='Done'){
        setstatuseErrors([]);
        setstatuseErrorsemail('');
        localStorage.setItem("userToken",response.data.access_token);
        props.info();
        navigate('/cart');
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

      <h2>Login Now</h2>

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


          <label htmlFor='password'>Password</label>
          <input type='password' name='password' className='form-control my-3' id='password' 
          value={formik.values.password} 
          onChange={formik.handleChange}></input>
      
         {formik.errors.password ? <p className='alert alert-danger'>{formik.errors.password} </p>:''}
        


        <button type='submit' className='btn btn-info'>Register</button>
      </form>
    </div>
  )
}