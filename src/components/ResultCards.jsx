import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import styled from "styled-components";
import { mobile, mobileM, tablet } from "../responsive";

const Container = styled.div``;

const Grid = styled.div``;
const ResultCard = styled.div`
  padding: 20px;
  background: #f8f8f8c5;
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
const Controls = styled.div``;

//
const Button = styled.button`
  margin-top: 10px;
  padding: 10px 26px;
  background-color: #9dcebb55;
  color: #a17cc444;

  border-radius: 50px;
  text-transform: uppercase;
  font-weight: 700;
  display: inline-block;
  border: none;
  font-size: calc(8px + 1vmin);
  transition: all 0.3s ease;
  line-height: 1.1;
  &:disabled {
    background-color: #9db6ac7b;
    color: #b6b6b6;
  }
  /* &:hover {
    background-color: #9db6ac7b;
    color: #b6b6b6;
  } */
`;

const ResultCards = ({ movie }) => {
  //
  //1 not duplication
  const { addMovieToWatchlist, watchlist, watched } = useContext(GlobalContext);

  //2 here we will search if there is any object that has an idential object id o.id === movie.id
  let storedMovie = watchlist.find(
    (objectMovie) => objectMovie.id === movie.id
  );

  //5
  let storedMovieWatched = watched.find((o) => o.id === movie.id);

  /*
  
  
  */
  //3 disabled the possibility to duplicate a movie in the watchlist

  const watchlistDisabled = storedMovie ? true : false;
  /*
 this is going to be disabled if we have a movie inside the
  watchlist, so if we have a similar movie in the watchlist 
  it s going to be true, which means it s going to disabled
  the option to save it, but if it s false, meaning that we 
  dont have a similar movie in the watchlist, then it s going
  to show the option to save the movie.


  


  
 */

  //4 now go to the button "add to watchlist"
  //
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

          <H3>{movie.title}</H3>
          <H4>
            {movie.release_date ? movie.release_date.substring(0, 4) : "-"}
          </H4>
          {/*4 the button to add to the watchlist */}
          <Controls>
            <Button
              disabled={watchlistDisabled}
              onClick={() => addMovieToWatchlist(movie)}
            >
              add to watchlist
            </Button>
          </Controls>
        </ResultCard>
      </Grid>
    </Container>
  );
};

export default ResultCards;
