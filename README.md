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
