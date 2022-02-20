import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 380px) {
      ${props}
    }
  `;
};
export const mobileM = (props) => {
  return css`
    @media only screen and (min-width: 381px) and (max-width: 780px) {
      ${props}
    }
  `;
};
export const tablet = (props) => {
  return css`
    @media only screen and (min-width: 781px) and (max-width: 1020px) {
      ${props}
    }
  `;
};
export const laptop = (props) => {
  return css`
    @media only screen and (min-width: 1021px) and (max-width: 1280px) {
      ${props}
    }
  `;
};
export const laptopM = (props) => {
  return css`
    @media only screen and (min-width: 1281px) and (max-width: 1480px) {
      ${props}
    }
  `;
};
