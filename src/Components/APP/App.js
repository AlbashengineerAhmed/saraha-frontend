import Navbar from './../Navbar/Navbar';
import Home from './../Home/Home';
import Sender from './../Sender/Sender';
import Receiver from '../Receiver/Receiver';
import Register from './../Register/Register';
import Login from './../Login/Login';
import Notfound from './../Notfound/Notfound';
import Footer from './../Footer/Footer';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Profile from '../Profile/Profile';
import jwt_decode from 'jwt-decode';
import PrivateRoute from './../privateRoute/PrivateRoute';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  let [id,setId] = useState(null)
  let [name, setName] = useState(null);
  let [loginData , setLoginData] = useState(null);
  function setUserData(){
    let token = localStorage.getItem('token');
    let decoded = jwt_decode(token);
    // console.log(decoded);
    setLoginData(decoded);
    setId(decoded?.id);
    setName(decoded?.name);
    // console.log(loginData);
  }
  
  let navigate = useNavigate()
  function logOut(){
    localStorage.removeItem("token");
    setLoginData(null);
    navigate('/')
  }
  useEffect(()=> {
    if (localStorage.getItem('token')) {
      setUserData()
    }
  }, []);
  return (
    <>
      <Navbar loginData={loginData} logOut={logOut} />
      <div className="overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="signup" element={<Register />}></Route>
          <Route path="sender/:id/:userName" element={<Sender />} />
          <Route
            path="login"
            element={<Login setUserData={setUserData} />}
          ></Route>
          <Route element={<PrivateRoute loginData={loginData} />}>
            <Route
              path="sender"
              element={<Sender id={id} name={name} />}
            ></Route>
            <Route path="profile" element={<Profile />}></Route>
            <Route path="receiver" element={<Receiver name={name} />}></Route>
          </Route>
          {/* <Route path='home' element={<Home/>}></Route> */}
          {/* <Route path='/' element={<Footer/>}></Route> */}
          <Route path="*" element={<Notfound />}></Route>
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Footer />
    </>
  );
}

export default App;
