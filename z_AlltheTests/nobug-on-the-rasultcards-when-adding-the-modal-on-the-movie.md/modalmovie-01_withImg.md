### This one works perfectly with the modal

- So here you will have the poster img of the movie and the description (no styled)

```javascript
// ResultCardsHome.jsx
import React, { useState } from "react";

import "./videoMovie.scss";
import styled from "styled-components";
import Youtube from "react-youtube";

// ** the poster inside the modal
const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280";

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
  // the poster needs viewport size not percentages
  width: 60vw;
  height: 60vh;
  background-color: lavender;
`;

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

const ResultCards = ({ moviearg }) => {
  const [openMovieModalee, setOpenMovieModalee] = useState(false);
  return (
    <>
      <Container>
        {openMovieModalee ? (
          <ModalPoster>
            <VideoWrapper>
              <div
                className="poster"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${moviearg.backdrop_path})`,
                }}
              ></div>
            </VideoWrapper>

            <p>{moviearg.overview}</p>
            <span className={"brand"}>
              Movie Trailer sssssssssssssssssssApp
            </span>
          </ModalPoster>
        ) : null}
        <Grid>
          <ResultCard>
            {/* if there is a path with an img, then show if not dont show anything */}
            {moviearg.poster_path ? (
              <ImgBox>
                <img
                  src={`https://image.tmdb.org/t/p/w200${moviearg.poster_path}`}
                  alt={`${moviearg.title} Poster`}
                />
              </ImgBox>
            ) : null}

            <h3 onClick={() => setOpenMovieModalee(!openMovieModalee)}>
              {moviearg.title}
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

```javascript

```
