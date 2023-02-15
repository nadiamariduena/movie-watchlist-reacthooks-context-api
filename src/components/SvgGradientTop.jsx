import React from "react";
import { mobile, mobileM, tablet, laptop } from "../responsive";
import styled from "styled-components";

//** grain
//
//
const WrapperSvg2 = styled.div`
  width: 100vw;
  height: 300vh;
  overflow: hidden;
  position: absolute;
  border: 1px solid #000;
  z-index: -1;
`;

const ContainerSvg2 = styled.div`
  border: 1px solid #000;
  border-radius: 50% 22% 40% 80%;
  -webkit-filter: blur(100px);
  filter: blur(100px);

  overflow: hidden;
  width: 100%;
  height: 100%;
  //

  position: absolute;

  //
  top: -20%;
  left: -10%;
  //
  transform: translate(4%, 0%);

  &::before,
  &::after {
    //
    position: fixed;
    inset: 0;

    mask: radial-gradient(
      circle at -35% 15%,
      ${(props) => props.theme.redOnly},
      ${(props) => props.theme.redWithOpacity} 50%,
      transparent 80%
    );
    -webkit-mask: radial-gradient(
      circle at -35% 15%,
      ${(props) => props.theme.redOnly},
      ${(props) => props.theme.redWithOpacity} 50%,
      transparent 80%
    );

    //

    content: "";
    mix-blend-mode: color;
    mask-composite: intersect;
    /* intersect is the product of the alphas of the 2 masking layers */
  }
  &::before {
    background-color: #000;
    filter: url(#f);
  }
  &::after {
    background-color: $red-with-opacity;
    background: linear-gradient(120deg, GoldenRod 20%, Khaki 30% MintCream 50%);
  }
`;
ContainerSvg2.defaultProps = {
  theme: {
    greenOnlyTest: "green",
    redOnly: "yellow",
    redWithOpacity: "rgba(255, 254, 215, 0.6)",
    //  redWithOpacity: "rgba(red, 0.2)", // this "red" dont work, you have to put the decimals
    // 255, 0, 45 // red
  },
};

//
//
//
const SvgGradientTop = () => {
  return (
    <WrapperSvg2>
      <ContainerSvg2>
        {" "}
        <svg style={{ position: "absolute" }}>
          <filter id="f">
            {/* https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/ */}
            <feTurbulence type="fractalNoise" baseFrequency="9.5" />
          </filter>
        </svg>
      </ContainerSvg2>
    </WrapperSvg2>
  );
};

export default SvgGradientTop;
