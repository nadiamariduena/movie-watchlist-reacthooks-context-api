import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import MovieControls from "./MovieControls";
//
//
// ** This is the Card linked to Watchlist **
//

const Container = styled.div``;

const Grid = styled.div``;
const ResultCard = styled.div`
  padding: 10px;
  /* background: #f8f8f8c5; */
  ${mobile({
    padding: "5px",
  })}
`;
const ImgBox = styled.div`
  width: 100%;

  img {
    margin: 10px 0 10px 0;
    width: 100%;
    min-height: auto;
    object-fit: cover;
    /* border-radius: 5rem; */
  }
`;
//

//
//
//
const WatchedMovieCard = ({ movie, type }) => {
  return (
    <Container>
      <Grid>
        <ResultCard>
          {movie.poster_path ? (
            <ImgBox>
              {" "}
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={`${movie.title} Poster`}
              />
            </ImgBox>
          ) : (
            <div className="filler-poster"></div>
          )}
          {/* controls */}
          <MovieControls type={type} movie={movie} />
        </ResultCard>
      </Grid>
    </Container>
  );
};

export default WatchedMovieCard;
