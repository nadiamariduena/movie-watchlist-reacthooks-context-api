const appReduc = (state, action) => {
  switch (action.type) {
    case "ADD_MOVIE_TO_WATCHLIST":
      return {
        // 1  here we will return the existing state "...state"
        ...state,
        //2 and then we want to make some changes to the state
        watchlist: [action.payload, ...state.watchlist],
        // 3 the action.payload here above,
        // is the one containing the movie data in the GlobalState.js
      };

    //
    // related to movie removal btn
    case "REMOVE_MOVIE_TO_WATCHLIST":
      return {
        // 1
        ...state,
        //2
        // this is going to return all of the movies that are not equal
        // to the id we are passing here below from the state
        watchlist: state.watchlist.filter(
          (movie) => movie.id !== action.payload
        ),
      };
    //
    //
    case "ADD_MOVIE_TO_WATCHED":
      return {
        // 1
        ...state,
        //2
        //here we need to remove a movie from the watchlist
        //and then we need to add it to the watch component
        watchlist: state.watchlist.filter(
          //action.payload.id this is going to return the movies,
          //that  arent equal to the new movies we are adding.
          //so its removing it from the watchlist
          (movie) => movie.id !== action.payload.id
        ),
        //3 then after removing from the watchlist in step 2, we want to add it
        //to the watched list, as you notice, the line
        //below is similar to the one in the case "ADD_MOVIE_TO_WATCHLIST":
        watched: [action.payload, ...state.watched],
        //
        //
      };
    //
    //------------------------------------
    //
    case "MOVE_TO_WATCHLIST":
      return {
        // 1
        ...state,
        //2

        watched: state.watched.filter(
          (movie) => movie.id !== action.payload.id
        ),
        //  this will add the movie back to our front of the watchlist
        watchlist: [action.payload, ...state.watchlist],
        //
        //
      };
    //
    //

    case "REMOVE_FROM_WATCHED":
      return {
        // 1
        ...state,
        //2
        watched: state.watched.filter((movie) => movie.id !== action.payload),

        //
        //
      };
    //
    //
    default:
      return state;
  }
};
export default appReduc;
