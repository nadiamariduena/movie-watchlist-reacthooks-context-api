## Fetching the movie trailer 🍰

- After changing everything to the **router v6** because i wanted to use **params** to retrieve the individual data, I encountered the same bug i already had:

<br>

> 🔴 The problem is that when I click the play button to launch the trailer, it works and plays the movie, but if I close the overlay and select another movie, the overlay opens with the correct movie description **overview** etc, but if I click the play button with the code mentioned before, it will play the previous movie. However, if I click the play button again, it will play the current movie. [read more](Bug-when-closing-the-movie-trailer-overlay.md)

<br>

### So the bug surfaced again, but this time i had to change the variable, for the variable that is connected to the PARAMS

- once again the solution was the **setVideoId()**

> ⚠️ remember that you have to replace the old variable to the params one (see it in the code below this one)

<br>

## 1)

```javascript
const [closeModi, setCloseModi] = useState(false);

const handleCloseModal = (e) => {
  e.preventDefault(e);
  navigate("/");

  setCloseModi();
  //history.push("/ResultCardsHome"); // works

  // history.push(""); // also works but remember that we are now using routerv6--
  //
  // Go back to the previous URL without the movie ID
  // history.goBack();
  //
  // setMovies([]);// if you add this, specifically inside the overlay with the movie trailer, you will be send to the home page instead of the resultsCardsHome once you close the overlay.
  //
  //
  // if you don't add this setVideoId(), when you will click in another movie, you will see the same previous video, and not only that, it will be launched without even have to click on "play", which is not good. so kill the process by adding the setVideoId() or setVideoId(null)
  setVideoId();
};
//
```

<br>

## 2) replace the variable to the params related

- **setMovieNew** (the params variable)
- **?** (you need the condition, otherwise it wont work)
- **setSelectedMovie** (comes from the provider)

<br>

```javascript
<button
  key={setMovieNew?.id}
  onClick={(e) => (e.preventDefault(), setSelectedMovie(movieNew))}
>
  <HiOutlinePlay />
</button>
```

<br>
<br>

### There is a bug when leaving the movie without terminating the process, it happens when clicking the "watchlist or watched" routes instead of clicking the round button [read more here](2_params_bugWhenLeaving-without-terminating.md)

<br>

- watch the issue 🌈


https://user-images.githubusercontent.com/58809268/220320951-75a07a82-8efb-4c83-83b7-fdd7061f4c09.mp4








<br>
<br>

### The code

```javascript
// ✋ App.js
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// if you remove the fontawesome line from below, the icons in the MovieControls will not be visible
import "./lib/font-awesome/css/all.min.css";
//

import Home from "./components/Home";
import Navigation from "./components/Navigation";
import { WatchList } from "./components/WatchList";
import { Watched } from "./components/Watched";
import Add from "./components/Add";

import ResultCardsHome from "./components/ResultCardsHome";
import { GlobalProvider } from "./context/GlobalState";
import { MoviessProvider } from "./ContextMovieHandler";
import PageNotFound from "./pages/pageNotFound";
//
import MovieDetails from "./components/MovieDetails/MovieDetails";

function App() {
  return (
    <GlobalProvider>
      <MoviessProvider>
        <BrowserRouter>
          <Navigation />
          <div className="page">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/watchlist" element={<WatchList />} />
              <Route path="/watched" element={<Watched />} />
              <Route path="/add" element={<Add />} />
              <Route path="/resultCards" element={<ResultCardsHome />} />

              <Route path="/rainbow/:productId" element={<MovieDetails />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </MoviessProvider>
    </GlobalProvider>
  );
}

export default App;

//
//  ------------
//
//
// ✋ ContextMovieHandler.js
//
//
import { createContext, useState, useCallback, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
//

// coming from the .env
const { REACT_APP_TMDB_KEY } = process.env;
//
const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_TMDB_KEY}&language=en-US&query=`;
//
const VIDEO_URL = `https://api.themoviedb.org/3/movie/movie_id/videos?api_key=${REACT_APP_TMDB_KEY}&language=en-US`;
//
//
const MoviessContext = createContext();
export function MoviessProvider({ children }) {
  //

  //

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [videoId, setVideoId] = useState(null);

  //
  //
  //

  useEffect(() => {
    const fetchMovies = async () => {
      //
      const result = await axios.get(`${API_URL}${query}`);
      setMovies(result.data.results);
    };
    fetchMovies();
  }, [query]);

  //
  //
  // ** fetching the video
  useEffect(() => {
    const fetchVideoId = async () => {
      //
      if (!selectedMovie) {
        return;
      }
      const result = await axios.get(
        `${VIDEO_URL.replace("movie_id", selectedMovie.id)}`
      );
      // setVideoId(result.data.results[0].key);
      if (result.data.results[0]) {
        setVideoId(result.data.results[0].key);
      }
    };
    fetchVideoId();
  }, [selectedMovie]);

  //
  // -------- video size
  // const iframeRef = useRef<HTMLIFrameElement>(null);
  // since we I already have the state in line 20, you can add it inside the url path, the add this value to the new variable, this videoURL variable will carry the data that you will pass in line 134, from there you will send it to the Movie.js component
  const videoURL = `https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://localhost:1535/"
  frameborder="0"`;
  // // try to publish
  // //
  const iframeRef = useRef();
  // ** default height
  // change this depending of the project you have
  const defaultHeight = 695;
  //
  const [videoHeight, setVideoHeight] = useState(
    iframeRef.current ? iframeRef.current.offsetWidth * 0.5625 : defaultHeight
  );
  //
  //
  //
  const handleChangeVideoWidth = useCallback(() => {
    const ratio =
      window.innerWidth > 990
        ? 1.0
        : window.innerWidth > 522
        ? 1.2
        : window.innerWidth > 400
        ? 1.45
        : 1.85;
    const height = iframeRef.current
      ? iframeRef.current.offsetWidth * 0.5625
      : defaultHeight;
    return setVideoHeight(Math.floor(height * ratio));
  }, []);

  //
  //
  useEffect(() => {
    window.addEventListener("resize", handleChangeVideoWidth);
    const ratio =
      window.innerWidth > 990
        ? 1.0
        : window.innerWidth > 522
        ? 1.2
        : window.innerWidth > 400
        ? 1.45
        : 1.85;
    const height = iframeRef.current
      ? iframeRef.current.offsetWidth * 0.5625
      : defaultHeight;
    setVideoHeight(Math.floor(height * ratio));
    return function cleanup() {
      window.removeEventListener("resize", handleChangeVideoWidth);
    };
  }, [videoHeight, handleChangeVideoWidth]);

  return (
    //

    //
    <MoviessContext.Provider
      value={{
        query,
        setQuery,
        movies,
        setMovies,
        //
        selectedMovie,
        setSelectedMovie,

        videoId,
        setVideoId,
        //

        //

        //
        //  resize video
        videoHeight,
        setVideoHeight,
        iframeRef,
        videoURL,
        // removeItem,
      }}
    >
      {children}
    </MoviessContext.Provider>
  );
}
export default MoviessContext;


//  ------------
//
//
// ✋ add.js
//  ------------
//
//
import React, { useState, useContext } from "react";
import MovieesContext from "../ContextMovieHandler.js";
import { Link, useNavigate, useLocation } from "react-router-dom";

//
import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import Movie from "./Movie.js";
import ResultCards from "./ResultCardsHome";
import { mobile, mobileM, tablet, laptop } from "../responsive";

//
//
const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280";
const defaultImg =
  "https://images.pexels.com/photos/4286932/pexels-photo-4286932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
//
//
//

const AddPage = styled.div``;
const ClickableOverlay = styled.div`
  width: 100vw;
  min-height: 150vh;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  cursor: pointer;

  //

  background-image: linear-gradient(#e8e4d8 1px, transparent 1px),
    linear-gradient(to right, #e8e4d8 1px, transparent 1px);
  background-size: 39px 39px;
  background-color: #ffffff;
`;

//
const Ul = styled.ul`
  padding: 100px 100px 0px 100px;
  margin: 30px auto 0 auto;
  width: 80%;

  grid-template-columns: repeat(4, 1fr);
  display: grid;
  grid-gap: 2.8em;

  //
  background-color: #fefefe;
  border-radius: 50px;

  position: absolute;
  top: 12%;
  left: 10.5%;
  z-index: 10;

  ${mobile({
    left: "0",
    width: "100%",
    gridTemplateColumns: `repeat(1, 1fr)`,
    padding: "100px 0px 180px 0px",
    gridGap: "0.9em",
    // background: "red",
  })}
  ${mobileM({
    left: "2.5%",
    width: "90%",
    gridTemplateColumns: `repeat(2, 1fr)`,
    padding: "100px 15px 180px 15px",
    gridGap: "0.9em",
  })}
${tablet({
    width: "85%",
    left: "4.5%",
    gridTemplateColumns: `repeat(3, 1fr)`,
    padding: "100px 20px 180px 20px",
    gridGap: "1.8em",
  })}
${laptop({
    width: "85%",
    gridTemplateColumns: `repeat(3, 1fr)`,
    padding: "100px 20px 180px 20px",
    gridGap: "2.5em",
  })}
`;
//
//

const Input = styled.input`
  padding: 18px 26px;
  border-radius: 5rem;
  border: 0;
  text-align: center;
  font-size: calc(2px + 1vmin);
  //
  background-color: rgba(251, 251, 251, 2.196);
  color: rgba(87, 87, 87, 0.4);

  // ** border btn input
  border: 2px solid rgba(248, 248, 248, 0.196);
  border-left: 3px solid rgba(248, 248, 248, 0.496);
  border-right: 3px solid rgba(248, 248, 248, 0.496);

  &:hover {
    -webkit-box-shadow: 28.5px 3px 26.5px 6.5px #f1f1f1;
    -moz-box-shadow: 28.5px 3px 26.5px 6.5px #f1f1f1;
    box-shadow: 28.5px 3px 26.5px 6.5px #f1f1f1;
  }

  transition: all 0.8s ease-in-out;

  -webkit-box-shadow: -1px 8px 32px 1px #e4e4dd;
  -moz-box-shadow: -1px 8px 32px 1px #e4e4dd;
  box-shadow: -1px 8px 32px 1px #e4e4dd;

  //
  &:focus-within {
    background-color: rgba(248, 248, 248);
    font-size: calc(2px + 1vmin);
  }
  &::placeholder {
    color: rgba(87, 87, 87, 0.2);
    letter-spacing: 1px;
    font-size: calc(8px + 1vmin);
  }

  ${mobile({
    padding: "16px 10px",
    fontSize: `calc(8px + 1vmin)`,

    "&::placeholder": { fontSize: `calc(10px + 1vmin)` },
  })}
  ${mobileM({
    padding: "16px 10px",
    fontSize: `calc(8px + 1vmin)`,
    "&::placeholder": { fontSize: `calc(10px + 1vmin)` },
  })}
`;
const ButtonCloseOverlay = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  //
  position: fixed;
  bottom: 2.5%;
  right: 2.5%;
  z-index: 10;

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
`;
//---------
//
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
//    ----------

const Add = () => {
  //
  const {
    query,
    setQuery,
    movies,
    setMovies,
    //video trailer
  } = useContext(MovieesContext);

  //
  // const navigate = useNavigate();
  // let location = useLocation();
  //
  // ** button remove
  const removeItem = (e) => {
    e.preventDefault(e);
    // navigate.push("/");
    setQuery("");
    setMovies([]);
    // console.log(location);
    // setVideoId();
  };
  //

  return (
    <>
      <AddPage>
        <Input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {movies.length > 0 ? (
          <>
            <Link to="/">
              <ClickableOverlay onClick={removeItem} />
            </Link>
            <Ul
              style={{ zIndex: "700", pointerEvents: "all" }}
              className="results"
            >
              {movies.map((moviearg) => (
                <li key={moviearg.id}>
                  <Link to={`/rainbow/${moviearg.id}`}>
                    {/* <p>{moviearg.title} </p> */}

                    <Grid>
                      <ResultCard>
                        {moviearg.poster_path ? (
                          <>
                            <ImgBox>
                              <img
                                // defaultImg
                                src={
                                  moviearg.poster_path
                                    ? `https://image.tmdb.org/t/p/w200${moviearg.poster_path}`
                                    : defaultImg
                                }
                                alt={`${moviearg.title} Poster`}
                              />
                            </ImgBox>
                          </>
                        ) : null}
                      </ResultCard>
                    </Grid>
                  </Link>

                  {/* <ResultCards
                    // useHISTORY

                    //
                    moviearg={moviearg}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    videoId={videoId}
                    setVideoId={setVideoId}
                  /> */}
                </li>
              ))}
            </Ul>

            <ButtonCloseOverlay
              //  onClick={() => setMovies(!movies)}
              onClick={removeItem}
            >
              <CgClose />
            </ButtonCloseOverlay>
          </>
        ) : null}
      </AddPage>
    </>
  );
};
//
export default Add;

//
//  ------------
//
//
// ✋ MovieDetails.js
//
//
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
import { HiOutlinePlay } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
//
import Movie from "../Movie";
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
  position: fixed;
  z-index: 800;
  top: 0px;
  left: 0px;

  /*  */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  gap: 1%;
  // **

  /* background-image: linear-gradient(#e8e4d8 1px, transparent 1px),
    linear-gradient(to right, #e8e4d8 1px, transparent 1px);
  background-size: 39px 39px;
  background-color: #ffffff; */
  background-color: lavender;
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
  z-index: 10;

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
`;
//---------

const ContainerDescript = styled.div`
  width: 30%;
  height: 100vh;
  display: flex;

  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
`;
const MovieTitleModal = styled.h1`
  max-width: 90%;
  min-height: 40%;
  margin-left: 20px;
  //
  text-align: left;
  padding: 70px 0 10px 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  font-size: calc(15px + 1.1vmin);
  line-height: calc(30px + 1.1vmin);
  font-weight: 400;

  color: rgba(103, 103, 103, 0.396);
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

  font-size: calc(6px + 1.1vmin);
  line-height: calc(16px + 1.1vmin);
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
  justify-content: flex-start;
  align-items: flex-start;
`;

//
const VideoBoxWrapper = styled.div`
  width: 100%;
  height: 70%;
  overflow: hidden;

  /*  box-shadow: 6px 6px 12px #ededed, -6px -6px 12px #ffffff; background: rgba(142, 182, 203, 0.106); */
`;
const VideoBoxContainer = styled.div`
  width: 100%;
  height: 100%;
  background-position: bottom right;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  transition: all 0.8s ease;

  &:hover {
    background-position: center right;
  }
`;

//
//

function MovieDetails() {
  //
  const {
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
  const [closeModi, setCloseModi] = useState(false);

  const handleCloseModal = (e) => {
    e.preventDefault(e);
    navigate("/");

    setCloseModi();
    //history.push("/ResultCardsHome"); // works

    // history.push(""); // also works -- Go back to the previous URL without the movie ID
    // history.goBack();
    //
    // setMovies([]);// if you add this, specifically inside the overlay with the movie trailer, you will be send to the home page instead of the resultsCardsHome once you close the overlay.
    //
    //
    // if you don't add this setVideoId(), when you will click in another movie, you will see the same previous video, and not only that, it will be launched without even have to click on "play", which is not good. so kill the process by adding the setVideoId() or setVideoId(null)
    setVideoId();
  };
  //

  //
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
            <button
              key={setMovieNew?.id}
              onClick={(e) => (e.preventDefault(), setSelectedMovie(movieNew))}
            >
              <HiOutlinePlay />
            </button>
            <PModalMovieDescription>
              {movieNew?.overview}
            </PModalMovieDescription>
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






         */}
        <VideoContainerr>
          <VideoBoxWrapper>
            <VideoBoxContainer
              style={
                // if there is an img in the API related to the movie, show the BACKDROP_PATH, if not show the img inside the url(${defaultImg})`
                movieNew?.backdrop_path
                  ? {
                      backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),  url(${BACKDROP_PATH}${movieNew?.backdrop_path})`,
                    }
                  : {
                      backgroundImage: ` linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)),  url(${defaultImg})`,
                    }
              }
            >
              <div>
                {videoId && (
                  <>
                    <Movie />
                  </>
                )}
              </div>
            </VideoBoxContainer>
          </VideoBoxWrapper>
        </VideoContainerr>
      </WrapperVidDescript>
    </>
  );
}

export default MovieDetails;

//
//  ------------
// ✋ HOME
//

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { mobile, mobileM, tablet, laptop } from "../responsive";
import styled from "styled-components";
import Add from "./Add";
import SvgGradientCenter from "./SvgGradientCenter";
import SvgGradientTop from "./SvgGradientTop";
import SvgGradientRight from "./SvgGradientRight";

import svgAnillos from "../img/anillos.svg";

//
// https://dev.to/darthknoppix/animate-styled-components-with-framer-motion-2202

const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 20px, rgba(0,0,0,1) 20px, rgba(0,0,0,1) 20px)`;
// 20px size of the blind, you can add a conditional in this file so that the blinds are thinner in small devices, as 20px to 30px is too much for mobile, 15px is okay
//
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 20px)`;

//

const WrapperSectionHome = styled.div`
  position: relative;
  width: 100vw;
  height: auto;
  /* dont add overflow here, as it will block the overlay on the results movies */
`;

const WrapperContainer = styled.div`
  width: 100vw;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const HeroWrapperHome = styled.div`
  z-index: 100;

  //
  /* -webkit-box-shadow: inset -1px 1px 32px 24.5px #282828;
  -moz-box-shadow: inset -1px 1px 32px 24.5px #282828;
  box-shadow: inset -1px 1px 32px 24.5px #282828; */

  // ** squared pattern
  background-image: linear-gradient(#fafafa2b 1px, transparent 1px),
    linear-gradient(to right, #fafafa2b 1px, transparent 1px);
  background-size: 39px 39px;

  width: 80%;
  height: 70%;
  margin-top: 70px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  //

  ${mobile({
    marginTop: "20px",
    width: "98%",
    flexFlow: "column wrap-reverse",
    padding: "100px 10px",
    height: "auto",
  })}
  ${mobileM({
    marginTop: "70px",
    width: "98%",
    flexFlow: "column wrap-reverse",
    padding: "100px 10px",
    height: "auto",
  })}
  ${tablet({
    marginTop: "70px",
    width: "98%",
    flexFlow: "column wrap-reverse",
    padding: "100px 10px",
    height: "auto",
  })}
    ${laptop({
    marginTop: "70px",
    width: "90%",
    flexFlow: "column wrap-reverse",
    padding: "100px 10px",
    height: "auto",
  })} //

  /* overflow: hidden; */
`;

const HeroContainerRight = styled.div`
  /*  -webkit-box-shadow: inset 1.5px 0 32px 22px #ffffff;
   -moz-box-shadow: inset 1.5px 0 32px 22px #ffffff;
  box-shadow: inset 1.5px 0 32px 22px #ffffff;
  background-color: #fefefe; */
  //

  width: 50%;
  padding-left: 92px;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

  ${mobile({
    display: "flex",
    width: "100%",
    padding: "40px 5px",
    minHeight: "80vh",
  })}
  ${mobileM({
    display: "flex",
    width: "95%",
    padding: "40px 5px",
    minHeight: "90vh",
    // background: "greenyellow",
  })}
    ${tablet({
    display: "flex",
    width: "85%",
    padding: "70px 5px 20px 5px ",
    minHeight: "auto",
  })}
  ${laptop({
    display: "flex",
    width: "70%",
    padding: "70px 5px 20px 5px ",
    minHeight: "70vh",

    justifyContent: "flex-start",
  })}
`;
const HeroContainerLeft = styled.div`
  width: 48%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  //
  background-image: url(${svgAnillos});
  background-repeat: no-repeat;

  //

  /* position: relative;
  overflow: hidden;
  background-color: olive;

   &::before {
    width: 100%;
    height: 100%;
    content: "";
    position: absolute;
    //
    background-image: linear-gradient(
      95deg,
      rgba(255, 95, 33, 0.2),
      rgba(0, 66, 228, 0.2),
      rgba(255, 95, 33, 0.2)
    );
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
  }
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  } */

  ${mobile({
    display: "flex",
    width: "100%",
    padding: "40px 0",
    borderRadius: "30px",
  })}
  ${mobileM({
    display: "flex",
    width: "92%",
    padding: "40px 0",
    minHeight: "auto",

    borderRadius: "30px",
  })}
  ${tablet({
    display: "flex",
    width: "80%",
    padding: "40px 0",
    minHeight: "auto",

    borderRadius: "30px",
  })}
    ${laptop({
    display: "flex",
    width: "70%",
    padding: "40px 0",
    minHeight: "auto",

    borderRadius: "30px",
  })}
`;

const H1 = styled.h1`
  font-family: "Syncopate-Bold";
  /* color: rgb(248, 248, 248); */
  color: #1f18c0;
  color: red;

  font-size: calc(58px + 1vmin);
  line-height: calc(62px + 1vmin);
  margin-bottom: 10px;
  ${mobile({ fontSize: `calc(44px + 1vmin)`, paddingTop: "100px 0 0 0" })}

  ${tablet({
    fontSize: `calc(74px + 1vmin)`,
    lineHeight: `calc(124px + 1vmin)`,
  })}
`;
const H2 = styled.h2`
  color: rgb(228, 228, 221, 0.9);

  font-size: calc(48px + 1vmin);
  line-height: calc(50px + 1vmin);

  word-wrap: break-word;
  //
  //
  ${mobile({
    maxWidth: "90%",
    wordWrap: "break-word",
    marginTop: "70px 0 0 0",
    fontSize: `calc(40px + 1vmin)`,
    lineHeight: `calc(45px + 1vmin)`,
  })}
  ${mobileM({
    maxWidth: "90%",
    wordWrap: "break-word",

    fontSize: `calc(46px + 1vmin)`,
    lineHeight: `calc(45px + 1vmin)`,
  })}
    ${tablet({
    maxWidth: "90%",
    wordWrap: "break-word",

    fontSize: `calc(48px + 1vmin)`,
    lineHeight: `calc(52px + 1vmin)`,
  })}
`;
const P = styled.p`
  margin: 35px 0 55px 0;
  max-width: 550px;
  word-wrap: break-word;
  font-size: calc(10px + 1vmin);
  line-height: calc(19px + 1vmin);
  color: rgba(87, 87, 87, 0.4);

  ${mobile({
    maxWidth: "90%",
    fontSize: `calc(13px + 1vmin)`,
    lineHeight: `calc(22px + 1vmin)`,
  })}
  ${mobileM({
    maxWidth: "85%",
    wordWrap: "break-word",
    fontSize: `calc(14px + 1vmin)`,
    lineHeight: `calc(22px + 1vmin)`,
  })}
   ${tablet({
    maxWidth: "80%",
    fontSize: `calc(13px + 1vmin)`,
    lineHeight: `calc(22px + 1vmin)`,
  })}
`;

//
//https://images.unsplash.com/photo-1535979014625-490762ceb2ff?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=MnwzNjMxMDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzYxOTExMzE&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1080
//
const Home = () => {
  // const { movies, randomImage, setRandomImage } = useContext(MovieeContext);

  //
  //
  const [randomImgHome, setRandomImgHome] = useState("");

  useEffect(() => {
    const ImagesRandomHome = [
      // ghost
      "https://i.guim.co.uk/img/media/31dbbedbf1101828aca84a0211cfadb57fa1e366/0_141_3945_2367/master/3945.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=ce0c3fcd5f988ee68759b7a6d9d2cae3",
      // tenet
      "https://rare-gallery.com/uploads/posts/343166-Tenet-2020-Movie-Poster-John-David-Washington.jpg",
    ];

    const randomIndexImg = Math.floor(Math.random() * ImagesRandomHome.length);
    setRandomImgHome(ImagesRandomHome[randomIndexImg]);
  }, []);

  //
  // ** Framer
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  //
  return (
    <>
      <WrapperSectionHome>
        {/* <SvgGradientTop /> */}
        <SvgGradientCenter />
        {/* <SvgGradientRight /> */}

        <WrapperContainer>
          <HeroWrapperHome>
            <HeroContainerLeft
              as={motion.div}
              initial={false}
              animate={
                isLoaded && isInView
                  ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
                  : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
              }
              transition={{ duration: 0.2, delay: 0.1 }}
              viewport={{ once: true }}
              onViewportEnter={() => setIsInView(true)}
            >
              <svg
                onLoad={() => setIsLoaded(true)}
                // shadow img
                // https://css-tricks.com/adding-shadows-to-svg-icons-with-css-and-svg-filters/
                style={{
                  filter: "drop-shadow(3px 5px 20px rgb(0 0 0 / 0.3))",
                }}
                className="svgBox"
                id="10015.io"
                viewBox="0 0 480 480"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <defs>
                  <clipPath id="blob">
                    <path
                      fill="#474bff"
                      d=" M220,422.09456541837426C261.00959093341237,421.7066504474001,240.94212856858982,337.9030224056536,274.28498148423387,314.0243460186288C302.41328436761745,293.8800997068984,360.5925605645113,341.0619763298557,376.2378217361627,310.2039484369743C392.3818753848988,278.36212410875254,336.13005541710197,252.76629487420774,321.95605933346087,220C314.5830126315018,202.95558846410836,323.8538093199914,181.4579918543012,313.7928315834878,165.84868343721612C303.8331832479769,150.39658457900677,282.40118239789393,148.202519945664,268.17444268570404,136.55941764204584C250.42554697111237,122.03379808606462,240.4768877238593,99.41928181848948,220,89.08903536852449C192.66836931634458,75.30068605250003,153.59934858892734,46.05776669759314,132.22985787957447,67.97765445988169C107.36168761828834,93.48633449324785,155.12038327049052,141.42843455924682,138.33919550967917,172.8531125452718C122.49143382802949,202.52984429653068,56.65687852719071,186.82772538352972,51.047943287412636,219.99999999999997C45.94837045880049,250.15981163371472,97.17221551238029,257.76615120146096,120.67070871807393,277.34779306003463C135.85586110611192,290.001805086575,153.93465004633907,298.75890028352256,165.118837080663,315.05696255475664C188.19886283082354,348.6901355107685,179.21116513812913,422.480392229405,220,422.09456541837426"
                    />
                  </clipPath>
                </defs>

                <image
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  clipPath="url(#blob)"
                  xlinkHref={randomImgHome}
                  preserveAspectRatio="xMidYMid slice"
                ></image>
              </svg>
            </HeroContainerLeft>

            <HeroContainerRight>
              <H1>MUBII</H1>
              <H2>the ultimate online</H2>
              <H2>platform for movie enthusiasts</H2>

              <P>
                We understand the importance of convenience when it comes to
                watching movies and TV shows, which is why we offer a seamless
                streaming experience.
              </P>
              {/* SEARCH */}
              <Add />
            </HeroContainerRight>
          </HeroWrapperHome>
        </WrapperContainer>
      </WrapperSectionHome>
    </>
  );
};

export default Home;

/*


     -webkit-mask-image: radial-gradient(red, transparent 70%);
    mask-image: radial-gradient(red, transparent 70%);

    //   ----------
       mask-image: radial-gradient(at 25%, red, transparent 70%);
  //   ----------
    mask-image: radial-gradient(
      at 25%,
      red,
      #{rgba(red, 0.2)}50%,
      transparent 70%
    );
    //
    mask-image: radial-gradient(
      at 20%,
      hsla(39, 24%, 91%, 0.129),
      hsla(39, 24%, 91%, 0.245) 34%,
      hsla(40, 23%, 91%, 0.228) 47%,
      hsla(40, 23%, 91%, 0.218) 56.5%,
      hsla(40, 23%, 91%, 0.218) 65%,
      hsla(40, 23%, 91%, 0.218) 73%,
      hsla(40, 23%, 91%, 0.118) 80.2%,
      hsla(40, 23%, 91%, 0.118) 86.1%,
      hsla(40, 23%, 91%, 0.123) 91%,
      hsla(40, 23%, 91%, 0.123) 95.2%,
      hsla(40, 23%, 91%, 0.123) 98.2%,
      hsla(40, 23%, 91%, 0) 100%,
      transparent 20%
    );

*/

```
