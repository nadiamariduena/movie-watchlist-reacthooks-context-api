export default (state, action) => {
  switch (action.type) {
    case "ADD_MOVIE_TO_WATCHLIST":
      return {
        // 1  here we will return the existing state "...state"
        ...state,
        //2 and then we want to make some changes to the state
      };
    default:
      return state;
  }
};
