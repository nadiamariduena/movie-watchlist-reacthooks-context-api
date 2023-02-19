### Router v6 Params 🥚

- I ve been trying to figure out a way of getting the data and the id of the specific movie. With following i can finally do it but i am still not sure if its the correct way, but its working :) 🎆 🚀

```javascript
// App.js

import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
```

<br>
<br>

### Add.js

```javascript
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

const Add = () => {
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
                    {console.log("hello")}
                    <p>{moviearg.title} </p>
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
```

<br>
<br>
<br>

## MovieDetails.js

- 🔴 I dont get why do i need to call the api twice but at least its working with no errors

```javascript
import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MovieesContext from "../../ContextMovieHandler";
import axios from "axios";

import { mobile, mobileM, tablet, laptop } from "../../responsive";
import "../videoMovie.scss";
//
import { GlobalContext } from "../../context/GlobalState";
//
import styled from "styled-components";
import Movie from "../Movie";
// icons
import { HiOutlinePlay } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
//
//
const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280";
// const { REACT_APP_TMDB_KEY } = process.env;
// const IMAGE_PATH = "https://image.tmdb.org/t/p/w342";
//
//
const defaultImg =
  "https://images.pexels.com/photos/4286932/pexels-photo-4286932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
//
const { REACT_APP_TMDB_KEY } = process.env;
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
  //
  // const {
  //   query,
  //   setQuery,
  //   movies,
  //   setMovies,
  //   //video trailer
  //   selectedMovie,
  //   setSelectedMovie,
  //   videoId,
  //   setVideoId,
  //   //
  //   // removeItem,

  //   //
  // } = useContext(MovieesContext);
  // const findPalette = (productId) =>
  //   movies.find((productId) => productId.id === productId);

  // //
  // //

  // console.log("hello");
  // console.log({ productId });
  // const palette = findPalette(productId);

  //
  //1 this productId is coming from the app.js, check it here below:
  const { productId } = useParams();
  //   App.js
  // <Route path="/rainbow/:productId" element={<MovieDetails />} />
  //
  //2 you need a new variable to pass inside the logic of the useEffect
  const [movieNew, setMovieNew] = useState(null);

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
  //
  return (
    <>
      // use it here, dont forget the condition: ?
      <WrapperVidDescript> {movieNew?.overview} </WrapperVidDescript>
    </>
  );
}

export default MovieDetails;
```
