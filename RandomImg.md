## Random Img from the API

- Pros / Cons

- **Pros** can be nice to save time (i dont have to look for images to add on the hero section)

<br>

- **Cons** Not all the images are great, some are extremely pixelated, **also and very important**, since the API didnt filter correctly the adult images, you might see erotic images on the hero.. so its not recommended

<br>

```javascript
// some snippet
import React, { useState, useEffect } from "react";

const API_KEY = "YOUR_API_KEY";
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

const RandomizeImages = () => {
  const [movies, setMovies] = useState([]);
  const [randomImage, setRandomImage] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      const randomMovie = movies[randomIndex];
      const imagePath = `https://image.tmdb.org/t/p/original/${randomMovie.poster_path}`;
      setRandomImage(imagePath);
    }
  }, [movies]);

  return (
    <div>
      <img src={randomImage} alt="Random Movie" />
    </div>
  );
};

export default RandomizeImages;
```

<br>

<br>

### In my code

```javascript
<image
  x="0"
  y="0"
  width="100%"
  height="100%"
  clip-path="url(#blob)"
  xlinkHref={randomImage}
  preserveAspectRatio="xMidYMid slice"
></image>
```

<br>

```javascript
import React, { useState, useContext } from "react";
import axios from "axios";
import MovieeContext from "../ContextMovieHandler.js";

//
//
import { mobile, mobileM, tablet, laptop } from "../responsive";
import styled from "styled-components";
import { Add } from "./Add";
import ResultCardsHome from "./ResultCardsHome";
import SvgImg from "./SvgImg";
//
//
const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280";
// import videoCity1 from "../../videos/smartphone-cottonbro_lwres.mp4";

const WrapperSectionHome = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const WrapperContainer = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const HeroWrapperHome = styled.div`
  width: 80%;
  height: 70%;
  margin-top: 70px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  //

  overflow: hidden;
  // ** squared pattern
  background-image: linear-gradient(#e8e4d8 1px, transparent 1px),
    linear-gradient(to right, #e8e4d8 1px, transparent 1px);
  background-size: 39px 39px;
  background-color: #ffffff;
`;

const HeroContainerRight = styled.div`
  flex: 1;
  height: 100%;
  padding-left: 22px;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;
const HeroContainerLeft = styled.div`
  background-color: #fafafa;
  flex: 1;
  height: 100%;
`;

const H1 = styled.h1`
  font-family: "Syncopate-Bold";
  color: rgba(142, 182, 203, 0.496);
  font-size: calc(58px + 1vmin);
  line-height: calc(62px + 1vmin);
  margin-bottom: 10px;
`;
const H2 = styled.h2`
  color: rgba(142, 182, 203, 0.496);
  font-size: calc(48px + 1vmin);
  line-height: calc(50px + 1vmin);
`;
const P = styled.p`
  margin: 35px 0 50px 0;
  max-width: 650px;
  font-size: calc(10px + 1vmin);
  line-height: calc(16px + 1vmin);
  color: #141414;
`;

//
// ** POPULAR SECTION
//
const SectionHomePopularMovies = styled.div``;

//

const WrapperPopularMovies = styled.div`
  width: 100%;

  margin: 30px auto 0 auto;
`;

//
const UlHome = styled.ul`
  margin: 0 auto 0 auto;
  padding: 50px 120px 50px 120px;
  width: 90%;

  grid-template-columns: repeat(4, 1fr);
  display: grid;
  grid-gap: 1em;

  //
  background-color: #fefefe;
  border-radius: 50px;

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
    width: "95%",
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
//https://images.unsplash.com/photo-1535979014625-490762ceb2ff?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=MnwzNjMxMDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzYxOTExMzE&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1080
//
const Home = () => {
  const { movies, randomImage, setRandomImage } = useContext(MovieeContext);

  return (
    <>
      <WrapperSectionHome>
        <WrapperContainer>
          <HeroWrapperHome>
            <HeroContainerLeft>
              <svg
                id="10015.io"
                viewBox="0 0 480 480"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <defs>
                  <clipPath id="blob">
                    <path
                      fill="#474bff"
                      d="M220,367.69391294790523C247.06208541824705,375.7141114187787,275.88845864077274,413.3109500766067,298.61506800355846,396.572333718973C324.6753715823496,377.3783828393869,295.41626420945937,330.0188242074336,310.2264572159853,301.24026697993924C320.2000060472741,281.8600775606669,357.5751060055916,287.5968761530262,365.20392211460717,267.1796142653048C372.69457861253443,247.13211367757887,350.8862274950872,227.52337985666964,345.51052321688286,206.8083124394946C340.89917460426113,189.0386598598584,347.31389342751214,167.4025077265069,335.6352660963252,153.23794799147265C323.6482287942828,138.69932961656747,293.1649352415396,148.4678397759527,283.886840339832,132.0673080002268C265.4062695065083,99.39991319596609,287.6655887130567,50.18080970407874,261.8964535677715,22.892683064696474C242.30878352113587,2.1503951380942645,203.7157411620474,8.388919312158658,177.32339442421875,19.2223564378432C150.80736579672373,30.106562068071753,143.54720988806207,66.1099756809579,119.31501533649558,81.41900744623509C92.93006189883712,98.0880750968314,37.45951491464698,80.5914040974757,31.647938719515988,111.25488671729154C24.42896198674126,149.34420365057895,88.30465800058772,168.82943699729034,95.5295629205768,206.91762989758263C100.09027644651358,230.9607610477591,62.163823043545435,246.8616903659114,62.01298696455016,271.3330922842225C61.868372334816414,294.7951363194099,76.96957713328428,317.46827558690615,94.75382459794479,332.772162864847C112.32637431583711,347.8938777759238,137.38157549140195,349.1803547532815,159.71296333683333,355.40690133518376C179.68644876823876,360.97600605462173,200.11933921033776,361.8020224006345,220,367.69391294790523"
                    />
                  </clipPath>
                </defs>
                {/*  xlinkHref=`url(https://images.unsplash.com/photo-1535979014625-490762ceb2ff?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=MnwzNjMxMDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzYxOTExMzE&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1080)` */}

                <image
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  clip-path="url(#blob)"
                  //   ✋ the "randomImage" function is stored inside the context
                  xlinkHref={randomImage}
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
```

<br>
<br>

### The function

```javascript
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Movie from "./components/Movie";
//

//
const { REACT_APP_TMDB_KEY } = process.env;

//
//
const MoviessContext = createContext();
export function MoviessProvider({ children }) {
  //
  //
  const [playing, setPlaying] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [selectedMovie, setSelectedMovie] = useState({});

  //  ✋ the random img function
  const [randomImage, setRandomImage] = useState("");
  //
  //
  //

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
    setSelectedMovie(data.results[0]);
    setMovies(data.results);
  };

  //
  //
  //-------       ✋ the random img function

  useEffect(() => {
    if (movies.length > 0) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      const randomMovie = movies[randomIndex];
      const imagePath = `https://image.tmdb.org/t/p/original/${randomMovie.poster_path}`;
      setRandomImage(imagePath);
    }
  }, [movies]);
  //
  //
  //-------       ✋ the random img function

  //
  //
  const renderMovies = () =>
    movies.map((movie) => (
      <Movie selectMovie={setSelectedMovie} key={movie.id} movie={movie} />
    ));

  const removeItem = (e) => {
    e.preventDefault(e);
    setSearchKey("");
    setMovies([]);
  };
  //
  //
  return (
    //

    //
    <MoviessContext.Provider
      value={{
        playing,
        setPlaying,
        trailer,
        setTrailer,
        query,
        setQuery,
        movie,
        setMovie,
        setMovies,
        movies,
        fetchMovies,
        // fetchMovie,
        removeItem,
        //
        // selectMovie,
        renderMovies,
        selectedMovie,
        setSelectedMovie,
        //
        //  ✋ the random img function
        randomImage,

        //
      }}
    >
      {children}
    </MoviessContext.Provider>
  );
}
export default MoviessContext;
```

<br>

### As you can see, it's not nice!

- You have no control over the images you show, unless you want to [Overengineer ](https://www.masterborn.com/blog/What-is-Overengineering-Why-Developers-Do-It-and-4-Ways-to-Avoid-It) the app
