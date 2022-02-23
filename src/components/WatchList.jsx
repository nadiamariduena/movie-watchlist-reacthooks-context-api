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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1 {
    padding: 20vh 0 60px 0;
    font-weight: 600;
    font-size: calc(20px + 2vmin);
    font-family: "Poppins-Light";
    color: rgb(189, 212, 197);
  }
`;

const Ul = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  ${mobile({
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
  })}
  ${mobileM({
    flexDirection: "column",
    width: "100%",
  })}
  ${tablet({
    width: "100%",
  })}
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
