import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
//import { Buffer } from "buffer";
import loadingImage from "../assets/aww-cute.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";
import multiavatar from "@multiavatar/multiavatar/esm";

export default function SetAvatar() {
  // const api = 'https://api.multiavatar.com/45678945';
  const navigate = useNavigate();
  const [avatars , setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ selectedAvatar , setSelectedAvatar] = useState(undefined);
 
  const toastAppear = {
    
    position: "bottom-right",
    theme: "dark",
    pauseOnHover: true,
    autoClose: 5000,
    draggable: true,
  };
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        if (!localStorage.getItem('chat-app-user')) {
         navigate('/login');
        } 
      } catch (error) {
        console.error('Error navigating:', error);
      }
    };
  
    checkLoggedIn();
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const setProfilePicture = async () =>{
    if(selectedAvatar === undefined){ 
      toast.error("Please select one of your avatar", toastAppear
      )}else{
        const user = await JSON.parse(localStorage.getItem("chat-app-user"));
        const {data} = await axios.post(`${setAvatarRoute}/${user._id}`, {
          image: avatars[selectedAvatar],
        });
      if(data.isSet)
      {
      
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user))
        navigate('/');
      }
      else{
        toast.error("Error", toastAppear)

      }
      
    }
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = [];
  //       for (let i = 0; i < 4; i++) {
  //         const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
  //         const buffer = Buffer.from(image.data);
  //         data.push(buffer.toString('base64'));
  //       }
  //       setAvatars(data);
  //       setisLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       // Handle error as needed, e.g., set error state, show error message, etc.
  //     }
  //   };
  
  //   fetchData(); // Call the async function inside useEffect
  
  // }, []);
  
  // useEffect(() => {
  //   (async () => {
  //     const data = [];
  //     for (let i = 0; i < 4; i++) {
  //       const image = await axios.get(
  //         `${api}/${Math.round(Math.random() * 1000)}`
  //       );
  //       const buffer = new Buffer(image.data);
  //       data.push(buffer.toString("base64"));
  //     }
  //     setAvatars(data);
  //     setisLoading(false);
  //   })();
  // }, [ ]);
  const generateRandomName = () => Math.random().toString(36).substring(2, 10);
  useEffect(() => {
    const generateAvatars = () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const randomName = generateRandomName();
        const svgCode = multiavatar(randomName);
        const encoded = btoa(unescape(encodeURIComponent(svgCode)));
        data.push(encoded);
      }
      setAvatars(data);
      setIsLoading(false);
    };

    generateAvatars();
  }, []);
  

   return (
    <>
    {
      isLoading ? <Container>
        <img className="loader" src={loadingImage}  alt="loading" />
      </Container> : 
      <Container>
        <div className="title-container">
            <h1>Pick an Avatar as your Profile</h1>
        </div>
        <div className="avatars">
            {
               avatars.map((avatar,index)=>
               {
                return (
                  <div
                key={index}
                className={`avatar ${
                  selectedAvatar === index ? "selected" : ""
                }`}
                onClick={() => setSelectedAvatar(index)}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt={`avatar-${index}`}
                />
              </div>
                );
               
             }) }
        </div>
        <button onClick={()=>setProfilePicture()}>SetProfile</button>
      </Container>
    }
      
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
   background-color: grey;
   height: 100vh;
   width: 100vw;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   background-color:   #1C2833;
  
   gap: 5rem;
   .loader{
    max-inline-size: 100%;
   }
   .title-container{
    h1{
      color: white;
    }
   }
   .avatars{
    display: flex;
    gap: 3rem;
    .avatar{
      border : 0.3rem solid transparent;
      padding: 0.55rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: .2s  ease-in-out;
     img{
      height: 140px;
     }
    }
    .selected{
      border: 3px solid white;
      border-radius: 35px;
    }
   }
    button{
      font-size: 18px;
      color: #89CFF0;
      font-weight: bold;
      background-color: #89CFF0;
      padding: 0.6rem;
      width: 220px;
      border: 1px inset white;
      border-radius: 25px;
      background-color: #F0F8FF;
    }
    
   
`;
