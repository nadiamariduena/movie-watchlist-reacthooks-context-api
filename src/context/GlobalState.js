//1
import React, { createContext, useReducer, useEffect } from "react";
//6
import AppReducer from "./AppReducer";

//
//
//2
const initialState = {
  //1 at the beginning we have nothing, its an empty array
  watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist"))
    : [],
  //
  // 2. then we will make the 'watched' component
  // its also going to be empty
  watched: localStorage.getItem("watched")
    ? JSON.parse(localStorage.getItem("watched"))
    : [],
};
//
//
//3 CREATE CONTEXT
export const GlobalContext = createContext(initialState);

//
//4 provider is going to allow us to access this global context from other variables

export const GlobalProvider = (props) => {
  // 5
  const [state, dispatch] = useReducer(AppReducer, initialState);
  //
  // 9 useEffect , we will use this to save our search, so that we refresh
  // we dont lose the saved movie in the watchlist

  useEffect(() => {
    // Whenever this useEffect is triggered, we want to save this watchlist to our localStorage

    localStorage.setItem("watchlist", JSON.stringify(state.watchlist));

    //
    localStorage.setItem("watched", JSON.stringify(state.watched));

    //
    //
  }, [state]);
  //
  // 8 ACTION
  //   this is going to be provided with the movie data here: (movie) =>
  const addMovieToWatchlist = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
  };

  //
  //
  //
  // 7 wrap with the GlobalContext.Provider all of the elements of the application
  // so that we can access the global context from every component
  return (
    <GlobalContext.Provider
      value={{
        watchlist: state.watchlist,
        watched: state.watched,
        addMovieToWatchlist,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
  //
  //
};
