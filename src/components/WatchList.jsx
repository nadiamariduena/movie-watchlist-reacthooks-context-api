import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import WatchedMovieCard from "./WatchedMovieCard";
import styled from "styled-components";
import { mobile, mobileM, tablet } from "../responsive";

//
//
//
//
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
  min-height: 4vh;
  padding: 0px 0 20px 0;
  text-align: center;
  h1 {
    padding: 20vh 0 0 0;
    font-weight: 600;
    font-size: calc(20px + 2vmin);
    font-family: "Poppins-Light";
    color: rgb(189, 212, 197);
  }
`;

const Ul = styled.ul`
  padding: 5em 7.5em;
  display: grid;
  grid-gap: 2em;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`;
//

//
//

export const WatchList = () => {
  //
  // Accessing the context here:
  const { watchlist } = useContext(GlobalContext);

  //
  //
  return (
    <>
      <WrapperContainer>
        <Container>
          <Content>
            <h1>My Watchlist</h1>
            {/* ---------  */}
            <span className="count-pill">
              {watchlist.length} {watchlist.length === 1 ? "movie" : "movies"}
            </span>

            {/* -------- */}

            {watchlist.length > 0 ? (
              <Ul className="results">
                {watchlist.map((movie) => (
                  <li key={movie.id}>
                    <WatchedMovieCard movie={movie} type="watchlist" />
                  </li>
                ))}
              </Ul>
            ) : (
              <div>No Movies, in your List</div>
            )}
          </Content>
        </Container>
      </WrapperContainer>
    </>
  );
};
