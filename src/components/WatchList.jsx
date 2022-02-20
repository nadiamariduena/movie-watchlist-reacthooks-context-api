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

const WatchList = () => {
  return (
    <>
      <Container>
        <div>WatchList</div>
      </Container>
    </>
  );
};

export default WatchList;
