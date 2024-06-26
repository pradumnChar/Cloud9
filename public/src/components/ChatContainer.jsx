import React, { useState, useEffect,useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { sendMessageRoute, getAllMessageRoute} from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, currentUser, socket }) {
    const [messages, setMessages] = useState([]);
     const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);
  

  useEffect(() => {
  const fetchData = async () => {
  
     if(currentChat){
      const response = await axios.post(getAllMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    }
  };

  fetchData(); // Call the async function
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [currentChat]);


// useEffect(() => {
//   const getCurrentChat = async () => {
//     if (currentChat) {
//       const data = JSON.parse(localStorage.getItem("chat-apo-user"));
//       const currentChatId = data._id;
//       // Now you have access to the currentChatId, you can use it as needed
//       console.log("Current Chat ID:", currentChatId);
//     }
//   };
//   getCurrentChat();
// }, [currentChat]);


  const handleSendMsg = async (msg) => {
 
      await axios.post(sendMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      });
     
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message:msg,
  });
        const msgs = [...messages];
      msgs.push({ fromSelf: true, message: msg });
      setMessages(msgs);
   

    };


    useEffect(() => {
      if (socket.current) {
        socket.current.on("msg-recieve", (msg) => {
          setArrivalMessage({ fromSelf: false, message: msg });
        });
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt=""
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
        
          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
   display: grid; 
  grid-template-rows: 10% 80% 10%; 
  gap: 0.1rem;
   overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 9px 25px;
    .user-details {
      display: flex;
      align-items: center;
      gap: 10px;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          letter-spacing: 3px;
          font-weight: bolder;
          font-size: 18px;
          color: black;
        }
      }
    }
  }
   .chat-messages {
    padding: 1rem 2rem;
     display: flex;
     flex-direction: column;
     gap: 1rem;
     overflow: auto;
   
     &::-webkit-scrollbar {
       width: 0.2rem;
       &-thumb {
         background-color: #ffffff39;
         width: 0.1rem;
        border-radius: 1rem;
       }
     }
     .message {
       display: flex;
       align-items: center;
       .content {
         max-width: 40%;
        overflow-wrap: break-word;
        padding: 10px;
        font-size: 15px;
        border-radius: 10px;
        color: black;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: white;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: white;
      }
    }
  
  }
  
 `;
