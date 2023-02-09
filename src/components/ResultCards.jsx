import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import styled from "styled-components";
import { mobile, mobileM } from "../responsive";

//
//
//
const Container = styled.div``;

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

const ResultCards = ({ movie }) => {
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
  //
  //4 now go to the button "add to watchlist"
  //
  return (
    <Container>
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

          <H3>{movie.title}</H3>
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
  );
};

export default ResultCards;
