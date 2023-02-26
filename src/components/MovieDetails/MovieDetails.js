import React, { useState, useContext, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { mobile, mobileM, tablet, laptop } from "../../responsive";
import "../videoMovie.scss";
//
// ** context
import { GlobalContext } from "../../context/GlobalState";
import MovieeContext from "../../ContextMovieHandler.js";
//
// icons

import { CgClose } from "react-icons/cg";
//
import Movie from "../Movie";
import { AnimatePresence, motion } from "framer-motion";
//
//
//
const { REACT_APP_TMDB_KEY } = process.env;
const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280";
const defaultImg =
  "https://images.pexels.com/photos/4286932/pexels-photo-4286932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
//
//

//
//

const WrapperVidDescript = styled.div`
  //https://stackoverflow.com/questions/9280258/prevent-body-scrolling-but-allow-overlay-scrolling
  //
  width: 100vw;
  min-height: 100vh;
  //
  position: absolute;
  z-index: 800;
  position: absolute;
  top: 0;
  left: 0;

  /* let it scroll */
  overflow-y: hidden;

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

  //
  //
  ${mobile({
    minHeight: "auto",
    flexDirection: "column-reverse",
    gap: "0.1%",
  })}
  ${mobileM({
    minHeight: "auto",
    flexDirection: "column-reverse",
    gap: "0.1%",
  })}
   ${tablet({
    minHeight: "auto",
    flexDirection: "column-reverse",
    gap: "0.1%",
  })}
     ${laptop({
    minHeight: "auto",
    flexDirection: "column-reverse",
    gap: "0.1%",
  })}
`;
// ----

const ButtonCloseOverlayTrailer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  //
  position: fixed;
  bottom: 2.5%;
  right: 2.5%;
  z-index: 999;

  width: 45px;
  height: 45px;
  border-radius: 100px;
  border: none;
  display: block;
  background-color: #fefefe;
  color: #b6b6b6;
  box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;

  &:hover {
    cursor: pointer;
    background-color: #fafafa;
    color: #282828;
  }
  //
  //
  ${mobile({
    margin: "0 auto",
    right: "10px",
    bottom: "10px",
  })}
  ${mobileM({ right: "15px", bottom: "15px" })}
    ${laptop({ right: "15px", bottom: "15px" })}
`;
//---------

const ContainerDescript = styled.div`
  width: 30%;
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  //
  //
  ${mobile({
    width: "100%",
    minHeight: "98vh",
    //
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  })}
  ${mobileM({
    width: "95%",
    minHeight: "88vh",

    //
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  })}
    ${tablet({
    width: "80%",
    minHeight: "88vh",

    //
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  })}
      ${laptop({
    width: "80%",
    minHeight: "88vh",

    //
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  })}
`;
const MovieTitleModal = styled.h1`
  max-width: 90%;
  min-height: 40%;
  margin-left: 20px;
  padding: 70px 0 10px 0;
  //
  text-align: left;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  font-size: calc(15px + 1.1vmin);
  line-height: calc(30px + 1.1vmin);
  font-weight: 400;

  color: rgba(103, 103, 103, 0.396);

  ${mobile({
    marginLeft: "0",
    textAlign: "center",
    padding: "20px 0 10px 0",

    maxWidth: "250px",

    fontSize: `calc(17px + 1.1vmin)`,
    lineHeight: ` calc(20px + 1.1vmin)`,
  })}
  ${mobileM({
    marginLeft: "0",
    textAlign: "center",
    padding: "20px 0 10px 0",

    maxWidth: "250px",

    fontSize: `calc(17px + 1.1vmin)`,
    lineHeight: ` calc(20px + 1.1vmin)`,
  })}
    ${tablet({
    marginLeft: "0",
    textAlign: "center",
    padding: "20px 0 10px 0",

    maxWidth: "490px",

    fontSize: `calc(17px + 1.1vmin)`,
    lineHeight: ` calc(20px + 1.1vmin)`,
  })}
      ${laptop({
    marginLeft: "0",
    textAlign: "center",
    padding: "20px 0 10px 0",
    maxWidth: "490px",
    fontSize: `calc(17px + 1.1vmin)`,
    lineHeight: ` calc(20px + 1.1vmin)`,
  })}
`;

const LargeDescriptAndBtn = styled.div`
  min-height: 60%;
  padding: 0 0 0 20px;
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

  ${mobileM({
    justifyContent: "center",
    alignItems: "center",
  })}
  ${tablet({
    justifyContent: "center",
    alignItems: "center",
  })}
  ${laptop({
    justifyContent: "center",
    alignItems: "center",
  })}
`;

const PModalMovieDescription = styled.p`
  max-width: 92%;
  padding-top: 20px;
  font-weight: 600;

  letter-spacing: 1px;

  font-size: calc(6px + 1.1vmin);
  line-height: calc(16px + 1.1vmin);
  font-family: "Poppins-Light";
  color: rgba(142, 182, 203, 0.696);

  //
  //
  ${mobile({
    maxWidth: "90%",
    margin: "10px 0 0  0px",

    fontSize: `calc(15px + 1vmin)`,
    lineHeight: `calc(24px + 1vmin)`,
  })}
  ${mobileM({
    maxWidth: "90%",
    margin: "20px 0 0  0px",
    fontSize: `calc(12px + 1vmin)`,
    lineHeight: `calc(22px + 1vmin)`,
  })}
   ${tablet({
    maxWidth: "90%",
    margin: "20px 0 0  0px",
    fontSize: `calc(12px + 1vmin)`,
    lineHeight: `calc(22px + 1vmin)`,
  })}
     ${laptop({
    maxWidth: "70%",
    margin: "20px 0 0  0px",
    fontSize: `calc(10px + 1vmin)`,
    lineHeight: `calc(22px + 1vmin)`,
  })}
`;
//  ** CONTROLS
//
const Controls = styled.div`
  padding: 40px 0 40px 0;
  gap: 50px;
  display: flex;

  justify-content: center;
  align-items: center;
  flex-direction: row;

  //
  //
  //
  ${mobile({
    padding: "35px 0 40px 0",
    alignItems: "flex-start",
    gap: "20px",
  })}
  ${mobileM({
    width: "100%",
    alignItems: "center",
    gap: "30px",
  })}
    ${tablet({
    gap: "40px",

    alignItems: "center",
  })}
      ${laptop({
    gap: "50px",
    alignItems: "center",
  })}
`;

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

  ${mobile({
    fontSize: `calc(8px + 1.1vmin)`,
    padding: "11.5px 12px",
  })}
  ${mobileM({
    fontSize: `calc(8px + 1.1vmin)`,
  })}
    ${laptop({
    fontSize: `calc(4px + 1.1vmin)`,
    padding: "14.5px 16.5px",
  })}
`;
/*














 ---- VIDEO












 */

//
const WrapperVideoTrailerSection = styled.div`
  width: 67%;
  min-height: 100vh;
  height: 60vh;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  ${mobile({
    width: "97%",
    minHeight: "40vh",

    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  })};
  ${mobileM({
    width: "90%",
    minHeight: "40vh",

    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  })};
  ${tablet({
    width: "90%",
    minHeight: "40vh",
    margin: "0 0 20px 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  })};
  ${laptop({
    width: "90%",
    minHeight: "40vh",
    margin: "0 0 20px 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  })};
`;

//
const ContainerVideoTrailerSection = styled.div`
  width: 100%;
  height: 70%;
  overflow: hidden;

  position: relative;
  border-radius: 30px;
  //
  background-position: top center;
  background-repeat: no-repeat;
  background-size: cover;

  transition: all 0.8s ease;

  &:hover {
    background-position: center right;
  }

  ${mobile({
    height: "70%",
  })};
  ${mobileM({ height: "80%" })};
  ${tablet({
    height: "80%",
  })};
  ${tablet({
    height: "100%",
  })};
  ${laptop({
    height: "100%",
  })};
`;

const VideoBoxContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

  ${mobile({
    borderRadius: "0px",
  })};
  ${mobileM({ borderRadius: "0px" })};
  ${tablet({ borderRadius: "30px" })};
`;

const OverlayPlayBtnTrailer = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  /*
  red  0, 100%, 50%,
  black 0, 0%, 2%,

   */
  //
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;

  transition: all 0.8s ease-in-out;

  &::before {
    width: 100%;
    height: 100%;
    content: "";
    position: absolute;
    z-index: 10;
    background-color: ${(props) =>
      props.visibleBg ? "hsla(203, 30%, 73%, 0.452)" : "transparent"};
    opacity: ${(props) => (props.visibleBg ? "1" : "0")};
    transition: all 0.08s ease-in-out;
  }

  &::after {
    width: 100%;
    height: 100%;
    content: "";
    position: absolute;
    z-index: 11;

    background: linear-gradient(
      hsla(0, 0%, 2%, 0) 0%,
      hsla(0, 0%, 2%, 0.002) 9%,
      hsla(0, 0%, 2%, 0.008) 34%,

      hsla(0, 0%, 2%, 0.021) 47%,
      hsla(0, 0%, 2%, 0) 56.5%,
      hsla(0, 0%, 2%, 0) 65%,
      hsla(0, 0%, 2%, 0.123) 73%,
      hsla(0, 0%, 2%, 0.275) 80.2%,
      hsla(0, 0%, 2%, 0.394) 86.1%,
      hsla(0, 0%, 2%, 0.478) 91%,
      hsla(0, 0%, 2%, 0.541) 95.2%,
      hsla(0, 0%, 2%, 0.644) 98.2%,
      hsla(0, 0%, 2%, 0.734) 100%
    );
  }
`;

const ButtonPlayTrailerOverlay = styled.button`
  // visible if not clicked , hidden if clicked
  display: ${(props) => (props.visible ? "block" : "none")};
  opacity: ${(props) => (props.visible ? "1" : "0")};
  transition: all 0.08s ease-in-out;

  //
  position: absolute;
  width: 80px;
  height: 80px;

  //
  font-family: "Material Icons";
  font-size: 24px;
  line-height: 24px;

  //
  background-color: black;
  color: #fff;
  border-radius: 50px;
  border: 3px solid #333;

  //
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  pointer-events: all;
  z-index: 12;

  /*


  */
  &:hover {
    background-color: #282828;
  }
  &:before {
    cursor: pointer;
    content: "play_arrow";
    margin-right: 10px;
    margin: 0 auto;
  }

  &:hover:before {
    cursor: pointer;
    color: #fff;
  }
`;
//
// ** RELEASE AND LANGUAGE
//
const VideoReleaseAndRating = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;

  padding: 10px 0;
  ${mobile({ justifyContent: "center" })};
  ${mobileM({ padding: "12px 0 0 0", justifyContent: "center" })};
  ${tablet({ padding: "12px 0 0 0", justifyContent: "center" })};
  ${laptop({ padding: "12px 0 0 0", justifyContent: "center" })};
`;
const Release = styled.h4`
  margin: 0 10px;
  font-size: calc(6px + 1.1vmin);
  line-height: calc(16px + 1.1vmin);
  font-family: "Poppins-Light";
  color: rgba(142, 182, 203, 0.696);

  span {
    font-weight: 200;
    margin: 0 10px;
  }

  ${mobile({
    fontSize: `calc(8px + 1.1vmin)`,
    lineHeight: ` calc(20px + 1.1vmin)`,
  })};

  ${mobileM({ fontSize: `calc(7px + 1.1vmin)` })};
  ${tablet({ fontSize: `calc(8px + 1.1vmin)` })};
  ${laptop({ fontSize: `calc(10px + 1.1vmin)` })};
`;

//
//
//
//
function MovieDetails() {
  //
  const {
    selectedMovie,
    //
    setVideoId,
    videoId,
    setSelectedMovie,
    //  resize video
  } = useContext(MovieeContext);

  //
  const navigate = useNavigate();

  //
  //
  //1 this productId is coming from the app.js, check it here below:

  const { productId } = useParams();
  //   App.js
  // <Route path="/rainbow/:productId" element={<MovieDetails />} />
  //
  //2 you need a new variable to pass inside the logic of the useEffect
  const [movieNew, setMovieNew] = useState(null);
  //

  useEffect(() => {
    axios
      .get(
        //3 Pass the variable productId coming from the app.js and passed here in step 1, pass it inside the api url like so: /${productId}?
        `https://api.themoviedb.org/3/movie/${productId}?api_key=${REACT_APP_TMDB_KEY}&language=en-US`
      )
      .then((res) => {
        setMovieNew(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productId]);

  //-----------
  //
  //

  // ** -----------   controls
  //

  const { addMovieToWatchlist, watchlist, watched, addMovieToWatched } =
    useContext(GlobalContext);

  //2 here we will search if there is any object that has an idential object id o.id === movie.id
  let storedMovie = watchlist.find(
    (objectMovie) => objectMovie.id === movieNew?.id
  );

  //5
  let storedMovieWatched = watched.find((o) => o.id === movieNew?.id);

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
  // --------------------------------
  //

  //
  //
  //
  const handleCloseModal = (e) => {
    e.preventDefault(e);
    navigate("/");

    //history.push("/ResultCardsHome"); // works

    // history.push(""); // also works -- Go back to the previous URL without the movie ID
    // histor // const handlerShowHideIcon = (logicIcon) => {
    //   if (logicIcon === "showicon") {
    //     setSelectedMovie(movieNew);
    //   } else {
    //     setSelectedMovie(movieNew);
    //   }
    // };
    //y.goBack();
    //
    // setMovies([]);// if you add this, specifically inside the overlay with the movie trailer, you will be send to the home page instead of the resultsCardsHome once you close the overlay.
    //
    //
    // if you don't add this setVideoId(), when you will click in another movie, you will see the same previous video, and not only that, it will be launched without even have to click on "play", which is not good. so kill the process by adding the setVideoId() or setVideoId(null)
    setVideoId();
  };
  //

  //
  const [isVisible, setIsVisible] = useState(true);
  const handleClickBtnplay = (e) => {
    e.preventDefault();
    setSelectedMovie(movieNew);

    setIsVisible(!isVisible);
  };
  /*



  <ButtonPlayTrailerOverlay
                      key={setMovieNew?.id}
                      visible={isVisible}
                      onClick={handleClickBtnplay}
                    />



 */
  // const [styelIcon, setStyleIcon] = useState();
  // const handlerShowHideIcon = (logicIc) => {
  //   if (selectedMovie === "true") {
  //     setSelectedMovie(movieNew);
  //     setStyleIcon("black");
  //   } else {
  //     //     setSelectedMovie(movieNew);
  //     setSelectedMovie(movieNew);
  //     setStyleIcon("white");
  //   }
  // };
  //@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
  return (
    <>
      <WrapperVidDescript>
        <ContainerDescript>
          <MovieTitleModal>{movieNew?.title}</MovieTitleModal>
          <LargeDescriptAndBtn>
            {/*

            BUTTON TO CLOSE movie trailer overlay */}
            <ButtonCloseOverlayTrailer onClick={handleCloseModal}>
              <CgClose />
            </ButtonCloseOverlayTrailer>
            {/*

             BUTTON PLAY

             */}

            <PModalMovieDescription>
              {movieNew?.overview}
            </PModalMovieDescription>
            {/*

             */}
            <Controls>
              <Button
                disabled={watchlistDisabled}
                onClick={() => addMovieToWatchlist(movieNew)}
              >
                add to watchlist
              </Button>

              <Button
                disabled={watchedDisabled}
                onClick={() => addMovieToWatched(movieNew)}
              >
                add to watched
              </Button>
            </Controls>
          </LargeDescriptAndBtn>
        </ContainerDescript>

        {/*

 The video

 */}
        <WrapperVideoTrailerSection>
          <ContainerVideoTrailerSection
            style={
              movieNew?.backdrop_path
                ? {
                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),  url(${BACKDROP_PATH}${movieNew?.backdrop_path})`,
                  }
                : {
                    backgroundImage: ` linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)),  url(${defaultImg})`,
                  }
            }
          >
            <VideoBoxContainer>
              <OverlayPlayBtnTrailer
                visibleBg={isVisible}
                onClick={handleClickBtnplay}
              >
                {isVisible && (
                  <>
                    <ButtonPlayTrailerOverlay
                      key={setMovieNew?.id}
                      visible={isVisible}
                      onClick={handleClickBtnplay}
                    />
                  </>
                )}
              </OverlayPlayBtnTrailer>
              {videoId && (
                <>
                  <Movie />
                </>
              )}
            </VideoBoxContainer>
          </ContainerVideoTrailerSection>

          {/*

        RELEASE

        */}
          <VideoReleaseAndRating>
            <Release>
              release: <span>{movieNew?.release_date}</span>
            </Release>
            <Release>
              {" "}
              language:
              <span>{movieNew?.original_language}</span>
            </Release>
          </VideoReleaseAndRating>
        </WrapperVideoTrailerSection>
      </WrapperVidDescript>
    </>
  );
}

export default MovieDetails;
