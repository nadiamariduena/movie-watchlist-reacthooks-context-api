import React from "react";
import styled from "styled-components";

const WrapperSvg2 = styled.div`
  overflow: hidden;
  border: 1px solid #000;
  width: 850px;
  height: 850px;
  position: absolute;
  filter: blur(100px);
  z-index: -1;
  top: -20%;
  left: 60%;
  transform: translate(0%, 20%);
  border-radius: 50% 22% 40% 80%;
  opacity: 0.3;

  // ** ---

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
      ${(props) => props.theme.redWithOpacity} 100%,
      transparent 50%
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
    z-index: 900;
    background-color: $red-with-opacity;
    background: linear-gradient(120deg, sienna 20%, navy 50%, sienna 10%);
  }
`;

WrapperSvg2.defaultProps = {
  theme: {
    greenOnlyTest: "green",
    redOnly: "red",
    redWithOpacity: "rgba(255, 0, 45, 0.6)",
    //  redWithOpacity: "rgba(red, 0.2)", // this "red" dont work, you have to put the decimals
    // 255, 0, 45 // red
  },
};

//
//
//
const SvgGradientRight = () => {
  return (
    <WrapperSvg2>
      {" "}
      <svg style={{ position: "absolute" }}>
        <filter id="f">
          {/* https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/ */}
          <feTurbulence type="fractalNoise" baseFrequency="8.5" />
        </filter>
      </svg>
    </WrapperSvg2>
  );
};

export default SvgGradientRight;
