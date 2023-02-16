import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import MovieControls from "./MovieControls";
import { AnimatePresence, motion } from "framer-motion";
//
//
// ** This is the Card linked to Watchlist **
//

const Container = styled.div`
  /* background-color: pink; */
`;

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
  border: 10px solid #efefef;
  border-radius: 30px;
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
          <AnimatePresence>
            <ImgBox>
              <motion.img
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring" }}
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={`${movie.title} Poster`}
              />
            </ImgBox>
          </AnimatePresence>
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
