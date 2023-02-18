I made some changes just to see if i could get the url change, it worked but some how i cannot get the movie url id

<br>

- so here is the previous version before changes, at least the important components

```javascript
import { createContext, useState, useCallback, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
//

// coming from the .env
const { REACT_APP_TMDB_KEY } = process.env;
//
const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_TMDB_KEY}&language=en-US&query=`;
const VIDEO_URL = `https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=${REACT_APP_TMDB_KEY}&language=en-US`;
//
//
const MoviessContext = createContext();
export function MoviessProvider({ children }) {
  //

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
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
        `${VIDEO_URL.replace("{movie_id}", selectedMovie.id)}`
      );
      // setVideoId(result.data.results[0].key);
      if (result.data.results[0]) {
        setVideoId(result.data.results[0].key);
      }
    };
    fetchVideoId();
  }, [selectedMovie]);
  //
  // const history = useHistory();
  // //
  // // ** button remove
  // const removeItem = (e) => {
  //   e.preventDefault(e);
  //   // history.push("/Watched");
  //   setQuery("");
  //   setMovies([]);

  //   // setVideoId();
  // };
  //
  //
  // -------- video size
  // const iframeRef = useRef<HTMLIFrameElement>(null);
  // since we I already have the state in line 20, you can add it inside the url path, the add this value to the new variable, this videoURL variable will carry the data that you will pass in line 134, from there you will send it to the Movie.js component
  const videoURL = `https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://localhost:1535/"
  frameborder="0"`;
  // try to publish
  //
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
  /*
  */

  return (
    //

    //
    <MoviessContext.Provider
      value={{
        query,
        setQuery,
        movies,
        setMovies,
        selectedMovie,
        setSelectedMovie,

        videoId,
        setVideoId,
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













---------------------


----------------------





import React, { useState, useContext } from "react";
import MovieeContext from "../ContextMovieHandler.js";
import { Link, useHistory } from "react-router-dom";

//
import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import Movie from "./Movie.js";
import ResultCards from "./ResultCardsHome";
import { mobile, mobileM, tablet, laptop } from "../responsive";

//
//
const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280";
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
export const Add = () => {
  //
  const {
    query,
    setQuery,
    movies,
    setMovies,
    //video trailer
    selectedMovie,
    setSelectedMovie,
    videoId,
    setVideoId,
    //
    // removeItem,

    //
  } = useContext(MovieeContext);

  //
  const history = useHistory();
  //
  // ** button remove
  const removeItem = (e) => {
    e.preventDefault(e);
    history.push("/");
    setQuery("");
    setMovies([]);

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

        {movies.length ? (
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
                  <ResultCards
                    // useHISTORY

                    //
                    moviearg={moviearg}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    videoId={videoId}
                    setVideoId={setVideoId}
                  />
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


----------------------


-----------------------


import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { mobile, mobileM, tablet, laptop } from "../responsive";
import "./videoMovie.scss";
//
import { GlobalContext } from "../context/GlobalState";
//
import styled from "styled-components";
// icons
import { HiOutlinePlay } from "react-icons/hi";
//
import Movie from "./Movie";

//
//
//
const defaultImg =
  "https://images.pexels.com/photos/4286932/pexels-photo-4286932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
//
const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280";
// const { REACT_APP_TMDB_KEY } = process.env;
// const IMAGE_PATH = "https://image.tmdb.org/t/p/w342";

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

const ResultCardsHome = ({
  videoId,
  selectedMovie,
  setSelectedMovie,
  moviearg,
  //close modal history+
  setMovies,
  setVideoId,
}) => {
  //
  //

  //
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
  const history = useHistory();
  // ** if you add the useHistory in the context it will not work
  const [closeModi, setCloseModi] = useState(false);

  const handleCloseModal = (e) => {
    e.preventDefault(e);
    setCloseModi();
    history.push("/ResultCardsHome"); // works

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

  return (
    <>
      {closeModi ? (
        <WrapperVidDescript>
          <ContainerDescript>
            <MovieTitleModal>{moviearg.title}</MovieTitleModal>
            <button onClick={handleCloseModal}>kekek</button>
            <LargeDescriptAndBtn>
              {/* BUTTON TO CLOSE movie trailer overlay */}
              <button
                key={moviearg.id}
                onClick={(e) => (
                  e.preventDefault(), setSelectedMovie(moviearg)
                )}
              >
                <HiOutlinePlay />
              </button>
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

          <VideoContainerr>
            <VideoBoxWrapper>
              <VideoBoxContainer
                style={
                  // if there is an img in the API related to the movie, show the BACKDROP_PATH, if not show the img inside the url(${defaultImg})`
                  moviearg.backdrop_path
                    ? {
                        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),  url(${BACKDROP_PATH}${moviearg.backdrop_path})`,
                      }
                    : {
                        backgroundImage: ` linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)),  url(${defaultImg})`,
                      }
                }
              >
                {selectedMovie && (
                  <div>
                    {videoId && (
                      <>
                        <Movie videoId={videoId} />
                      </>
                    )}
                  </div>
                )}

                {/* <div className="poster">WRITE SOMETHING</div> */}
              </VideoBoxContainer>
            </VideoBoxWrapper>
          </VideoContainerr>
        </WrapperVidDescript>
      ) : null}

      <Grid>
        <ResultCard>
          {/* <H3 onClick={() => setOpenMovieModalee(!openMovieModalee)}>
            {moviearg.title}
          </H3> */}

          {moviearg.poster_path ? (
            <>
              <Link to={`/movies/${moviearg.id}`}>
                <ImgBox
                  onClick={() => setCloseModi(!closeModi)}
                  // onClick={() => setOpenMovieModalee(!openMovieModalee)}
                >
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
              </Link>
            </>
          ) : null}
        </ResultCard>
      </Grid>
    </>
  );
};

export default ResultCardsHome;


--------------------



-------------------


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./lib/font-awesome/css/all.min.css";

//
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import { WatchList } from "./components/WatchList";
import { Watched } from "./components/Watched";
import { Add } from "./components/Add";

//
import ResultCardsHome from "./components/ResultCardsHome";
//
import { GlobalProvider } from "./context/GlobalState";
import { MoviessProvider } from "./ContextMovieHandler";
//
function App() {
  return (
    <GlobalProvider>
      <MoviessProvider>
        <Router>
          <Navigation />
          <div className="page">
            <Switch>
              {/* Watchlist was the Home page */}
              <Route exact path="/" component={Home} />

              <Route exact path="/watchlist" component={WatchList} />

              <Route path="/watched" exact component={Watched} />
              <Route path="/add" exact component={Add} />

              <Route path="/resultCards" exact component={ResultCardsHome} />

              <Route path="/*" component={Home} />
            </Switch>
          </div>
        </Router>
      </MoviessProvider>
    </GlobalProvider>
  );
}

export default App;

```
