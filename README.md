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

#### Whenever this useEffect is triggered, we want to save this watchlist to our localStorage

```javascript
useEffect(() => {
  localStorage.setItem("watchlist");
});
//
```

#### ⚠️ local storage has to be a string, so what we are going to do is to convert this array json array to a string.
