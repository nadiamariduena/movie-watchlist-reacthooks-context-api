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

https://user-images.githubusercontent.com/58809268/218306529-d27edb67-62a4-48a2-b4a8-78c935de3277.mp4

<br>
<br>
<br>

```javascript
import React, { useState } from "react";

const RandomizeImages = () => {
  const [randomImage, setRandomImage] = useState("");

  const handleClick = () => {
    const images = [
      "https://image1.jpg",
      "https://image2.jpg",
      "https://image3.jpg",
      "https://image4.jpg",
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);
  };

  return (
    <div>
      <img src={randomImage} alt="Random Image" />
      <button onClick={handleClick}>Randomize</button>
    </div>
  );
};

export default RandomizeImages;
```

<br>
<br>
<br>

### Another option

- Another option, YOu add the images you want, so that you can prevent the erotic images from the API from showing.

> 🔴THis function below will give you an error

```javascript
const Home = () => {
  // const { movies, randomImage, setRandomImage } = useContext(MovieeContext);

  //
  //
  const [randomImgHome, setRandomImgHome] = useState("");

  const ImagesRandomHome = [
    "https://images.bravo.de/m3gan-horror-movie-figur-nach-vorbild-dieser-beruhmten-schauspielerin,id=7aca77fc,b=bravo,w=1600,h=,ca=0,0,100,56.25,rm=sk.jpeg",
    "https://fr.web.img2.acsta.net/videothumbnails/20/05/05/11/16/5219320.jpg",

    "https://i.guim.co.uk/img/media/31dbbedbf1101828aca84a0211cfadb57fa1e366/0_141_3945_2367/master/3945.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=ce0c3fcd5f988ee68759b7a6d9d2cae3",

    "https://www.motionpictures.org/wp-content/uploads/2017/10/BR-SINTL-87634_3.jpg",

    "https://images.wallpapersden.com/image/download/tenet-poster_bGdsbmqUmZqaraWkpJRnZmtlrWZnZWY.jpg",

    "https://assets.letemps.ch/sites/default/files/styles/original/public/media/2021/09/16/file7hiccsddigx2twkj70n.jpeg?itok=M7tnFGct",
  ];

  //
  const randomIndexImg = Math.floor(Math.random() * ImagesRandomHome.length);
  setRandomImgHome(ImagesRandomHome[randomIndexImg]);
  //
  //
  return (
    <>
```

<br>
<br>

```javascript
               <image
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  clip-path="url(#blob)"
                  xlinkHref={randomImgHome} ✋
                  preserveAspectRatio="xMidYMid slice"
                ></image>
              </svg>
            </HeroContainerLeft>
```

<br>
<br>
<br>

### to prevent that use a _useEffect_

<br>

> This function uses useState and useEffect hooks to store and update the randomImage state. The useEffect hook is called when the component is first mounted, and it randomly selects an image from an array of image URLs and updates the randomImage state using setRandomImage. The randomImage is then displayed inside an SVG element using the xlinkHref attribute. **Every time the page is refreshed, a new random image will be displayed**.

#### Snipped

```javascript
import React, { useState, useEffect } from "react";

const RandomizeImages = () => {
  const [randomImage, setRandomImage] = useState("");

  useEffect(() => {
    const images = [
      "https://image1.jpg",
      "https://image2.jpg",
      "https://image3.jpg",
      "https://image4.jpg",
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);
  }, []);

  return (
    <svg viewBox="0 0 100 100">
      <image xlinkHref={randomImage} x="0" y="0" height="100" width="100" />
    </svg>
  );
};

export default RandomizeImages;
```

<br>

#### In my code

```javascript
import React, { useState, useEffect, useContext } from "react";
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

  //

  overflow: hidden;
  // ** squared pattern
  background-image: linear-gradient(#e8e4d8 1px, transparent 1px),
    linear-gradient(to right, #e8e4d8 1px, transparent 1px);
  background-size: 39px 39px;
  background-color: #ffffff;
`;

const HeroContainerRight = styled.div`
  -webkit-box-shadow: inset 1.5px 0 32px 22px #ffffff;
  -moz-box-shadow: inset 1.5px 0 32px 22px #ffffff;
  box-shadow: inset 1.5px 0 32px 22px #ffffff;

  flex: 1;
  height: 100%;
  padding-left: 92px;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;
const HeroContainerLeft = styled.div`
  background-color: #fefefe;
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
  margin: 35px 0 55px 0;
  max-width: 550px;
  font-size: calc(10px + 1vmin);
  line-height: calc(19px + 1vmin);
  color: rgba(103, 103, 103, 0.396);
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

//
const Home = () => {
  //
  // ** RANDOM IMG  ----------
  const [randomImgHome, setRandomImgHome] = useState("");

  //
  useEffect(() => {
    const ImagesRandomHome = [
      //Melancholia
      "https://www.filmonpaper.com/wp-content/uploads/2013/05/Melancholia_onesheet_waterstyle_USA-12.jpg",
      //Blade runner
      "https://www.motionpictures.org/wp-content/uploads/2017/10/BR-SINTL-87634_3.jpg",
      // Ghost
      "https://i.guim.co.uk/img/media/31dbbedbf1101828aca84a0211cfadb57fa1e366/0_141_3945_2367/master/3945.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=ce0c3fcd5f988ee68759b7a6d9d2cae3",
      // Tenet
      "https://rare-gallery.com/uploads/posts/343166-Tenet-2020-Movie-Poster-John-David-Washington.jpg",
      // Dune
      "https://assets.letemps.ch/sites/default/files/styles/original/public/media/2021/09/16/file7hiccsddigx2twkj70n.jpeg?itok=M7tnFGct",
    ];

    const randomIndexImg = Math.floor(Math.random() * ImagesRandomHome.length);
    setRandomImgHome(ImagesRandomHome[randomIndexImg]);
  }, []);

  // ** RANDOM IMG  ----------
  //
  return (
    <>
      <WrapperSectionHome>
        <WrapperContainer>
          <HeroWrapperHome>
            <HeroContainerLeft>
              <svg
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
                  clip-path="url(#blob)"
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
```
