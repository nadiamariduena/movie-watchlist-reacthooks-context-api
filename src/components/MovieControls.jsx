import React from "react";
import styled from "styled-components";
import { mobile, mobileM, tablet } from "../responsive";

//
//
const WrapperContainer = styled.div``;
const Container = styled.div``;

//
//
const Content = styled.div`
  color: rgb(189, 212, 197);

  .ctrl-btn {
    padding: 5px 5px;
    margin: 1px;
    border-radius: 5rem;
    border: 0;
    background: rgba(189, 212, 197, 0.418);
    &:hover {
      background: rgba(238, 241, 239, 0.418);
    }
  }
`;

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