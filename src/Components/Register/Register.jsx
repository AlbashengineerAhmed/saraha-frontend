import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./register.module.css";
import axios from 'axios';
import { toast } from 'react-toastify';
// import Joi from 'joi';

export default function Register() {
  let [user , setUser] = useState({
    // firstName:'',
    // lastName:'',
    name:"",
    email:'',
    password:'',
    cPassword:'',
    phone:'',
    age:''
  })
  const navigate = useNavigate();
  function goToLogin(){
    let path = '/login';
    navigate(path)
  }
  let [loading , setLoading] = useState(false)
  let [errorMsg , setErrorMsg] = useState([]);
  async function submitFormData(e){
    e.preventDefault();
    setLoading(true);
      // alert("Submit")
      try {
        let { data } = await axios.post(
          "https://saraha-backend-nine.vercel.app/api/v1/auth/signup",
          user
        );
      if(data.message === 'Done'){
        toast.success("Registration successful!");
        goToLogin();
      }else if (data.message === "validation error") {
          setErrorMsg(data.err[0]);
          toast.error("Validation error!");
        }
        setLoading(false);
      }catch (error) {
        toast.error("An error occurred!");
        setLoading(false);
        setErrorMsg(error.response.data.err)
      }
      
    
  }
  
  
  // function validationForm(){
  //   const schema = Joi.object({
  //     name:Joi.string().required().min(3),
  //     email:Joi.string().required().email({tlds:{allow:['com' , 'net']}}),
  //     password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required()
  //   })
  //   return schema.validate(user);
  // }

  function handleChange(e){
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
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sing in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form
            onSubmit={submitFormData}
            className={`${styles.form_container}`}
          >
            <h1>Create Account</h1>
            {errorMsg
              ? errorMsg.map((error, index) => (
                  <div
                    key={index}
                    className="alert w-100 alert-danger text-center p-2"
                  >
                    {error.message}
                  </div>
                ))
              : ""}
            {/* <div className={styles.fullName}>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={handleChange}
            required
            className={styles.input}
          />
          </div> */}
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              onChange={handleChange}
              required
              className={styles.input}
            />
            <input
              type="number"
              placeholder="Enter your Age"
              name="age"
              onChange={handleChange}
              required
              className={`${styles.input}`}
            />
            <input
              type="tel"
              placeholder="Enter your Phone"
              name="phone"
              onChange={handleChange}
              required
              className={`${styles.input}`}
            />
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
            <input
              type="password"
              placeholder="Confirm Password"
              name="cPassword"
              onChange={handleChange}
              required
              className={styles.input}
            />
            <button type="submit" className={styles.green_btn}>
              {loading ? <i className="fa fa-spinner fa-spin"></i> : "Sing Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
