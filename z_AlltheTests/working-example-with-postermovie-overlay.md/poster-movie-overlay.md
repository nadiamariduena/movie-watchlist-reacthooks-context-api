## This one is working but somehow the video isnt

- this version is not using a provider

```javascript
// Add.js
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

//
import Movie from "./Movie.js";
import ResultCards from "./ResultCardsHome";
import { mobile, mobileM, tablet, laptop } from "../responsive";

// import MovieContextoo from "../ContextMovieHandler";

import { CgClose } from "react-icons/cg";

//
// const REACT_APP_TMDB_KEY = process.env.REACT_APP_TMDB_KEY;
const { REACT_APP_TMDB_KEY } = process.env;

const AddPage = styled.div``;

const ClickableOverlay = styled.div`
  width: 100vw;
  min-height: 150vh;

  //
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  cursor: pointer;
  //

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
const InputWrapper = styled.div`
  padding: 10px 0px;
  margin: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const Input = styled.input`
  padding: 18px 26px;
  border-radius: 5rem;
  border: 0;
  text-align: center;
  color: rgba(142, 182, 203, 0.496);
  border: 3px solid rgba(142, 182, 203, 0.496);

  //

  //
  &::placeholder {
    color: rgba(142, 182, 203, 0.596);
  }
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
//
//
export const Add = () => {
  //

  const [query, setQuery] = useState("");
  // const [results, setResults] = useState([]);
  //
  //
  const [playing, setPlaying] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const [movie, setMovie] = useState({ title: "Loading Movies" });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async (e) => {
    if (e) {
      e.preventDefault();
    }

    setQuery(e.target.value);

    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_TMDB_KEY}&language=en-US&sort_by=popularity.desc&page=1&include_adult=false&query=${e.target.value}`
    );

    console.log(data.results[0]);
    setMovies(data.results);
    setMovie(data.results[0]);

    if (data.results.length) {
      await fetchMovie(data.results[0].id);
    }
  };

  const fetchMovie = async (id) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}`
    );

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }

    setMovie(data);
  };

  const selectMovie = (movie) => {
    fetchMovie(movie.id);
    setPlaying(false);
    setMovie(movie);
    window.scrollTo(0, 0);
  };

  const renderMovies = () =>
    movies.map((movie) => (
      <Movie selectMovie={selectMovie} key={movie.id} movie={movie} />
    ));

  // ---

  const removeItem = (e) => {
    e.preventDefault(e);
    setSearchKey("");
    setMovies([]);
  };
  //
  // -------- before the new context
  //
  // 33:35
  return (
    <>
      <AddPage>
        <Input
          type="text"
          placeholder="SEARCH"
          value={query}
          onChange={fetchMovies}
        />
        {/* <form className="form" onSubmit={fetchMovies}>
          <input
            className="search"
            type="text"
            id="search"
            onInput={(e) => setSearchKey(e.target.value)}
          />
          <button className="submit-search" type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form> */}
        {/* <InputWrapper>
          <Input
            type="text"
            placeholder="SEARCH"
            value={query}
            onChange={onChange}
          />
        </InputWrapper> */}
        {movies.length ? (
          <>
            <ClickableOverlay onClick={removeItem} />

            <Ul className="results">
              {movies.map((movie) => (
                <li key={movie.id}>
                  <ResultCards
                    movie={movie}
                    //
                    playing={playing}
                    setPlaying={setPlaying}
                    trailer={trailer}
                    renderMovies={renderMovies}
                  />
                </li>
              ))}
            </Ul>
            <ButtonCloseOverlay onClick={removeItem}>
              <CgClose />
            </ButtonCloseOverlay>
          </>
        ) : null}
      </AddPage>
    </>
  );
};
```

<br>
<br>

```javascript
// ResultCardsHome.jsx
import React, { useState } from "react";
import "./videoMovie.scss";
import styled from "styled-components";
import Youtube from "react-youtube";
//
const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280";

//

//
const Container = styled.div`
  position: relative;
`;

const ModalPoster = styled.div`
  width: 70vw;
  min-height: 80vh;
  position: fixed;
  z-index: 850;
  top: 150px;
  left: 300px;

  background-color: #f0f;

  /*  */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const VideoWrapper = styled.div`
  width: 60vw;
  height: 60vh;
  background-color: lavender;
`;

//
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
//

const ResultCards = ({
  movie,
  playing,
  setPlaying,
  trailer,

  openMovieModals,
  setOpenMovieModals,
}) => {
  const [openMovieModalee, setOpenMovieModalee] = useState(false);
  //
  return (
    <>
      <Container>
        {openMovieModalee ? (
          <ModalPoster>
            {/*  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} */}
            <VideoWrapper>
              {movie ? (
                <div
                  className="poster"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${movie.backdrop_path})`,
                  }}
                >
                  {playing ? (
                    <>
                      <Youtube
                        videoId={trailer.key}
                        className={"youtube amru"}
                        containerClassName={"youtube-container amru"}
                        opts={{
                          width: "100%",
                          height: "70vmin",
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
                      <button
                        style={{
                          background: "red",
                          padding: "12px 25px",
                          zIndex: "999",
                        }}
                        onClick={() => setPlaying(false)}
                        className={"button close-video"}
                      >
                        Close
                      </button>
                    </>
                  ) : (
                    <div className="center-max-size">
                      <div className="poster-content">
                        {trailer ? (
                          <button
                            className={"button play-video"}
                            onClick={() => setPlaying(true)}
                            type="button"
                          >
                            Play Trailer
                          </button>
                        ) : (
                          "Sorry, no trailer available"
                        )}
                        {/* <h1>{movie.title}</h1>
                        <p>{movie.overview}</p> */}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </VideoWrapper>
            <span className={"brand"}>
              Movie Trailer sssssssssssssssssssApp
            </span>
            <p>{movie.overview}</p>
          </ModalPoster>
        ) : null}

        <Grid>
          <ResultCard>
            {/* if there is a path with an img, then show if not dont show anything */}
            {movie.poster_path ? (
              <ImgBox>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={`${movie.title} Poster`}
                />
              </ImgBox>
            ) : null}

            <h3 onClick={() => setOpenMovieModalee(!openMovieModalee)}>
              {movie.title}
            </h3>
          </ResultCard>
        </Grid>
      </Container>
    </>
  );
};

export default ResultCards;
```

<br>
<br>

#### 🔴 This card below, is just an example of how it was before

```javascript
import React, { useContext, useState } from "react";

import { GlobalContext } from "../context/GlobalState";
import styled from "styled-components";
import { mobile, mobileM } from "../responsive";

//
//
//
const Container = styled.div`
  position: relative;
`;

const ModalPoster = styled.div`
  width: 70vw;
  height: 80vh;
  position: fixed;
  z-index: 850;
  top: 150px;
  left: 300px;
  opacity: 0.9;
  background-color: #f0f;

  /*  */
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
const H3 = styled.h3`
  padding: 50px 0 5px 0;
  font-weight: 300;
  font-size: calc(8px + 1.1vmin);
  letter-spacing: 1px;
  font-family: "RobotoBlack";
  color: rgba(142, 182, 203, 0.496);
  ${mobile({
    fontSize: `calc(16px + 1.1vmin)`,
  })}
  ${mobileM({
    fontSize: `calc(13px + 1.1vmin)`,
  })}
`;
const H4 = styled.h3`
  font-size: calc(5px + 1vmin);
  font-weight: 600;
  color: rgba(23, 23, 23, 0.138);
  ${mobile({
    fontSize: `calc(9px + 1.1vmin)`,
  })}
  ${mobileM({
    fontSize: `calc(10px + 1.1vmin)`,
  })}
`;
//
//
//
const Controls = styled.div`
  /* background: purple; */
  padding: 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

//
const Button = styled.button`
  margin-top: 18px;
  padding: 12.5px 25px;

  position: relative;
  overflow: hidden;
  z-index: 1;

  //

  border-radius: 30em;
  border: none;
  box-shadow: 6px 6px 12px #ededed, -6px -6px 12px #ffffff;
  background: rgba(142, 182, 203, 0.106);
  color: #cccccc;
  text-transform: capitalize;
  font-size: calc(4px + 1vmin);
  font-weight: 500;

  &:disabled {
    background-color: #fafafa;
    color: #b6b6b6;
  }
  &:hover {
    cursor: pointer;
    background-color: #eeeeee;
    color: #b6b6b6;
  }

  ${mobile({ padding: "18.5px 28px", fontSize: `calc(9px + 1.1vmin)` })}
  ${mobileM({
    fontSize: `calc(8px + 1.1vmin)`,
  })}
`;

/*




*/

const ResultCards = ({ movie }) => {
  //

  //
  //1 not duplication
  const { addMovieToWatchlist, watchlist, watched, addMovieToWatched } =
    useContext(GlobalContext);

  //2 here we will search if there is any object that has an idential object id o.id === movie.id
  let storedMovie = watchlist.find(
    (objectMovie) => objectMovie.id === movie.id
  );

  //5
  let storedMovieWatched = watched.find((o) => o.id === movie.id);

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
  const [openMovieModale, setOpenMovieModale] = useState(false);
  //
  //
  //4 now go to the button "add to watchlist"
  //
  return (
    <>
      <Container>
        {openMovieModale ? <ModalPoster>{movie.overview}</ModalPoster> : null}

        {/*  */}
        <Grid>
          <ResultCard>
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

            <H3 onClick={() => setOpenMovieModale(true)}>{movie.title}</H3>
            <H4>
              {movie.release_date ? movie.release_date.substring(0, 4) : "-"}
            </H4>

            {/*



          4)
          the button to add to the watchlist



          */}

            <Controls>
              <Button
                disabled={watchlistDisabled}
                onClick={() => addMovieToWatchlist(movie)}
              >
                add to watchlist
              </Button>

              <Button
                disabled={watchedDisabled}
                onClick={() => addMovieToWatched(movie)}
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

export default ResultCards;
```
