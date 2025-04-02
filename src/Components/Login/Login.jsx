import React from 'react'
import { useState } from 'react';
import styles from './login.module.css'
import { useNavigate, Link } from 'react-router-dom';
// import { Joi } from 'joi';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Login({setUserData}) {
  let [user , setUser] = useState({
    email:'',
    password:'',
  })
  const navigate = useNavigate();
  function goToHome(){
    let path = '/';
    navigate(path)
  }
  let [loading , setLoading] = useState(false)
  let [errorMsg , setErrorMsg] = useState([]);
  // let[errorEmail,setErrorEmail] = useState('')
  async function submitFormData(e){
    e.preventDefault();
    setLoading(true);
      // alert("Submit")
      try {
        let { data } = await axios.post(
          "https://saraha-backend-pi.vercel.app/api/v1/auth/signin",
          user
        );
        if(data.message === 'Done'){
          localStorage.setItem('token' , data.token)
          setUserData()
          toast.success("Login successful!");
          goToHome();
        }else if(data.message === "validation error") {
          setErrorMsg(data.err[0]);
          toast.error(data.message || "Login failed!");
          setLoading(false);
        }else{
          const err = []
          // console.log(err.push({message:data.message}));
          setErrorMsg(err);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        toast.error("An error occurred!");
      }
        
    
    
  }
  
  
  // function validationForm(){
  //   const schema = Joi.object({
  //     email:Joi.string().required().email({tlds:{allow:['com' , 'net']}}),
  //     password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required()
  //   })
  //   return schema.validate(user);
  // }

  function handleChange(e){
    // console.log(e.target.value);
    let myUser = {...user};

    myUser[e.target.name] = e.target.value;
    setUser(myUser);
    // myUser.first_name = e.target.value;
    // console.log(myUser);
    // myUser.last_name = e.target.value;
    // myUser.email = e.target.value;
    // myUser.password = e.target.value;
  }

  return (
    <div className={styles.signup_container}>
    <div className={styles.signup_form_container}>
      <div className={styles.left}>
        <h2 className='text-dark'>Welcome to Saraha</h2>
        <Link to="/signup">
          <button type="button" className={styles.white_btn}>
            Sing up
          </button>
        </Link>
      </div>
      <div className={styles.right}>
        <form onSubmit={submitFormData} className={styles.form_container}>
          <h1 className='my-5'>Login to Your Account</h1>
          {errorMsg?errorMsg.map((error, index)=><div key={index} className='alert w-100 text-center alert-danger p-2'>{error.message}</div>):''}
          {/* {errorEmail?<div className='alert w-100 alert-danger text-center p-2'>{errorEmail}</div>:''} */}
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.green_btn}>
            {loading ? <i className='fa fa-spinner fa-spin'></i>: "login"}
          </button>
        </form>
      </div>
    </div>
  </div>
  )

}
