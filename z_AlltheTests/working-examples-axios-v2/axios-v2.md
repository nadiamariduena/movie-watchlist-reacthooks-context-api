```javascript
//
//
// Add.js
//
//
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
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

    // if (data.results.length) {
    //   await fetchMovie(data.results[0].id);
    // }
  };

  // const fetchMovie = async (id) => {
  //   const { data } = await axios.get(
  //     `https://api.themoviedb.org/3/movie/${id}`,
  //     {
  //       params: {
  //         api_key: REACT_APP_TMDB_KEY,
  //         append_to_response: "videos",
  //       },
  //     }
  //   );
  // };

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
        <span className={"brand"}>Movie Trailer App</span>
        good <Input
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
                  <ResultCards movie={movie} />
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
<br>

```javascript
//
//
// ** ResultCardsHome.jsx
//
//
import React, { useState } from "react";

import styled from "styled-components";
import Youtube from "react-youtube";
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
//

const ResultCards = ({ movie, openMovieModals, setOpenMovieModals }) => {
  const [openMovieModalee, setOpenMovieModalee] = useState(false);
  //
  return (
    <>
      <Container>
        {openMovieModalee ? (
          <ModalPoster>
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
