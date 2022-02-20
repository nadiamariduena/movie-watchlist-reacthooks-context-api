import React from "react";
import styled from "styled-components";
import { mobile, mobileM, tablet } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Watched = () => {
  return (
    <>
      <Container>
        <div>Watched</div>
      </Container>
    </>
  );
};

export default Watched;
