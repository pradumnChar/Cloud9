import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
//import { allUsersRoute } from "../utils/APIRoutes";
export default function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(
    () => {
      console.log(contacts);
      if (currentUser) {
        setCurrentUserImage(currentUser.avatarImage);
        setCurrentUserName(currentUser.username);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index); //
    changeChat(contact); //
  };
  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="" />
            <h2>CLOUD 9</h2>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact 
         ${index === currentSelected ? "selected" : ""}`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data: image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data: image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            {/* <div style={{ width: '100%', height: 0, paddingBottom: '50%', position: 'relative' }}>
      <iframe
        src="https://giphy.com/embed/H8cCTLoyotDbVmmJy2"
        title="Giphy Embed"
        width="100%"
        height="100%"
        style={{ position: 'absolute' }}
        frameBorder="0"
        className="giphy-embed"
        allowFullScreen
      ></iframe>
      <p><a href="https://giphy.com/gifs/nft-pigeons-of-new-york-H8cCTLoyotDbVmmJy2">via GIPHY</a></p>
    </div>
    <div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/DaE11akx4yJjynKj4i" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>
    <p><a href="https://giphy.com/gifs/xbox-game-xbox-series-x-s-DaE11akx4yJjynKj4i">via GIPHY</a></p> */}
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`

  display: grid;
  grid-template-rows: 13% 72% 15%;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  .brand {
    margin-bottom: 5px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 5px 24px 0px, rgba(0, 0, 0, 0.2) 0px 0px 10px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    img {
      height: 75px;
      
    }
    h2 {
      color: white;
      text-transform: uppercase;
      font-size: 18px;
      padding: 5px;
      letter-spacing: 4px;
    
    }
  }
  .contacts {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 15px;
    &::-webkit-scrollbar {
      width: 0.3rem;
      &-thumb {
        background-color: black;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      padding: 10px;
      border-radius: 25px;
      background-color: #ffffff34;
      min-height: 60px;
      height: 65px;
      cursor: pointer;
      width: 90%;
      display: flex;
      gap: 10px;;
      align-items: center;
      transition: 0.3s ease-in-out;
      .avatar {
        img {
          height: 35px;
        }
      }
      .username {
        h3 {
          letter-spacing: 2px;
          color: black;
          font-size: 14px;
          font-weight: bolder;
        }
      }
    }
    .selected {
      background-color: lightgray;
     
     
    }
  }

  .current-user {
    background-color: transparent;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 5px 24px 0px, rgba(0, 0, 0, 0.2) 0px 0px 10px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    
    .avatar {
      img {
        height: 45px;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
          letter-spacing: 2px;
          color: black;
          font-weight: bolder;
          font-size: 18px;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
