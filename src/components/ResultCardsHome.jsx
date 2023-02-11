import React, { useState, useContext, useEffect } from "react";
import { mobile, mobileM, tablet, laptop } from "../responsive";
import "./videoMovie.scss";
import { GlobalContext } from "../context/GlobalState";
import styled from "styled-components";
import Youtube from "react-youtube";

//
const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280";
const { REACT_APP_TMDB_KEY } = process.env;
const IMAGE_PATH = "https://image.tmdb.org/t/p/w342";

//

//
const Container = styled.div`
  position: relative;
`;

const ModalPoster = styled.div`
  width: 100vw;
  min-height: 100vh;
  position: fixed;
  z-index: 12;
  top: 0px;
  left: 0px;

  /*  */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background-color: lavender;
`;
const VideoContainerr = styled.div`
  width: 60vw;
  height: 70vmin;

  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  /* background-color: green; */
`;

//
const VideoWrapper = styled.div`
  border-radius: 30px;
  width: 60vw;
  height: 65vmin;

  box-shadow: 6px 6px 12px #ededed, -6px -6px 12px #ffffff;
  /* background: rgba(142, 182, 203, 0.106); */
`;

const MovieTitleModal = styled.h1`
  text-align: right;
  padding: 30px 0 10px 0;
  color: rgba(142, 182, 203, 0.496);
`;
const PModalMovieDescription = styled.p`
  padding: 20px 0 10px 0;
  font-weight: 300;
  max-width: 1000px;
  letter-spacing: 1px;
  line-height: calc(14px + 1.1vmin);
  font-size: calc(6px + 1.1vmin);
  font-family: "Poppins-Light";
  color: #282828;
`;

//

const Grid = styled.div``;
const ResultCard = styled.div`
  padding: 20px;

  text-align: center;
  width: 100%;
  height: auto;
  border-radius: 30px;
`;
const ImgBox = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  border: 8px solid #efefef;

  box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff;
  border-radius: 30px;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #a5a5a541;
    display: block;

    //
  }

  img {
    display: block;
    width: 100%;
    min-height: auto;
    object-fit: cover;
    //
  }
`;
//

//  ** CONTROLS
//
const Controls = styled.div`
  /* background: purple; */
  padding: 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const H3 = styled.h3`
  margin: 50px 0 0 0;
  color: rgba(142, 182, 203, 0.416);
`;
//
//
const Button = styled.button`
  margin-top: 15px;
  padding: 12.5px 25px;

  position: relative;
  overflow: hidden;
  z-index: 1;

  //

  border-radius: 30em;
  color: rgba(142, 182, 203, 0.496);
  border-top: 3px solid rgba(142, 182, 203, 0.296);
  border-left: 3px solid rgba(142, 182, 203, 0.296);
  border-bottom: 3px solid rgba(142, 182, 203, 0.196);
  border-right: 3px solid rgba(142, 182, 203, 0.196);

  /*  */
  box-shadow: 6px 6px 12px #ededed, -6px -6px 12px #ffffff;
  background: #fafafa;

  text-transform: capitalize;
  font-size: calc(4px + 1vmin);
  font-weight: 500;

  &:disabled {
    background-color: rgba(142, 182, 203, 0.116);
    color: #b6b6b6;
  }
  &:hover {
    cursor: pointer;
    background-color: #fafafa;
    color: #b6b6b6;
  }

  ${mobile({ padding: "18.5px 28px", fontSize: `calc(9px + 1.1vmin)` })}
  ${mobileM({
    fontSize: `calc(8px + 1.1vmin)`,
  })}
`;

const ResultCardsHome = ({ moviearg }) => {
  //
  //1 not duplication
  const { addMovieToWatchlist, watchlist, watched, addMovieToWatched } =
    useContext(GlobalContext);

  //2 here we will search if there is any object that has an idential object id o.id === movie.id
  let storedMovie = watchlist.find(
    (objectMovie) => objectMovie.id === moviearg.id
  );

  //5
  let storedMovieWatched = watched.find((o) => o.id === moviearg.id);

  /*


  */
  //3 and 6 disabled the possibility to duplicate a movie in the watchlist

  const watchlistDisabled = storedMovie
    ? true
    : storedMovieWatched
    ? true
    : false;
  /*
 this is going to be disabled if we have a movie inside the
  watchlist, so if we have a similar movie in the watchlist
  it s going to be true, which means it s going to disabled
  the option to save it the same for the storedMovieWatched, but if it s false, meaning that we
  dont have a similar movie in the watched list, then it s going
  to show the option to save the movie as it will mean its false

 */

  //7 related to the 2 buttons
  const watchedDisabled = storedMovieWatched ? true : false;

  //
  //
  const [openMovieModalee, setOpenMovieModalee] = useState(false);

  return (
    <>
      <Container>
        {openMovieModalee ? (
          <ModalPoster>
            <VideoContainerr>
              <VideoWrapper
                style={{
                  border: "10px solid #ffffff",
                  borderRadius: "50px",
                  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${moviearg.backdrop_path})`,
                }}
              >
                <div className="poster"></div>
              </VideoWrapper>
            </VideoContainerr>

            <MovieTitleModal>{moviearg.title}</MovieTitleModal>
            <PModalMovieDescription>{moviearg.overview}</PModalMovieDescription>

            {/* <span className={"brand"}>
              Movie Trailer sssssssssssssssssssApp
            </span> */}
          </ModalPoster>
        ) : null}
        <Grid>
          <ResultCard>
            {/* if there is a path with an img, then show if not dont show anything */}
            {moviearg.poster_path ? (
              <ImgBox onClick={() => setOpenMovieModalee(!openMovieModalee)}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${moviearg.poster_path}`}
                  alt={`${moviearg.title} Poster`}
                />
              </ImgBox>
            ) : null}
            {/*
            <H3 onClick={() => setOpenMovieModalee(!openMovieModalee)}>
              {moviearg.title}
            </H3> */}

            <Controls>
              <Button
                disabled={watchlistDisabled}
                onClick={() => addMovieToWatchlist(moviearg)}
              >
                add to watchlist
              </Button>

              <Button
                disabled={watchedDisabled}
                onClick={() => addMovieToWatched(moviearg)}
              >
                add to watched
              </Button>
            </Controls>
          </ResultCard>
        </Grid>
      </Container>
    </>
  );
};

export default ResultCardsHome;
