import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import MovieControls from "./MovieControls";
import { motion } from "framer-motion";
//
//
// ** This is the Card linked to Watchlist **
//

const Container = styled.div``;
const ResultCard = styled.div`
  padding: 10px;

  ${mobile({
    padding: "20px 10px",
  })}
`;
const ImgBox = styled.div`
  margin: 10px 0 40px 0;
  width: 100%;
  position: relative;
  overflow: hidden;

  box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff;

  background-color: red;
  border-radius: 30px;

  &::after {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    //
    width: 100%;
    height: 100%;
    content: "";
    position: absolute;
    z-index: 59;
    background-color: hsla(203, 30%, 73%, 0.452);
  }
  //
  img {
    display: block;
    width: 100%;
    min-height: auto;
    object-fit: cover;
  }
  ${mobile({
    border: "5px solid #efefef",
  })}
`;
//

//
//null}
//
const WatchedMovieCard = ({ movie, type }) => {
  return (
    <Container>
      <ResultCard>
        {movie.poster_path ? (
          <ImgBox

          // initial={{
          //   y: 200,
          //   opacity: 0,
          // }}
          // animate={{ y: 0, opacity: 1 }}
          // transition={{ delay: 0.08, type: "spring", damping: 12 }}
          >
            <motion.img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={`${movie.title} Poster`}
            />
          </ImgBox>
        ) : null}
        {/* controls */}
        <MovieControls type={type} movie={movie} />
      </ResultCard>
    </Container>
  );
};

export default WatchedMovieCard;

/*


 {movie.poster_path ? (
          <ImgBox>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={`${movie.title} Poster`}
            />
          </ImgBox>
        ) : (
          <div className="filler-poster"></div>
        )}

*/
