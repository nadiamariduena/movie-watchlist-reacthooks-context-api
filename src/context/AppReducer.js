export default (state, action) => {
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
    default:
      return state;
  }
};
