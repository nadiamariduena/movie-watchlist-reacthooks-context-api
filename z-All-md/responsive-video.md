## Responsive Video ✋

#### I encountered some issues whit the video, like for example:

<br>

- responsiveness

- deprecated packages

<br>

##### ✋ Embedded YouTube video causes tons of net::ERR_BLOCKED_BY_CLIENT

- possible reasons: Youtube library and Ad blockers

https://stackoverflow.com/questions/65150529/embedded-youtube-video-causes-tons-of-neterr-blocked-by-client

> :heavy_check_mark: I **paused the adblocker** and the error stopped

<br>
<br>

---

<br>

### ⚠️ I tried to make the video responsible but it didnt work with the below code

```javascript
{
  videoId && (
    <>
      <div>
        <Youtube
          videoId={videoId}
          opts={{
            // ✋ i tried with viewport values but it didnt work, then with fixed, it works but is not what i want
            height: "689px",
            width: "1040px",
            playerVars: {
              autoplay: 1,
              controls: 0,
              cc_load_policy: 0,
              fs: 0,
              iv_load_policy: 0,
              modestbranding: 0,
              rel: 0,
              showinfo: 0,
            },
          }}
        />
      </div>
    </>
  );
}

 

```

<br>

https://user-images.githubusercontent.com/58809268/218474838-988c2593-7565-4628-a6ce-862037e4a884.mp4


<br>
<br>

<br>
<br>

## To make it responsible

- I had to calculate the **innerWidth and the height**, its not perfect yet, because i still need to adapt it to my project

<br>

```javascript
// -------- video size

// 🔴 since  I already have the state in line 20 (from the Context), you can add it inside the url path, the add this value to the new variable, this videoURL variable will carry the data that you will pass in line 134 (from the Context), from there you will send it to the Movie.js component

// url path related to youtube
const videoURL = `https://www.youtube.com/embed/${videoId} `;
// remember that to make it work you need the fetching functions related to the API
//
//
//
//
// ✋ ** back to the resizing
//
const iframeRef = useRef();
// ** default height
const defaultHeight = 495;
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
```

<br>
<br>

### Explanation 🍒

<br>

#### This code is defining a React hook that sets the height of a video element, using the setVideoHeight function.

<br>

The hook, **handleChangeVideoWidth**, uses the useCallback hook, which returns a [memoized](https://youtu.be/TWUV_LRVX24) version of the function. The memoization helps to improve performance by avoiding unnecessary re-rendering.

> The hook **calculates the video height based on the width of the window (window.innerWidth) and the aspect ratio of the video (16:9).**

> It uses a series of **conditional** statements (if...else) **to determine the aspect ratio to use based on the width of the window.**

<br>
<br>

If the width of the window is greater than 990, the aspect ratio is set to 1.0. If the width of the window is greater than 522 but less than or equal to 990, the aspect ratio is set to 1.2. If the width of the window is greater than 400 but less than or equal to 522, the aspect ratio is set to 1.45. If the width of the window is less than or equal to 400, the aspect ratio is set to 1.85.

<br>

https://stackoverflow.com/questions/21034420/ensure-an-element-retains-a-specified-aspect-ratio

https://codingartistweb.com/2021/10/aspect-ratio-calculator-with-javascript/

<br>
<br>

**Once the aspect ratio is determined**, the height of the video is calculated by multiplying the width of the video (which is obtained from the iframeRef.current object) by 0.5625.

> The video height is then multiplied by the aspect ratio to get the final height of the video. **The result is then passed to the setVideoHeight function**, which updates the state of the component.

<br>

Finally, the Math.floor function is used to [round down the result to the nearest integer](https://magoosh.com/gre/gre-math-rounding/#:~:text=Rounding%20to%20the%20Nearest%20Integer&text=If%20the%20digit%20in%20the,the%20unit%20digit%20by%20one.), so that the height of the video is always a whole number. The empty array [] in the useCallback hook is used to specify that the hook should only re-run if its dependencies change. In this case, there are no dependencies, so the hook will only run once.

<br>
<br>

### In my code

- Inside the Context

```javascript
import { createContext, useState, useCallback, useEffect, useRef } from "react";
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

  // ** fetching the video
  useEffect(() => {
    const fetchVideoId = async () => {
      if (!selectedMovie) {
        return;
      }
      const result = await axios.get(
        `${VIDEO_URL.replace("{movie_id}", selectedMovie.id)}`
      );
      setVideoId(result.data.results[0].key);
    };
    fetchVideoId();
  }, [selectedMovie]);

  //
  // -------- 👾 video size 👾
  // const iframeRef = useRef<HTMLIFrameElement>(null);
  // since we I already have the state in line 20, you can add it inside the url path, the add this value to the new variable, this videoURL variable will carry the data that you will pass in line 134, from there you will send it to the Movie.js component
  const videoURL = `https://www.youtube.com/embed/${videoId} `;

  //
  const iframeRef = useRef();
  // ** default height
  const defaultHeight = 495;
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
  //
  //
  //
  //
  //
  const removeItem = (e) => {
    e.preventDefault(e);
    setQuery("");
    setMovies([]);
    // if you don't add this setVideoId(), when you will click in another movie, you will see the same previous video, and not only that, it will be launched without even have to click on "play", which is not good. so kill the process by adding the setVideoId() or setVideoId(null)
    setVideoId();
  };
  //
  //
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
        removeItem,
        //
        //  resize video
        videoHeight,
        setVideoHeight,
        iframeRef,
        videoURL,
      }}
    >
      {children}
    </MoviessContext.Provider>
  );
}
export default MoviessContext;
```

<br>
<br>

### the video component

```javascript
import React, { useContext, useRef } from "react";
import MovieeContext from "../ContextMovieHandler.js";

const Movie = () => {
  //
  const {
    //  resize video
    videoHeight,
    iframeRef,
    videoURL,
  } = useContext(MovieeContext);

  return (
    <>
      <iframe
        //   dont delete the title as it will give you an err
        title="videoMovie"
        ref={iframeRef}
        width="100%"
        height={`${videoHeight}px`}
        src={videoURL}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </>
  );
};

export default Movie;
```

<br>

### INside the overlay 🍰

```javascript
import React, { useState, useContext, useEffect } from "react";
import { mobile, mobileM, tablet, laptop } from "../responsive";
import "./videoMovie.scss";
import { GlobalContext } from "../context/GlobalState";
import styled from "styled-components";
import Youtube from "react-youtube";
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
}) => {
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
              // 👾 BTN to launch the movie
              <button
                key={moviearg.id}
                onClick={(e) => (
                  e.preventDefault(), setSelectedMovie(moviearg)
                )}
              >
                <HiOutlinePlay />
              </button>
              {/*

                        description


              */}
              <PModalMovieDescription>
                {moviearg.overview}
              </PModalMovieDescription> <Controls>
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
                        // 👾 movie
                        <Movie videoId={videoId} />
                        // 👾 movie
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
          <H3 onClick={() => setOpenMovieModalee(!openMovieModalee)}>
            {moviearg.title}
          </H3>

          {moviearg.poster_path ? (
            <>
              <ImgBox onClick={() => setOpenMovieModalee(!openMovieModalee)}>
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
    </>
  );
};

export default ResultCardsHome;
```

<br>

https://user-images.githubusercontent.com/58809268/218476202-ea637be1-01ff-4e63-8ce7-69574e6bb9f8.mp4


