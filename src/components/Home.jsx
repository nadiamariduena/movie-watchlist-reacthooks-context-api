import React, { useState, useContext } from "react";
import axios from "axios";
import MovieeContext from "../ContextMovieHandler.js";

//
//
import { mobile, mobileM, tablet, laptop } from "../responsive";
import styled from "styled-components";
import { Add } from "./Add";
import ResultCardsHome from "./ResultCardsHome";
import SvgImg from "./SvgImg";
//
//
const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280";
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

  //

  overflow: hidden;
  // ** squared pattern
  background-image: linear-gradient(#e8e4d8 1px, transparent 1px),
    linear-gradient(to right, #e8e4d8 1px, transparent 1px);
  background-size: 39px 39px;
  background-color: #ffffff;
`;

const HeroContainerRight = styled.div`
  -webkit-box-shadow: inset 1.5px 0 32px 22px #ffffff;
  -moz-box-shadow: inset 1.5px 0 32px 22px #ffffff;
  box-shadow: inset 1.5px 0 32px 22px #ffffff;

  flex: 1;
  height: 100%;
  padding-left: 92px;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;
const HeroContainerLeft = styled.div`
  background-color: #fefefe;
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
//https://images.unsplash.com/photo-1535979014625-490762ceb2ff?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=MnwzNjMxMDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzYxOTExMzE&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1080
//
const Home = () => {
  const { movies, randomImage, setRandomImage } = useContext(MovieeContext);

  return (
    <>
      <WrapperSectionHome>
        <WrapperContainer>
          <HeroWrapperHome>
            <HeroContainerLeft>
              <svg
                className="svgBox"
                id="10015.io"
                viewBox="0 0 480 480"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <defs>
                  <clipPath id="blob">
                    <path
                      fill="#474bff"
                      d="M220,422.09456541837426C261.00959093341237,421.7066504474001,240.94212856858982,337.9030224056536,274.28498148423387,314.0243460186288C302.41328436761745,293.8800997068984,360.5925605645113,341.0619763298557,376.2378217361627,310.2039484369743C392.3818753848988,278.36212410875254,336.13005541710197,252.76629487420774,321.95605933346087,220C314.5830126315018,202.95558846410836,323.8538093199914,181.4579918543012,313.7928315834878,165.84868343721612C303.8331832479769,150.39658457900677,282.40118239789393,148.202519945664,268.17444268570404,136.55941764204584C250.42554697111237,122.03379808606462,240.4768877238593,99.41928181848948,220,89.08903536852449C192.66836931634458,75.30068605250003,153.59934858892734,46.05776669759314,132.22985787957447,67.97765445988169C107.36168761828834,93.48633449324785,155.12038327049052,141.42843455924682,138.33919550967917,172.8531125452718C122.49143382802949,202.52984429653068,56.65687852719071,186.82772538352972,51.047943287412636,219.99999999999997C45.94837045880049,250.15981163371472,97.17221551238029,257.76615120146096,120.67070871807393,277.34779306003463C135.85586110611192,290.001805086575,153.93465004633907,298.75890028352256,165.118837080663,315.05696255475664C188.19886283082354,348.6901355107685,179.21116513812913,422.480392229405,220,422.09456541837426"

                      // d="M220,422.09456541837426C259.4258935481083,417.4652492496607,237.48992115501926,338.2503630981835,270.4549775793808,316.13392791537564C298.0447517415145,297.6237987619427,351.267004549671,350.9048637689475,368.47278840706633,322.4833662460001C386.30960365314064,293.0194949957708,332.1554761737414,264.9471699767092,321.2126848683943,232.28944492397014C315.7647925676106,216.03072592701798,328.1988993295493,197.2779156763827,321.26472109800534,181.59535701409888C314.3799693036249,166.02458275861875,294.43195438869867,161.25118489227157,283.89112898602576,147.8818237251958C270.5076370598109,130.90699202057084,267.1704272170881,107.600665396002,251.32904446330656,92.89307007971757C230.21343661044742,73.2887325048884,202.6728529133403,34.69525379837518,177.99046026767405,49.56059738770218C148.45115162168844,67.35109196079836,182.43271911214367,125.62896221209881,157.47166132648218,149.42009599464546C133.9568572729008,171.83276191261342,78.9065256936802,132.33345104245797,62.027082738623456,160.08877501382884C46.92529980336212,184.92104459935615,92.07116475973612,208.39365922541083,106.14067383872943,233.82502519085162C114.97120985420943,249.78667614966005,120.30453320843566,266.6967627845797,129.667376751809,282.3521078281688C139.57907807897487,298.9251823996868,152.43460640695042,312.54321231583947,162.9179672467987,328.7607265968128C183.00766590031242,359.83902102844127,183.24632786931443,426.4101142453543,220,422.09456541837426;
                      // "
                    />
                  </clipPath>
                </defs>

                <image
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  clip-path="url(#blob)"
                  xlinkHref="https://www.egofm.de/content/cache/blog/14619/f4f/ab2dbc2aba66c22d/m3gan-filmplakat_c_01.jpeg"
                  preserveAspectRatio="xMidYMid slice"
                ></image>
              </svg>
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
              {/* SEARCH */}
              <Add />
            </HeroContainerRight>
          </HeroWrapperHome>
        </WrapperContainer>
      </WrapperSectionHome>
    </>
  );
};

export default Home;
