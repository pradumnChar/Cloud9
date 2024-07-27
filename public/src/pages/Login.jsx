import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { Link,useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";
import game from "../assets/game.jpg";


export default function Login() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    username: "",
    password: "",
  });
  const toastAppear = {
    position: "bottom-right",
    theme: "dark",
    pauseOnHover: true,
    autoClose: 4000,
    draggable: true,
  };
  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate("/");
    }
    // else{
    //   navigate("/register");
    // }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  //TO prevent submitting adding middleware in between
  const handlechange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };


  const handlevalid = () => {
    const {username, password} = value;
    if( username.length === "")
    {
        toast.error("Username is Required", 
        toastAppear);
        return false;
    }
   else if( password === "")
    {
        toast.error("Password is Required", 
        toastAppear);
        return false;
    }
   
    

    return true;
  };


  const handlesubmit = async (event) => {
    event.preventDefault();
    if ( handlevalid() ) {
      //Apicall
      const { username , password } = value;
      const {data} = await axios.post( loginRoute,{
        username, 
        password,
       
      });
    if(data.status === false) {
      console.log("Error");
      toast.error(data.msg, toastAppear);
    }
     if(data.status === true)
     {
      console.log("ok");
      localStorage.setItem("chat-app-user",JSON.stringify(data.user)
      );
      navigate("/");
     }
   
    } 
    };
  

  return (
    <>
      <FormContainer>
        <div className="ok">
          <form action="" onSubmit={(event) => handlesubmit(event)}>
            <div className="myform">
              <img className="ok1" src={logo} alt="error" />
              <h1>CLOUD 9</h1>
            </div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => handlechange(e)}
              min="3"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => handlechange(e)}
            />
            <button type="submit">Login !</button>
            <span>
             New Here ? <Link to="/register">Register Now!</Link>
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
  background-image: url('${game}');
   background-repeat: no-repeat;

  .ok {
    padding: 50px;
    border-radius: 30px;
    ${'' /* background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.75),
      rgba(255, 255, 255, 0.32)
    );
    box-shadow: inset 4px 4px 5px 0 rgba(255, 255, 255, 0.25),
      inset -4px -4px 5px 0 rgba(0, 0, 0, 0.185),
      0 0 10px 5px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(0.2px); */}
    backdrop-filter: blur(2px) saturate(96%);
    -webkit-backdrop-filter: blur(2px) saturate(96%);
    background-color: rgba(255, 255, 255, 0.18);
    border-radius: 20px;
    border: 1px solid rgba(209, 213, 219, 0.3);
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
    padding: 10px;
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
    border: 2px solid transparent;
    border-bottom: 2px solid black;
   
  }
  button {
    color: grey;
    padding: 10px;
    cursor: pointer;
    border: 2px solid white;
    border-radius: 20px;
    font-size: 1rem;
    outline: none;
    transition: 0.4s ease-in-out;
  }
  button:hover {
    color: #4e0eff;
    border: 2px inset white;
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
