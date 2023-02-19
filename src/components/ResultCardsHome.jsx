import React, { useState, useContext, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { mobile, mobileM, tablet, laptop } from "../responsive";
import "./videoMovie.scss";
import styled from "styled-components";

//

//
import { GlobalContext } from "../context/GlobalState";
import MovieDetails from "./MovieDetails/MovieDetails";

//
//

//
const defaultImg =
  "https://images.pexels.com/photos/4286932/pexels-photo-4286932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
//

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
  let navigate = useNavigate();
  //Matched leaf route at location "/resultCards" does not have an element. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.

  // ** if you add the useHistory in the context it will not work
  const [closeModi, setCloseModi] = useState(false);

  const handleCloseModal = (e) => {
    e.preventDefault(e);
    setCloseModi();
    // navigate("/ResultCardsHome"); // works

    // history.push(""); // also works -- Go back to the previous URL without the movie ID
    // history.goBack();
    //
    // setMovies([]);// if you add this, specifically inside the overlay with the movie trailer, you will be send to the home page instead of the resultsCardsHome once you close the overlay.
    //
    //
    // if you don't add this setVideoId(), when you will click in another movie, you will see the same previous video, and not only that, it will be launched without even have to click on "play", which is not good. so kill the process by adding the setVideoId() or setVideoId(null)
    setVideoId();
  };

  // useEffect(() => {
  //   console.log(`/movies/${id}`);
  // }, []);

  return (
    <>
      {closeModi ? (
        <MovieDetails
          closeModi={closeModi}
          setCloseModi={setCloseModi}
          //
          handleCloseModal={handleCloseModal}
          //
          moviearg={moviearg}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          videoId={videoId}
          setVideoId={setVideoId}
        />
      ) : null}

      <Grid>
        <ResultCard>
          {moviearg.poster_path ? (
            <ImgBox onClick={() => setCloseModi(!closeModi)}>
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
          ) : null}
        </ResultCard>
      </Grid>
    </>
  );
};

export default ResultCardsHome;
