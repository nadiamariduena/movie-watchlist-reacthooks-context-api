This works but i ónly modified a bit the url, to add popular, which works but its useless if you dont see the movies from the moment you enter the page , so maybe i will add a section under the hero (on the home page). This section will have 4 or 8 popular movies

```javascript
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import ResultCards from "./ResultCards";
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

// \*\* BG + square gradient

// \*_ squared pattern
/_ background-image: linear-gradient(#e8e4d8 1px, transparent 1px),
linear-gradient(to right, #e8e4d8 1px, transparent 1px);
background-size: 39px 39px;
\*/
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
  const MOVIE_API = "https://api.themoviedb.org/3/";
  const SEARCH_API = MOVIE_API + "search/movie";
  const DISCOVER_API = MOVIE_API + "discover/movie";

  //

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // useEffect(() => {
  // fetchMovies();
  // }, []);

  const onChange = (e) => {
    setQuery(e.target.value);

    //
    //
    /*

     old one, you have to change this:

https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${e.target.value}

     for this:
     https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate


     It will give you new and popular movies

     -------

fetch(
`https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&with_watch_monetization_types=flatrate&query=${e.target.value}`
)
.then((res) => res.json())
.then((data) => {


ISSUES with the adult=false not working
apparently its not a bug but a problem from the API, more
like a question of "what is adult" or not, check the discussion:
https://www.themoviedb.org/talk/628f85842495ab540a1ba3c2


\*/
    //
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_TMDB_KEY}&language=en-US&sort_by=popularity.desc&page=1&include_adult=false&query=${e.target.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        // if there is not errors, then show results
        if (!data.errors) {
          setResults(data.results);
          console.log(data);
        } else {
          // if there are errors, show empty array
          setResults([]);
        }
      });
  };

  const removeItem = (e) => {
    e.preventDefault(e);
    setQuery("");
    setResults([]);
  };
  //
  // -------- before the new context
  //
  // 33:35
  return (
    <>
      <AddPage>
        <InputWrapper>
          <Input
            type="text"
            placeholder="SEARCH"
            value={query}
            onChange={onChange}
          />
        </InputWrapper>

        {results.length > 0 && (
          <>
            <ClickableOverlay onClick={removeItem} />

            <Ul className="results">
              {results.map((movie) => (
                <li key={movie.id}>
                  <ResultCards movie={movie} />
                </li>
              ))}
            </Ul>
            <ButtonCloseOverlay onClick={removeItem}>
              <CgClose />
            </ButtonCloseOverlay>
          </>
        )}
      </AddPage>
    </>
  );
};
```
