<br>

## 🌴 🥥 FETCHING with AXIOS 🥭 🥥

<br>
<br>

#### Here's an example of how you can fetch movies using themoviedb API and axios inside a ReactJS application, with an onChange event inside an input and value={query}, as well as fetch and render a movie from the API using the react-youtube library:

<br>
<br>

**query** ✋ is the **state** _for the search <u>query</u> and is used to update the API URL in the useEffect hook. <br><br> **movies** \_is the state for the list of movies returned from the API_. <br><br> **The useEffect hook is used to fetch the movies from the API whenever the query state changes**. <br><br> The **input field** has its **value** <u>set to query</u> and its **onChange** event is used to update the **query** state with the **value** entered by the user.

<br>

<br>
<br>

```javascript
import React, { useState, useEffect } from "react";
import axios from "axios";
import YouTube from "react-youtube";

const API_KEY = "your_api_key";
const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=`;
const VIDEO_URL = `https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=${API_KEY}&language=en-US`;

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [videoId, setVideoId] = useState(null);

  //
  // 1 fetch the movies
  useEffect(() => {
    const fetchMovies = async () => {
      const result = await axios.get(`${API_URL}${query}`);
      setMovies(result.data.results);
    };
    fetchMovies();
  }, [query]);

  //
  // 2 fetch the videos of the movies
  useEffect(() => {
    const fetchVideoId = async () => {
      // if there is no movie stopped it!
      if (!selectedMovie) {
        return;
      }
      //
      const result = await axios.get(
        `${VIDEO_URL.replace("{movie_id}", selectedMovie.id)}`
      );
      setVideoId(result.data.results[0].key);
    };
    fetchVideoId();
  }, [selectedMovie]);

  return (
    <div>
      // 3 ✋ the input
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      // 4 The mapping of the movies
      <ul>
        {movies.map((movie) => (
          <li key={movie.id} onClick={() => setSelectedMovie(movie)}>
            {movie.title}
          </li>
        ))}
      </ul>
      // 5 the VIDEO ✋
      {selectedMovie && (
        <div>
          <h2>{selectedMovie.title}</h2>
          <p>{selectedMovie.overview}</p>
          {videoId && <YouTube videoId={videoId} />}
        </div>
      )}
    </div>
  );
}

export default App;
```

<br>
<br>

> In the example above, the states **selectedMovie** and **videoId** are added <u>to store the selected movie and its video ID</u> , respectively. <br><br> The useEffect hook is used to fetch the video ID of the selected movie whenever the selectedMovie state changes. The react-youtube component is used to render the YouTube video of the selected movie, if a video ID is available.

<br>
<br>
