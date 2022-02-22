#### button setup 1

- To make all this work, you need all context related

```javascript
import React from "react";
import styled from "styled-components";
import { mobile, mobileM, tablet } from "../responsive";

//
//
const WrapperContainer = styled.div``;
const Container = styled.div``;

//
//
const Content = styled.div`
  color: rgb(189, 212, 197);

  .ctrl-btn {
    padding: 5px 5px;
    margin: 1px;
    border-radius: 5rem;
    border: 0;
    background: rgba(189, 212, 197, 0.418);
    &:hover {
      background: rgba(238, 241, 239, 0.418);
    }
  }
`;

//
//
const MovieControls = ({ movie, type }) => {
  return (
    <>
      <WrapperContainer>
        <Container>
          <Content>
            {type === "watchlist" && (
              <>
                <button className="ctrl-btn">
                  <i className="fa-fw far fa-eye"></i>
                </button>
                {/*  */}
                <button className="ctrl-btn">
                  <i className="fa-fw fa fa-times"></i>
                </button>
              </>
            )}
          </Content>
        </Container>
      </WrapperContainer>
    </>
  );
};

export default MovieControls;
```

<br>
<br>

```javascript
import React from "react";
import styled from "styled-components";
import { mobile, mobileM, tablet } from "../responsive";
import MovieControls from "./MovieControls";
//
//
// ** This is the Card linked to Watchlist **
//

const Container = styled.div``;

const Grid = styled.div``;
const ResultCard = styled.div`
  padding: 20px;
  /* background: #f8f8f8c5; */
  padding: 20px;
`;
const ImgBox = styled.div`
  width: 100%;

  img {
    margin: 10px 0 10px 0;
    width: 70%;
    min-height: auto;
    object-fit: cover;
    /* border-radius: 5rem; */
  }
`;
//
const H3 = styled.h3`
  padding: 10px 0 10px 0;
  font-weight: 100;
  font-size: calc(10px + 1.1vmin);
  font-family: "RobotoBlack";
  color: rgb(189, 212, 197);
`;
const H4 = styled.h3`
  font-weight: 100;
  font-size: calc(10px + 1vmin);
  font-family: "Poppins-Light";
  color: rgb(189, 212, 197);
`;
//

//
//
//
const WatchedMovieCard = ({ movie, type }) => {
  return (
    <Container>
      <Grid>
        <ResultCard>
          {movie.poster_path ? (
            <ImgBox>
              {" "}
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={`${movie.title} Poster`}
              />
            </ImgBox>
          ) : (
            <div className="filler-poster"></div>
          )}
          {/* controls */}
          <MovieControls type={type} movie={movie} />
        </ResultCard>
      </Grid>
    </Container>
  );
};

export default WatchedMovieCard;
```

<br>
<br>

```javascript
import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import WatchedMovieCard from "./WatchedMovieCard";
import styled from "styled-components";
import { mobile, mobileM, tablet } from "../responsive";

//
//
//
//
const WrapperContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  padding: 0 0 100px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div``;

//
//
const Content = styled.div`
  width: 100vw;
  min-height: 4vh;
  padding: 0px 0 20px 0;
  text-align: center;
  h1 {
    padding: 20vh 0 0 0;
    font-weight: 600;
    font-size: calc(20px + 2vmin);
    font-family: "Poppins-Light";
    color: rgb(189, 212, 197);
  }
`;

const Ul = styled.ul`
  padding: 5em 7.5em;
  display: grid;
  grid-gap: 2em;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`;
//

//
//

export const WatchList = () => {
  //
  // Accessing the context here:
  const { watchlist } = useContext(GlobalContext);

  //
  //
  return (
    <>
      <WrapperContainer>
        <Container>
          <Content>
            <h1>My Watchlist</h1>

            {watchlist.length > 0 ? (
              <Ul className="results">
                {watchlist.map((movie) => (
                  <li key={movie.id}>
                    <WatchedMovieCard movie={movie} type="watchlist" />
                  </li>
                ))}
              </Ul>
            ) : (
              <div>No Movies, in your List</div>
            )}
          </Content>{" "}
        </Container>
      </WrapperContainer>
    </>
  );
};
```

<br>
<br>

---

<br>
<br>

#### Removing functionality 2
