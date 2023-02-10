import React, { useState, useEffect } from "react";
import axios from "axios";
import { mobile, mobileM, tablet, laptop } from "../responsive";
import styled from "styled-components";
import { Add } from "./Add";
import ResultCardsHome from "./ResultCardsHome";

// import videoCity1 from "../../videos/smartphone-cottonbro_lwres.mp4";

const WrapperSectionHome = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const WrapperContainer = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const HeroWrapperHome = styled.div`
  width: 80%;
  height: 70%;
  margin-top: 70px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
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
  color: rgba(142, 182, 203, 0.496);
  font-size: calc(58px + 1vmin);
  line-height: calc(62px + 1vmin);
  margin-bottom: 10px;
`;
const H2 = styled.h2`
  color: rgba(142, 182, 203, 0.496);
  font-size: calc(48px + 1vmin);
  line-height: calc(50px + 1vmin);
`;
const P = styled.p`
  margin: 35px 0 50px 0;
  max-width: 650px;
  font-size: calc(10px + 1vmin);
  line-height: calc(16px + 1vmin);
  color: #141414;
`;

//
// ** POPULAR SECTION
//
const SectionHomePopularMovies = styled.div``;

//

const WrapperPopularMovies = styled.div`
  width: 100%;

  margin: 30px auto 0 auto;
`;

//
const UlHome = styled.ul`
  margin: 0 auto 0 auto;
  padding: 50px 120px 50px 120px;
  width: 90%;

  grid-template-columns: repeat(4, 1fr);
  display: grid;
  grid-gap: 1em;

  //
  background-color: #fefefe;
  border-radius: 50px;

  ${mobile({
    left: "0",
    width: "100%",
    gridTemplateColumns: `repeat(1, 1fr)`,
    padding: "100px 0px 180px 0px",
    gridGap: "0.9em",
    // background: "red",
  })}
  ${mobileM({
    left: "2.5%",
    width: "90%",
    gridTemplateColumns: `repeat(2, 1fr)`,
    padding: "100px 15px 180px 15px",
    gridGap: "0.9em",
  })}
  ${tablet({
    width: "95%",
    left: "4.5%",
    gridTemplateColumns: `repeat(3, 1fr)`,
    padding: "100px 20px 180px 20px",
    gridGap: "1.8em",
  })}
    ${laptop({
    width: "85%",
    gridTemplateColumns: `repeat(3, 1fr)`,
    padding: "100px 20px 180px 20px",
    gridGap: "2.5em",
  })}
`;
//
//
//
const Home = () => {
  return (
    <>
      <WrapperSectionHome>
        <WrapperContainer>
          <HeroWrapperHome>
            <HeroContainerLeft>
              <h1
                style={{
                  zIndex: "999",
                  background: "rgba(142, 182, 203, 0.196)",
                  width: "40vw",
                  height: "100%",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
                d
              </h1>
              <h1> </h1>
            </HeroContainerLeft>

            <HeroContainerRight>
              <H1>MUBII</H1>
              <H2>the ultimate online</H2>
              <H2>platform for movie enthusiasts</H2>

              <P>
                We understand the importance of convenience when it comes to
                watching movies and TV shows, which is why we offer a seamless
                streaming experience.
              </P>

              <Add />
            </HeroContainerRight>
          </HeroWrapperHome>
        </WrapperContainer>
      </WrapperSectionHome>
    </>
  );
};

export default Home;
/* <video autoPlay muted loop className="video__product__box">
              <source src={videoCity1} type="video/mp4" />
            </video> */
