import React, { useState } from "react";
import styled from "styled-components";
import { Add } from "./Add";

const imgBg = "https://wallpapercave.com/wp/2FoBvF7.jpg";

//https://www.google.com/imgres?imgurl=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F1922937.jpg&imgrefurl=https%3A%2F%2Fwallpaperaccess.com%2Fhollywood-movie&tbnid=NUwKEz33-Xz61M&vet=12ahUKEwiQl5P81pb2AhUNgHMKHTHkCGwQMygAegUIARCpAQ..i&docid=AFdSP5NmZDikNM&w=2560&h=1600&q=free%20hollywood%20movies%20images&ved=2ahUKEwiQl5P81pb2AhUNgHMKHTHkCGwQMygAegUIARCpAQ#imgrc=NUwKEz33-Xz61M&imgdii=ZbyvIltuRibW1M
//https://wallpapercave.com/avatar-wallpapers

const WrapperContainer = styled.div`
  width: 100vw;
  height: 100vh;

  //
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const HeroWrapperHome = styled.div`
  width: 80%;
  height: 70%;
  margin-top: 70px;

  /* background-color: lavender; */
  //
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  //

  //
  overflow: hidden;
  // ** squared pattern
  background-image: linear-gradient(#e8e4d8 1px, transparent 1px),
    linear-gradient(to right, #e8e4d8 1px, transparent 1px);
  background-size: 39px 39px;
  background-color: #ffffff;
`;

const HeroContainerRight = styled.div`
  flex: 1;
  height: 100%;
  padding-left: 22px;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;
const HeroContainerLeft = styled.div`
  background-color: #fafafa;
  flex: 1;

  height: 100%;
`;

const H1 = styled.h1`
  font-family: "Syncopate-Bold";
  color: red;
  font-size: calc(58px + 1vmin);
  line-height: calc(62px + 1vmin);
  margin-bottom: 10px;
`;
const H2 = styled.h2`
  color: red;
  font-size: calc(48px + 1vmin);
  line-height: calc(50px + 1vmin);
`;
const P = styled.p`
  margin: 35px 0 30px 0;
  max-width: 650px;
  font-size: calc(10px + 1vmin);
  line-height: calc(16px + 1vmin);
  color: #141414;
`;
//
const Home = () => {
  return (
    <>
      <WrapperContainer>
        <HeroWrapperHome
        // style={{
        //   backgroundRepeat: "no-repeat",
        //   backgroundImage: `url(${imgBg})`,

        //   backgroundPosition: "center",
        //   backgroundSize: "cover",
        // }}
        >
          <HeroContainerLeft>a</HeroContainerLeft>

          <HeroContainerRight>
            <H1>MUBII</H1>
            <H2>the ultimate online</H2>
            <H2>platform for movie enthusiasts</H2>

            <P>
              We understand the importance of convenience when it comes to
              watching movies and TV shows, which is why we offer a seamless
              streaming experience.
            </P>
            {/*

            This one is for nadia mariduena site

            <P>
              I created this website as a way to exercise my knowledge and
              skills in React. The result is a user-friendly platform that
              offers a seamless and enjoyable movie-watching experience.
            </P> */}
            <Add />
          </HeroContainerRight>
        </HeroWrapperHome>
      </WrapperContainer>
    </>
  );
};

export default Home;
