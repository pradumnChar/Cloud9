import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { Link,useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";


export default function Register() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    username: "",
    password: "",
    email: "",
  });
  const toastAppear = {
    position: "bottom-right",
    theme: "dark",
    pauseOnHover: true,
    autoClose: 5000,
    draggable: true,
  };
  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate('/');
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handlesubmit = async (event) => {
    event.preventDefault();
    if ( handlevalid() ) {
      //Apicall
      const { username , password , email } = value;
      const {data} = await axios.post(registerRoute,{
        username,
        password,
        email,
      });
    if(data.status === false) {
      toast.error(data.msg, toastAppear);
    }
     if(data.status === true)
     {
      localStorage.setItem('chat-app-user',JSON.stringify(data.user));
     
     navigate("/setAvatar");
     }
   
    } 
    };
  
  //TO prevent submitting adding middleware in between

  const handlevalid = () => {
    const {password ,username , email } = value;

    if(username.length<3){
      toast.error("USername must be > 3 characters",toastAppear);
      return false;
    }else if(password.length < 8){
      toast.error("Password must be > 8 characters",
      toastAppear);
      return false;
    }else if(email === ""){
      toast.error("Please enter valid ",
      toastAppear);
    }

    return true;
  };



  const handlechange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <div className="ok">
          <form onSubmit={(e) => handlesubmit(e)}>
            <div className="myform">
              <img className="ok1" src={logo} alt="error" />
              <h1>CLOUD 9</h1>
            </div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => handlechange(e)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => handlechange(e)}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => handlechange(e)}
            />

            <button type="submit">Create User!</button>
            <span>
              ALREADY HAVE AN ACCOUNT??<Link to="/login">Login</Link>
            </span>
          </form>
        </div>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color:#ECF0F1;
  .ok {
    padding: 35px;
    border-radius: 30px;
    ${'' /* background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.75),
      rgba(255, 255, 255, 0.32)
    ); */}
    ${'' /* box-shadow: inset 4px 4px 5px 0 rgba(255, 255, 255, 0.25),
      inset -4px -4px 5px 0 rgba(0, 0, 0, 0.185),
      0 0 10px 5px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(0.2px); */}
    ${'' /* NOT WORKING POLYMORPHISM EFFECTT */}
    background-color: #1C2833;
  }
  .myform {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
    gap: 5px;
  }
  .myform img {
    height: 100px;
    width: 120px;
    margin-bottom: 5px;
  }
  /* .ok1{
      overflow:hidden; 
    
     width:100%;
      mix-blend-mode: multiply;
      filter: contrast(1);
    } */
  .myform h1 {
    color: white;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 5px;
  }

  input {
    background-color: transparent;
    padding: 10px;
    border: transparent;
    font-size: 16px;
    width: 100%;
  }
  input::placeholder {
    color: white;
  }
  input:focus {
    outline: none;
    border: 2px inset white;
    border-radius: 25px;
  }
  button {
    color: grey;
    padding: 10px;
    cursor: pointer;
    border: 2px solid white;
    border-radius: 20px;
    font-size: 1rem;

    transition: 0.4s ease-in-out;
  }
  button:hover {
    color: #4e0eff;
    border: 2px solid white;
    border-radius: 20px;
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      padding: 2px;
    }
    a:hover {
      font-weight: bold;
    }
  }
`;
