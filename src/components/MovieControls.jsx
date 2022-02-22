import React from "react";
import styled from "styled-components";
import { mobile, mobileM, tablet } from "../responsive";

//
//
const WrapperContainer = styled.div``;
const Container = styled.div``;

//
//
const Content = styled.div``;

//
//
const MovieControls = ({ movie, type }) => {
  return (
    <>
      <WrapperContainer>
        <Container>
          <Content>
            {type === "watchlist" && (
              <>
                <button className="ctrl-btn">
                  <i className="fa-fw far fa-eye"></i>
                </button>
                {/*  */}
                <button className="ctrl-btn">
                  <i className="fa-fw fa fa-times"></i>
                </button>
              </>
            )}
          </Content>
        </Container>
      </WrapperContainer>
    </>
  );
};

export default MovieControls;
