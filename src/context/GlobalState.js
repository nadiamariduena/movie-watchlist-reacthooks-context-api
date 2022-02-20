//1
import React, { createContext, useReducer, useEffect } from "react";
//6
import { AppReducer } from "./AppReducer";

//
//
//2
const initialState = {
  //1 at the beginning we have nothing, its an empty array
  watchlist: [],
  //
  // 2. then we will make the 'watched' component
  // its also going to be empty
  watched: [],
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

  // 7 wrap with the GlobalContext.Provider all of the elements of the application
  // so that we can access the global context from every component
  return (
    <GlobalContext.Provider value={{ watchlist: state.watchlist }}>
      {props.children}
    </GlobalContext.Provider>
  );
  //
  //
};
