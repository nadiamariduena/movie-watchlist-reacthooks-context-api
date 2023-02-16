import React from "react";
import { mobile, mobileM, tablet, laptop } from "../responsive";

import styled from "styled-components";

const WrapperSvg1 = styled.div`
  -webkit-filter: blur(100px);
  filter: blur(100px);
  // ** gradient
  width: 1000px;
  height: 1000px;
  position: absolute;

  //
  top: 8%;
  left: 7%;
  //
  transform: translate(-7%, 0%);
  border-radius: 50% 22% 40% 80%;
  //

  ${mobile({
    width: "100%",
    height: "100%",
    top: "-15%",
    left: "10%",
  })} //

${mobileM({
    width: "100%",
    height: "100%",
    top: "-15%",
    left: "10%",
  })} //
${tablet({
    width: "100%",
    height: "1000px",
    top: "5%",
    left: "2%",
  })}

${laptop({
    width: "1500px",
    height: "1500px",
    top: "0%",
    left: "2%",
  })}




//
//
  /*  background: radial-gradient(
    circle at 50% 50%,
    rgba(255, 253, 167, 0.9),
    rgba(255, 253, 167, 0)
  );
  opacity: 0.8; */

  //

  &::before,
  &::after {
    //
    position: fixed;
    inset: 0;
    z-index: -1;
    //
    mask: radial-gradient(
      ${(props) => props.theme.redOnly},
      ${(props) => props.theme.redWithOpacity} 20%,
      transparent 80%
    );
    -webkit-mask: radial-gradient(
      ${(props) => props.theme.redOnly},
      ${(props) => props.theme.redWithOpacity} 20%,
      transparent 50%
    );

    //

    content: "";
    mix-blend-mode: color;
    mask-composite: intersect;
    /* intersect is the product of the alphas of the 2 masking layers */
  }
  &::before {
    background-color: #000000;
    filter: url(#f);
    z-index: 20;
  }
  &::after {
    z-index: -1;
    background-color: $red-with-opacity;
    background: linear-gradient(120deg, sienna 20%, navy 50%, sienna 10%);
  }
`;

WrapperSvg1.defaultProps = {
  theme: {
    greenOnlyTest: "green",
    redOnly: "red",
    redWithOpacity: "rgba(255, 0, 45, 0.8)",
    //  redWithOpacity: "rgba(red, 0.2)", // this "red" dont work, you have to put the decimals
    // 255, 0, 45 // red
  },
};

//
//
//
const SvgGradientCenter = () => {
  return (
    <WrapperSvg1>
      {" "}
      <svg style={{ position: "absolute" }}>
        <filter id="f">
          {/* https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/ */}
          <feTurbulence type="fractalNoise" baseFrequency="8.5" />
        </filter>
      </svg>
    </WrapperSvg1>
  );
};

export default SvgGradientCenter;
