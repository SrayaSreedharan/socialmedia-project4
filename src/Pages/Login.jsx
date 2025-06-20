import React, { useState } from 'react'
import '../Pages/Login.css'
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const[login,setLogin]=useState("")
    const[error,setError]=useState({})

    const handlechange=(e)=>{
        setLogin({...login,[e.target.name]:e.target.value})
    }
    const navigate=useNavigate();
    const validate=()=>{
        const errormsg={}
        if(!login.email){
            errormsg.email="enter email"
        }
        if(!login.password){
            errormsg.password="enter password"
        }
        setError(errormsg)
        return Object.keys(errormsg).length===0
    }

    const handlesubmit=(e)=>{
        if(!validate()){
            console.log("validation error")
             toast.error('validation failed')
          }
            e.preventDefault()
            axios.post("https://reactecomapi.onrender.com/socioauth/login",login).then((response)=>{
              console.log(response.data.username)
              console.log(response.data._id)
              toast.success('successfully')
              localStorage.setItem("userId",response.data._id)
              localStorage.setItem("username",response.data.username)
              navigate('/home'); 
            }).catch((error)=>{
              console.log(error)
              toast.error("Failed to Login.");
            })
    }
   
  return (
         <div className="login2">
      <div className="card2">
        <div className="left2">
          <h1>CONNECT</h1>
          <p>Keep connection with friends and share lots of positive things,Enjoy with sharing post and memorable comments</p>
        </div>
        <div className="right2">
          <form className='frrm'>
          <h1>Login</h1>
            <label style={{color:"red"}}>{error.email}</label>
            <input type='email' name="email" placeholder='Email' onChange={handlechange}/>{<br></br>}
            <label style={{color:"red"}}>{error.password}</label>
            <input type='text' name="password" placeholder='password'  onChange={handlechange}/>{<br></br>}
            <button type='submit'className='butn' onClick={handlesubmit}>login</button>{<br></br>}
            <h6>Do you have create account? <a href='/signup'>Signup</a></h6>
        </form>
         <ToastContainer/>
        </div>
      </div>
    </div>
  )
}
export default Login



              
