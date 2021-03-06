import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
//
import styled from "styled-components";

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
  //
  //

  const {
    removeMovieFromWarchlist,
    addMovieToWatched,
    movieToWatchlist,
    removeFromWatched,
  } = useContext(GlobalContext);
  //
  //
  return (
    <>
      <WrapperContainer>
        <Container>
          <Content>
            {type === "watchlist" && (
              <>
                <button
                  className="ctrl-btn"
                  onClick={() => addMovieToWatched(movie)}
                >
                  <i className="fa-fw far fa-eye"></i>
                </button>
                {/*  */}
                <button
                  className="ctrl-btn"
                  onClick={() => removeMovieFromWarchlist(movie.id)}
                >
                  <i className="fa-fw fa fa-times"></i>
                </button>
              </>
            )}
            {/* 
            

            here below we will implement a control that will move the movie
            back to the watchlist
            
            */}

            {type === "watched" && (
              <>
                <button
                  className="ctrl-btn"
                  onClick={() => movieToWatchlist(movie)}
                >
                  <i className="fa-fw far fa-eye-slash"></i>
                </button>
                <button
                  className="ctrl-btn"
                  onClick={() => removeFromWatched(movie.id)}
                >
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
