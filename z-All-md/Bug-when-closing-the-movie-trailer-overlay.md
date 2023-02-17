## Bug when closing the <u>movie trailer</u> overlay

<br>

- I am fetching the **movies** and related **movie trailers** from the **themoviedb API** using two different functions that are inside a useEffect hook.

<br>

> Everything works fine, but there is a **bug** that occurs when I type something into the **search input**.

-The API renders the results and shows them inside an overlay with the path "ResultCardsHome".

<br>

- When I click on an image in the search results, it opens another overlay that displays the movie's description, along with a button to close the overlay and a button to launch the trailer.

<br>

#### 🔴 the issue

> The problem is that when I click the play button to launch the trailer, it works and plays the movie, but if I close the overlay and select another movie, the overlay opens with the correct movie description, but if I click the play button with the code mentioned before, it will play the previous movie. However, if I click the play button again, it will play the current movie.

<br>

https://user-images.githubusercontent.com/58809268/219629595-89aa0e1e-5293-40e9-a492-dd61cd365a50.mp4

<br>
<br>

### Looking for solutions

- After looking for a solution i found the following, it s not bas but i didnt want to re structure everything

```javascript
 mport React, { useState, useEffect, createContext, useCallback } from 'react';
import axios from 'axios';

export const MovieContext = createContext();

const apiKey = 'your_api_key_here';

const MovieContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchMovies = useCallback(async () => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
    setMovies(response.data.results);
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const setSelectedMovieById = useCallback((movieId) => {
    const movie = movies.find((movie) => movie.id === movieId);
    setSelectedMovie(movie);
  }, [movies]);

  return (
    <MovieContext.Provider value={{ movies, selectedMovie, setSelectedMovieById }}>
      {children}
    </MovieContext.Provider>
  );
};
```

<br>
<br>

### what solved it

- i just had to add this **setVideoId();**, now it plays the current movie trailer

<br>

```javascript
const handleCloseModal = (e) => {
  e.preventDefault(e);
  setCloseModi();
  history.push("/ResultCardsHome"); // works

  // history.push(""); // also works -- Go back to the previous URL without the movie ID
  // history.goBack();
  //
  // setMovies([]);// if you add this, specifically inside the overlay with the movie trailer, you will be send to the home page instead of the resultsCardsHome once you close the overlay.
  //
  //
  // if you don't add this setVideoId(), when you will click in another movie, you will see the same previous video, and not only that, it will be launched without even have to click on "play", which is not good. so kill the process by adding the setVideoId() or setVideoId(null)
  setVideoId(); ✋
};
```

<br>
<br>

### ✋ The setVideoId is coming from the context

- So i had to import it from there, then pass it inside the **add.js** and from there to the **ResultsCardHome**

<br>

```javascript
//
const {
  query,
  setQuery,
  movies,
  //video trailer
  selectedMovie,
  setSelectedMovie,
  videoId,
  setVideoId,
  //
  removeItem,

  //
} = useContext(MovieeContext);
```

<br>

```javascript
{
  movies.map((moviearg) => (
    <li key={moviearg.id}>
      <ResultCards
        // useHISTORY

        //
        moviearg={moviearg}
        selectedMovie={selectedMovie}
        setSelectedMovie={setSelectedMovie}
        videoId={videoId}
        // ✋
        setVideoId={setVideoId}
      />
    </li>
  ));
}
```

<br>
<br>

```javascript

//
const ResultCardsHome = ({
  videoId,
  selectedMovie,
  setSelectedMovie,
  moviearg,
  //close modal history+
  setMovies,
  setVideoId,
}) => {
  //
  //

  //
  const history = useHistory();
  // ** if you add the useHistory in the context it will not work
  const [closeModi, setCloseModi] = useState(false);

  const handleCloseModal = (e) => {
    e.preventDefault(e);
    setCloseModi();
    history.push("/ResultCardsHome"); // works

    // history.push(""); // also works -- Go back to the previous URL without the movie ID
    // history.goBack();
    //
    // setMovies([]);// if you add this, specifically inside the overlay with the movie trailer, you will be send to the home page instead of the resultsCardsHome once you close the overlay.
    //
    //
    // if you don't add this setVideoId(), when you will click in another movie, you will see the same previous video, and not only that, it will be launched without even have to click on "play", which is not good. so kill the process by adding the setVideoId() or setVideoId(null)
    setVideoId();
  };

  //

  return (
    <>
      {closeModi ? (
        <WrapperVidDescript>
          <ContainerDescript>
            <MovieTitleModal>{moviearg.title}</MovieTitleModal>
            <button onClick={handleCloseModal}>kekek</button>
```

<br>
<br>

### Route bug on overlay 1 solved

- I realized that I didn't need to change much of the code, as there was only one function that needed to be moved from the context to Add.js. This function didn't work in the context but worked inside Add.js, so I just had to update the route on the location. I was too distracted to see this before.

<br>

- I moved the following function to the Add.js

```javascript
const history = useHistory();
//
// ** button remove
const removeItem = (e) => {
  e.preventDefault(e);
  // 👍 added the Home path
  history.push("/");

  //
  setQuery("");
  setMovies([]);

  // setVideoId();
};
//
```

### 🍰 To be used like so:

- You have to clickable items, the bg and the button

```javascript

  return (
    <>
      <AddPage>
        <Input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {movies.length ? (
          <>
          // ✋ here
            <Link to="/">
              <ClickableOverlay onClick={removeItem} />
            </Link>
            <Ul
              style={{ zIndex: "700", pointerEvents: "all" }}
              className="results"
            >
              {movies.map((moviearg) => (
                <li key={moviearg.id}>
                  <ResultCards
                    // useHISTORY

                    //
                    moviearg={moviearg}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    videoId={videoId}
                    setVideoId={setVideoId}
                  />
                </li>
              ))}
            </Ul>

// ✋
            <ButtonCloseOverlay
              //  onClick={() => setMovies(!movies)}
              onClick={removeItem}
            >
              <CgClose />
            </ButtonCloseOverlay>
          </>
        ) : null}
      </AddPage>
    </>
  );
};
```


https://user-images.githubusercontent.com/58809268/219755474-57beee51-afac-4fd2-a4ba-50e45afb34ef.mp4

