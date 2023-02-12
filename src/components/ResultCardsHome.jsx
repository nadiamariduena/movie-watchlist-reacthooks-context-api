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

const WrapperVidDescript = styled.div`
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
  flex-direction: row;

  gap: 1%;
  // **

  background-image: linear-gradient(#e8e4d8 1px, transparent 1px),
    linear-gradient(to right, #e8e4d8 1px, transparent 1px);
  background-size: 39px 39px;
  background-color: #ffffff;
`;
// ----

const ContainerDescript = styled.div`
  width: 30%;
  height: 100vh;
  display: flex;

  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
`;
const MovieTitleModal = styled.h1`
  max-width: 92%;
  min-height: 40%;
  margin-left: 20px;
  //
  text-align: left;
  padding: 70px 0 10px 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  line-height: calc(30px + 1.1vmin);
  font-size: calc(22px + 1.1vmin);
  font-weight: 400;

  color: rgba(103, 103, 103, 0.596);
`;

const LargeDescriptAndBtn = styled.div`
  min-height: 60%;
  margin-left: 20px;
  // ** sticky
  position: sticky;
  position: -webkit-sticky;
  top: 0%;

  overflow: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  flex-direction: column;
`;

const PModalMovieDescription = styled.p`
  max-width: 92%;
  padding-top: 20px;
  font-weight: 600;

  letter-spacing: 1px;
  line-height: calc(14px + 1.1vmin);
  font-size: calc(6px + 1.1vmin);
  font-family: "Poppins-Light";
  color: rgba(142, 182, 203, 0.696);
`;
//  ** CONTROLS
//
const Controls = styled.div`
  /*  */
  padding: 30px 0 30px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  gap: 50px;
`;
const H3 = styled.h3`
  margin: 20px 0 30px 0;
  color: rgba(142, 182, 203, 0.416);
`;
//
//
const Button = styled.button`
  margin-top: 15px;
  padding: 12.5px 25px;

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

// ----

const VideoContainerr = styled.div`
  width: 67%;
  height: 100vh;

  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  /* background-color: green; */
`;

//
const VideoWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(142, 182, 203);

  /*  box-shadow: 6px 6px 12px #ededed, -6px -6px 12px #ffffff; background: rgba(142, 182, 203, 0.106); */
`;

//
// ** outer modal
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
      {openMovieModalee ? (
        <WrapperVidDescript>
          <ContainerDescript>
            <MovieTitleModal>{moviearg.title}</MovieTitleModal>

            <LargeDescriptAndBtn>
              <PModalMovieDescription>
                {moviearg.overview}
              </PModalMovieDescription>{" "}
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
            </LargeDescriptAndBtn>
          </ContainerDescript>

          {/*  */}
          <VideoContainerr>
            <VideoWrapper
              style={{
                // border: "10px solid #ffffff",
                // borderRadius: "50px",
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${moviearg.backdrop_path})`,
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
                backgroundPosition: "top",
              }}
            >
              <div className="poster"></div>
            </VideoWrapper>
          </VideoContainerr>
        </WrapperVidDescript>
      ) : null}

      <Grid>
        <ResultCard>
          <H3 onClick={() => setOpenMovieModalee(!openMovieModalee)}>
            {moviearg.title}
          </H3>

          {moviearg.poster_path ? (
            <ImgBox onClick={() => setOpenMovieModalee(!openMovieModalee)}>
              <img
                src={`https://image.tmdb.org/t/p/w200${moviearg.poster_path}`}
                alt={`${moviearg.title} Poster`}
              />
            </ImgBox>
          ) : null}
        </ResultCard>
      </Grid>
    </>
  );
};

export default ResultCardsHome;
