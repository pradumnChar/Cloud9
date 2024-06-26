import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const ok = async () => {
      setUserName(
        await JSON.parse(localStorage.getItem("chat-app-user")).username
      );
    };
    ok();
  }, []);
  return (
    <Container>
      <div
        style={{
          width: "50%",
          height: 0,
          paddingBottom: "50%",
          position: "relative",
        }}
      >
        <iframe
          src="https://giphy.com/embed/H8cCTLoyotDbVmmJy2"
          title="Giphy Embed"
          width="100%"
          height="60%"
          style={{ position: "absolute" }}
          frameBorder="0"
          allowFullScreen
        ></iframe> 
        
      
      </div>
      <h1>
        <span>{userName}!</span>
      </h1>
      <h3>Select a Chat.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  flex-direction: column;
  span {
    color: black;
  }
`;
