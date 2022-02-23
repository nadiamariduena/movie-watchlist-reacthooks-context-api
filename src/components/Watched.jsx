import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import WatchedMovieCard from "./WatchedMovieCard";
//
import styled from "styled-components";

const WrapperContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  padding: 0 0 100px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div``;

//
//
const Content = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 0px 0 20px 0;

  h1 {
    padding: 20vh 0 60px 0;
    font-weight: 600;
    font-size: calc(20px + 2vmin);
    font-family: "Poppins-Light";
    color: rgb(189, 212, 197);
    text-align: center;
  }
`;

const Ul = styled.ul`
  /* padding: 5em 7.5em;
  display: grid;
  grid-gap: 2em;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); */
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
`;

export const Watched = () => {
  //
  //
  const { watched } = useContext(GlobalContext);

  //
  //
  return (
    <>
      <WrapperContainer>
        <Container>
          <Content>
            <h1>Watched Movies</h1>

            {watched.length > 0 ? (
              <Ul className="results">
                {watched.map((movie) => (
                  <li key={movie.id}>
                    <WatchedMovieCard movie={movie} type="watched" />
                  </li>
                ))}
              </Ul>
            ) : (
              <div>No Movies, in your List</div>
            )}
          </Content>{" "}
        </Container>
      </WrapperContainer>
    </>
  );
};

export default Watched;
