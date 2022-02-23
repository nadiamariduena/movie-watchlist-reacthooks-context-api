import React from "react";
import styled from "styled-components";

const imgBg = "https://wallpapercave.com/wp/2FoBvF7.jpg";

//https://www.google.com/imgres?imgurl=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F1922937.jpg&imgrefurl=https%3A%2F%2Fwallpaperaccess.com%2Fhollywood-movie&tbnid=NUwKEz33-Xz61M&vet=12ahUKEwiQl5P81pb2AhUNgHMKHTHkCGwQMygAegUIARCpAQ..i&docid=AFdSP5NmZDikNM&w=2560&h=1600&q=free%20hollywood%20movies%20images&ved=2ahUKEwiQl5P81pb2AhUNgHMKHTHkCGwQMygAegUIARCpAQ#imgrc=NUwKEz33-Xz61M&imgdii=ZbyvIltuRibW1M
//https://wallpapercave.com/avatar-wallpapers

const WrapperContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  padding: 0 0 100px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &::after {
    background: #1b1b1b44;
    content: "";
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;
const Container = styled.div``;

//
//
const Content = styled.div`
  padding: 0px 0 20px 0;
  text-align: center;
  h1 {
    padding: 20vh 0 0 0;
    font-weight: 600;
    font-size: calc(20px + 2vmin);
    font-family: "Poppins-Light";
    color: rgb(189, 212, 197);
  }
`;
//
//
const Home = () => {
  return (
    <>
      <WrapperContainer
        style={{
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${imgBg})`,

          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Container>
          <Content></Content>{" "}
        </Container>
      </WrapperContainer>
    </>
  );
};

export default Home;
