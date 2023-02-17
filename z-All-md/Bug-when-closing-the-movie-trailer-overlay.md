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
