### Create a Movie Watchlist with React Hooks, Context API and localStorage

> In this tutorial we'll be creating a movie watchlist using React, implementing **React Hooks**, **Context API**, **storing data in localStorage** and **fetching data** from an external **API** (The Movie Database).

<br>

##### the tutorial: [Movie Watchlist](https://youtu.be/1eO_hNYzaSc)

<br>

## Useful links: 🐖

[fontawesome](https://fontawesome.com/docs/web/use-with/react/)

<br>

#### READ MORE ABOUT .env [Using environment variables in a React applicatio](https://adostes.medium.com/using-environment-variables-in-a-react-application-ac3b6c307373)

<br>
<br>

---

<br>
<br>

[<img src="./src/img/disabled-button-workin.gif"/>]()

<br>
<br>

## Saving the Search 🥭

##### Right now when we search for a movie and then we save it, we see that when we refresh it, we lose that watchlist

<br>

- So what we want to do now is that every time we refresh the page, we want our **watchlist** to stay where it is.

<br>

- Go to the context inside the **GlobalState.js** , there use the **useEffect**

<br>

## useEffect

> The useEffect is triggered whenever the **state** is changed inside our provider, so whenever a movie is added to our watchlist, this **useEffect** function here is triggered.

<br>
<br>

## LocalStorage

> We use LocalStorage because we are not using DATABASE

<br>

#### 1. Whenever this useEffect is triggered, we want to save this watchlist to our localStorage

```javascript
useEffect(() => {
  localStorage.setItem("watchlist");
});
//
```

#### ⚠️ 2. local storage has to be a string, so what we are going to do, is to convert this array into a json string, with this: JSON.stringify()

<br>

```javascript
useEffect(() => {
  localStorage.setItem("watchlist", JSON.stringify());
});
//
```

<br>

##### 3. Now inside the JSON.stringify() , we are going to pass what we want actually to convert to a string, in this case, the state.watchlist

<br>

```javascript
useEffect(() => {
  localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
});
```

<br>

#### 4. Then we pass here the state here: }, [state]);, since we are accessing that state

```javascript
useEffect(() => {
  localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
}, [state]);
```

<br>

[<img src="./src/img/localstorage-saving-movie-to-watchlist.gif"/>]()

<br>
<br>

### 5. At this moment if we refresh the page, we are not making use of that localStorage yet, so what we are doing next, is that we are going to make that <u>initial state</u> take the value when it first loads from out localStorage items

<br>

- Here **watchlist: [],** we are going to check if there is anything stored in our local storage, so if there is something we are going to return a parsed array, this one: **JSON.parse(localStorage.getItem("watchlist")**, but if there isnt, we are going to return an empty array **: [],** , repeat the same for the **watched**

```javascript
//      BEFORE
//

const initialState = {
  //1 at the beginning we have nothing, its an empty array
  watchlist: [],
  // 2. then we will make the 'watched' component
  // its also going to be empty
  watched: [],
};

//
//
//      AFTER
const initialState = {
  /*
  
  
  Here **watchlist: [],** we are going to check if there is anything stored in our local storage, so if there is something we are going to return a parsed array, this one: **JSON.parse(localStorage.getItem("watchlist")**, but if there isnt, we are going to return an empty array **: [],** , repeat the same for the **watched**
  
  
  */
  watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist"))
    : [],
  //

  watched: localStorage.getItem("watched")
    ? JSON.parse(localStorage.getItem("watched"))
    : [],
};
```

<br>
<br>

#### 6. Go back to the useEffect and duplicate the line inside and modify it like so:

```javascript
useEffect(() => {
  localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
  //
  //
  localStorage.setItem("watched", JSON.stringify(state.watched));

  //
}, [state]);
//
//
```

<br>
<br>

#### 7. Now with this when we go back and search for a movie and then save, we will notice that when we save a movie, its impossible to re save it and also when we refresh the same movie is disabled, so that we cannot save it again.

<br>

[<img src="./src/img/localstorage-saved-movie-even-after-refresh.gif"/>]()

<br>
<br>
<br>

---

<br>
<br>

# 🍰

## Display the Watchlist

<br>

#### Go to the Watchlist.jsx

> To access the Logic of our **movie Context** inside the **GlobalState.js**, we have to first import the **context**

<br>

## 1. Access the Context ✋

```javascript
import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
```

<br>

#### 2. Access the watchlist using Context

```javascript
export const WatchList = () => {

  // Accessing the context here:
  const { watchlist } = useContext(GlobalContext);

```

<br>

##### 3. mapping the watchlist from the context

- We can either start the **mapping** inside the **WatchList.jsx** or proceed to create first the **Card** for the WatchList, In my case i will create the card first (I just have to copy the styles and the content of the ResultCard.jsx, then modify it accordingly).

<br>

```javascript
import React from "react";
import styled from "styled-components";
import { mobile, mobileM, tablet } from "../responsive";

//
//
// ** This is the Card linked to Watchlist **
//

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
//
const WatchedMovieCard = ({ movie, type }) => {
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
        </ResultCard>
      </Grid>
    </Container>
  );
};

export default WatchedMovieCard;
```

<br>
<br>

## .map 👍

#### 4. Now lets import the above component and map the card we just created

```javascript
import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import WatchedMovieCard from "./WatchedMovieCard";
import styled from "styled-components";
import { mobile, mobileM, tablet } from "../responsive";

//
//
//
//
const WrapperContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  padding: 0 0 100px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div``;

//
//
const Content = styled.div`
  width: 100vw;
  min-height: 4vh;
  padding: 0px 0 20px 0;
  text-align: center;
`;

const Ul = styled.ul`
  padding: 5em 7.5em;
  display: grid;
  grid-gap: 2em;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`;
//

//
//

export const WatchList = () => {
  //
  // Accessing the context here:
  const { watchlist } = useContext(GlobalContext);

  //
  //
  return (
    <>
      <WrapperContainer>
        <Container>
          <Content>
            <Ul className="results">
              ✋{" "}
              {watchlist.map((movie) => (
                <li key={movie.id}>
                  <WatchedMovieCard movie={movie} type="watchlist" />
                </li>
              ))}
            </Ul>
          </Content>{" "}
        </Container>
      </WrapperContainer>
    </>
  );
};
```

<br>
<br>

# Conditional ? () :

# 🌞

#### 5. Return a message "no movies in the watchlist" using a conditional

- **WatchList.jsx**

<br>

```javascript
{
   ✋ watchlist.length > 0 ? (
    <Ul className="results">
      {watchlist.map((movie) => (
        <li key={movie.id}>
          <WatchedMovieCard movie={movie} type="watchlist" />
        </li>
      ))}
    </Ul>
  ) : (
    <div>No Movies, in your List 👍 </div>
  );
}
```

<br>
<br>

---

<br>
<br>

# 🌵

# Controls

#### 1. In this section we will be handling the controls that will take care of the removing movies or adding to the watchlist

<br>

- Create a new component for the controls, call it: **MovieControls.jsx**

<br>

- Pass the props: **movie and type** , just like we did with the card above

<br>

```javascript
//
const MovieControls = ({ movie, type }) => {
  return (
    <>
      <WrapperContainer>
        <Container>
          <Content>
            {type === "watchlist" && (
              <>
                <button className="ctrl-btn">
                  <i className="fa-fw far fa-eye"></i>
                </button>
                {/*  */}
                <button className="ctrl-btn">
                  <i className="fa-fw fa fa-times"></i>
                </button>
              </>
            )}
          </Content>
        </Container>
      </WrapperContainer>
    </>
  );
};
```

<br>
<br>

#### 2. Import the component above inside the WatchedMovieCard.jsx

<br>

```javascript
import MovieControls from "./MovieControls";
```

- Use it here:

```javascript

          <MovieControls type={type} movie={movie} />
        </ResultCard>
```

[<img src="./src/img/buttons-1.gif"/>]()

<br>
<br>

#### Before implementing the removing functionality, this is what we have [button data](./button.md) ✋

<br>
<br>
<br>

## Removing movie

<br>

- To remove the movie we will need to make an **action**, so lets go back to the **GlobalState.js**

#### 3. create a new dispatch type, as we did in step 8 of the GlobalState.js file

```javascript
// ------- actions ----------
//10 action related to the removal of the movie in the watchlist
//here we dont need the full movie , we just need the id
const removeMovieFromWarchlist = (id) => {
  dispatch({ type: "REMOVE_MOVIE_TO_WATCHLIST", payload: id });
};
```

<br>

#### 4. now we need to bring this function: removeMovieFromWarchlist, to be exported in the GlobalContext.Provider, so that this too can be accessed from other components

<br>

```javascript
 return (
    <GlobalContext.Provider
      value={{
        watchlist: state.watchlist,
        watched: state.watched,
        addMovieToWatchlist,
        removeMovieFromWarchlist, ✋
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
```

<br>
<br>

#### 5. Once this is done we need to tell the Reducer what to do, so lets go to the AppReducer.js

- this is going to return all of the movies that are not equal to the id we are passing here below from the state

```javascript
✋
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
```

<br>
<br>

#### 6. now that we have the action in both 'the appReducer and the GlobalState', we can add it inside the MovieControl.js

<br>

- import react contex

```javascript
import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
```

<br>
