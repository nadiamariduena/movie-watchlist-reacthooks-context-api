import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import styled from "styled-components";
import { mobile, mobileM, tablet } from "../responsive";

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  padding: 0 0 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WatchList = () => {
  return (
    <>
      <Container>
        <div>WatchList</div>
      </Container>
    </>
  );
};
