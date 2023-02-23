import React, { useState, useEffect } from "react";

import { mobile, mobileM, tablet, laptop } from "../responsive";
import styled from "styled-components";
import Add from "./Add";
import SvgGradientCenter from "./SvgGradientCenter";
import SvgGradientTop from "./SvgGradientTop";
import SvgGradientRight from "./SvgGradientRight";

import svgAnillos from "../img/anillos.svg";

import { motion } from "framer-motion";
//
//

//
// https://dev.to/darthknoppix/animate-styled-components-with-framer-motion-2202

const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 20px, rgba(0,0,0,1) 20px, rgba(0,0,0,1) 20px)`;
// 20px size of the blind, you can add a conditional in this file so that the blinds are thinner in small devices, as 20px to 30px is too much for mobile, 15px is okay
//
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 20px)`;

//

const WrapperSectionHome = styled.div`
  position: relative;
  width: 100vw;
  height: auto;
  /* dont add overflow here, as it will block the overlay on the results movies */
`;

const WrapperContainer = styled.div`
  width: 100vw;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const HeroWrapperHome = styled.div`
  z-index: 100;

  //
  /* -webkit-box-shadow: inset -1px 1px 32px 24.5px #282828;
  -moz-box-shadow: inset -1px 1px 32px 24.5px #282828;
  box-shadow: inset -1px 1px 32px 24.5px #282828; */

  // ** squared pattern
  background-image: linear-gradient(#fafafa2b 1px, transparent 1px),
    linear-gradient(to right, #fafafa2b 1px, transparent 1px);
  background-size: 39px 39px;

  width: 80%;
  height: 70%;
  margin-top: 70px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  //

  ${mobile({
    marginTop: "20px",
    width: "98%",
    flexFlow: "column wrap-reverse",
    padding: "100px 10px",
    height: "auto",
  })}
  ${mobileM({
    marginTop: "70px",
    width: "98%",
    flexFlow: "column wrap-reverse",
    padding: "100px 10px",
    height: "auto",
  })}
  ${tablet({
    marginTop: "70px",
    width: "98%",
    flexFlow: "column wrap-reverse",
    padding: "100px 10px",
    height: "auto",
  })}
    ${laptop({
    marginTop: "70px",
    width: "90%",
    flexFlow: "column wrap-reverse",
    padding: "100px 10px",
    height: "auto",
  })} //

  /* overflow: hidden; */
`;

const HeroContainerRight = styled.div`
  /*  -webkit-box-shadow: inset 1.5px 0 32px 22px #ffffff;
   -moz-box-shadow: inset 1.5px 0 32px 22px #ffffff;
  box-shadow: inset 1.5px 0 32px 22px #ffffff;
  background-color: #fefefe; */
  //

  width: 50%;
  padding-left: 92px;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

  ${mobile({
    display: "flex",
    width: "100%",
    padding: "40px 5px",
    minHeight: "80vh",
  })}
  ${mobileM({
    display: "flex",
    width: "95%",
    padding: "40px 5px",
    minHeight: "90vh",
    // background: "greenyellow",
  })}
    ${tablet({
    display: "flex",
    width: "85%",
    padding: "70px 5px 20px 5px ",
    minHeight: "auto",
  })}
  ${laptop({
    display: "flex",
    width: "70%",
    padding: "70px 5px 20px 5px ",
    minHeight: "70vh",

    justifyContent: "flex-start",
  })}
`;
const HeroContainerLeft = styled.div`
  width: 48%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  //
  background-image: url(${svgAnillos});
  background-repeat: no-repeat;

  //

  /* position: relative;
  overflow: hidden;
  background-color: olive;

   &::before {
    width: 100%;
    height: 100%;
    content: "";
    position: absolute;
    //
    background-image: linear-gradient(
      95deg,
      rgba(255, 95, 33, 0.2),
      rgba(0, 66, 228, 0.2),
      rgba(255, 95, 33, 0.2)
    );
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
  }
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  } */

  ${mobile({
    display: "flex",
    width: "100%",
    padding: "40px 0",
    borderRadius: "30px",
  })}
  ${mobileM({
    display: "flex",
    width: "92%",
    padding: "40px 0",
    minHeight: "auto",

    borderRadius: "30px",
  })}
  ${tablet({
    display: "flex",
    width: "80%",
    padding: "40px 0",
    minHeight: "auto",

    borderRadius: "30px",
  })}
    ${laptop({
    display: "flex",
    width: "70%",
    padding: "40px 0",
    minHeight: "auto",

    borderRadius: "30px",
  })}
`;

const H1 = styled.h1`
  font-family: "Syncopate-Bold";
  /* color: rgb(248, 248, 248); */
  color: #1f18c0;
  color: red;

  font-size: calc(58px + 1vmin);
  line-height: calc(62px + 1vmin);
  margin-bottom: 10px;
  ${mobile({ fontSize: `calc(44px + 1vmin)`, paddingTop: "100px 0 0 0" })}

  ${tablet({
    fontSize: `calc(74px + 1vmin)`,
    lineHeight: `calc(124px + 1vmin)`,
  })}
`;
const H2 = styled.h2`
  color: rgb(228, 228, 221, 0.9);

  font-size: calc(48px + 1vmin);
  line-height: calc(50px + 1vmin);

  word-wrap: break-word;
  //
  //
  ${mobile({
    maxWidth: "90%",
    wordWrap: "break-word",
    marginTop: "70px 0 0 0",
    fontSize: `calc(40px + 1vmin)`,
    lineHeight: `calc(45px + 1vmin)`,
  })}
  ${mobileM({
    maxWidth: "90%",
    wordWrap: "break-word",

    fontSize: `calc(46px + 1vmin)`,
    lineHeight: `calc(45px + 1vmin)`,
  })}
    ${tablet({
    maxWidth: "90%",
    wordWrap: "break-word",

    fontSize: `calc(48px + 1vmin)`,
    lineHeight: `calc(52px + 1vmin)`,
  })}
`;
const P = styled.p`
  margin: 35px 0 55px 0;
  max-width: 550px;
  word-wrap: break-word;
  font-size: calc(10px + 1vmin);
  line-height: calc(19px + 1vmin);
  color: rgba(87, 87, 87, 0.4);

  ${mobile({
    maxWidth: "90%",
    fontSize: `calc(13px + 1vmin)`,
    lineHeight: `calc(22px + 1vmin)`,
  })}
  ${mobileM({
    maxWidth: "85%",
    wordWrap: "break-word",
    fontSize: `calc(14px + 1vmin)`,
    lineHeight: `calc(22px + 1vmin)`,
  })}
   ${tablet({
    maxWidth: "80%",
    fontSize: `calc(13px + 1vmin)`,
    lineHeight: `calc(22px + 1vmin)`,
  })}
`;

//
//https://images.unsplash.com/photo-1535979014625-490762ceb2ff?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=MnwzNjMxMDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzYxOTExMzE&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1080
//
const Home = () => {
  // const { movies, randomImage, setRandomImage } = useContext(MovieeContext);

  //
  //
  const [randomImgHome, setRandomImgHome] = useState("");

  useEffect(() => {
    const ImagesRandomHome = [
      // ghost
      "https://i.guim.co.uk/img/media/31dbbedbf1101828aca84a0211cfadb57fa1e366/0_141_3945_2367/master/3945.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=ce0c3fcd5f988ee68759b7a6d9d2cae3",
      // tenet
      "https://rare-gallery.com/uploads/posts/343166-Tenet-2020-Movie-Poster-John-David-Washington.jpg",
    ];

    const randomIndexImg = Math.floor(Math.random() * ImagesRandomHome.length);
    setRandomImgHome(ImagesRandomHome[randomIndexImg]);
  }, []);

  //
  // ** Framer
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  //
  return (
    <>
      <WrapperSectionHome
        as={motion.div}
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* <SvgGradientTop /> */}
        <SvgGradientCenter />
        {/* <SvgGradientRight /> */}

        <WrapperContainer>
          <HeroWrapperHome>
            <HeroContainerLeft
              as={motion.div}
              initial={false}
              animate={
                isLoaded && isInView
                  ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
                  : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
              }
              transition={{ duration: 0.2, delay: 0.1 }}
              viewport={{ once: true }}
              onViewportEnter={() => setIsInView(true)}
            >
              <svg
                onLoad={() => setIsLoaded(true)}
                // shadow img
                // https://css-tricks.com/adding-shadows-to-svg-icons-with-css-and-svg-filters/
                style={{
                  filter: "drop-shadow(3px 5px 20px rgb(0 0 0 / 0.3))",
                }}
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
                      d=" M220,422.09456541837426C261.00959093341237,421.7066504474001,240.94212856858982,337.9030224056536,274.28498148423387,314.0243460186288C302.41328436761745,293.8800997068984,360.5925605645113,341.0619763298557,376.2378217361627,310.2039484369743C392.3818753848988,278.36212410875254,336.13005541710197,252.76629487420774,321.95605933346087,220C314.5830126315018,202.95558846410836,323.8538093199914,181.4579918543012,313.7928315834878,165.84868343721612C303.8331832479769,150.39658457900677,282.40118239789393,148.202519945664,268.17444268570404,136.55941764204584C250.42554697111237,122.03379808606462,240.4768877238593,99.41928181848948,220,89.08903536852449C192.66836931634458,75.30068605250003,153.59934858892734,46.05776669759314,132.22985787957447,67.97765445988169C107.36168761828834,93.48633449324785,155.12038327049052,141.42843455924682,138.33919550967917,172.8531125452718C122.49143382802949,202.52984429653068,56.65687852719071,186.82772538352972,51.047943287412636,219.99999999999997C45.94837045880049,250.15981163371472,97.17221551238029,257.76615120146096,120.67070871807393,277.34779306003463C135.85586110611192,290.001805086575,153.93465004633907,298.75890028352256,165.118837080663,315.05696255475664C188.19886283082354,348.6901355107685,179.21116513812913,422.480392229405,220,422.09456541837426"
                    />
                  </clipPath>
                </defs>

                <image
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  clipPath="url(#blob)"
                  xlinkHref={randomImgHome}
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

/*


     -webkit-mask-image: radial-gradient(red, transparent 70%);
    mask-image: radial-gradient(red, transparent 70%);

    //   ----------
       mask-image: radial-gradient(at 25%, red, transparent 70%);
  //   ----------
    mask-image: radial-gradient(
      at 25%,
      red,
      #{rgba(red, 0.2)}50%,
      transparent 70%
    );
    //
    mask-image: radial-gradient(
      at 20%,
      hsla(39, 24%, 91%, 0.129),
      hsla(39, 24%, 91%, 0.245) 34%,
      hsla(40, 23%, 91%, 0.228) 47%,
      hsla(40, 23%, 91%, 0.218) 56.5%,
      hsla(40, 23%, 91%, 0.218) 65%,
      hsla(40, 23%, 91%, 0.218) 73%,
      hsla(40, 23%, 91%, 0.118) 80.2%,
      hsla(40, 23%, 91%, 0.118) 86.1%,
      hsla(40, 23%, 91%, 0.123) 91%,
      hsla(40, 23%, 91%, 0.123) 95.2%,
      hsla(40, 23%, 91%, 0.123) 98.2%,
      hsla(40, 23%, 91%, 0) 100%,
      transparent 20%
    );

*/
