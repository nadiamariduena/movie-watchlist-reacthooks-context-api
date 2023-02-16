import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
//
import { mobile, mobileM, tablet } from "../responsive";

import styled from "styled-components";
import { motion } from "framer-motion";
//
//
const WrapperContainer = styled.div``;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const H3 = styled.h3`
  padding: 25px 0 25px 0;
  font-weight: 300;
  font-size: calc(8px + 1.1vmin);
  letter-spacing: 1px;
  font-family: "RobotoBlack";
  color: rgba(142, 182, 203, 0.496);
  ${mobile({
    fontSize: `calc(14px + 1.1vmin)`,
  })}
  ${mobileM({
    fontSize: `calc(13px + 1.1vmin)`,
  })}
`;

//
const Content = styled.div`
  color: rgb(189, 212, 197);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 7px;

  /*  */
  .ctrl-btn {
    /*  */
    width: 30px;
    height: 30px;
    font-size: calc(2px + 1.1vmin);
    padding: 5px;

    border-radius: 5rem;
    border: 0;

    @media (max-width: 768px) {
      font-size: calc(8px + 1.1vmin);
    }

    //
    background: rgba(142, 182, 203, 0.196);
    &:hover {
      background: rgba(142, 182, 203, 0.496);
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
          <H3>{movie.title}</H3>
          <Content>
            {type === "watchlist" && (
              <>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  className="ctrl-btn"
                  onClick={() => addMovieToWatched(movie)}
                >
                  <i className="fa-fw far fa-eye"></i>
                </motion.button>
                {/*  */}
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  className="ctrl-btn"
                  onClick={() => removeMovieFromWarchlist(movie.id)}
                >
                  <i className="fa-fw fa fa-times"></i>
                </motion.button>
              </>
            )}
            {/*


EYE AND X to control
            here below we will implement a control that will move the movie
            back to the watchlist

            */}

            {/*  */}
            {type === "watched" && (
              <>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  className="ctrl-btn"
                  onClick={() => movieToWatchlist(movie)}
                >
                  <i className="fa-fw far fa-eye-slash"></i>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  className="ctrl-btn"
                  onClick={() => removeFromWatched(movie.id)}
                >
                  <i className="fa-fw fa fa-times"></i>
                </motion.button>
              </>
            )}
          </Content>
        </Container>
      </WrapperContainer>
    </>
  );
};

export default MovieControls;
