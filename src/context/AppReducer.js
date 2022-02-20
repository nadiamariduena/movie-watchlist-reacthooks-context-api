export default (state, action) => {
  switch (action.type) {
    case "ADD_MOVIE_TO_WATCHLIST":
      return {
        // 1  here we will return the existing state "...state"
        ...state,
        //2 and then we want to make some changes to the state
        watchlist: [action.payload],
        // 3 the action.payload here above,
        // is the one containing the movie data in the GlobalState.js
      };
    default:
      return state;
  }
};
