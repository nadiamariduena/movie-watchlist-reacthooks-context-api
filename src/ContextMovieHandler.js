import { createContext, useState, useEffect } from "react";
import axios from "axios";

//

//
const { REACT_APP_TMDB_KEY } = process.env;

//
//
const MoviessContext = createContext();
export function MoviessProvider({ children }) {
  //
  //
  const [playing, setPlaying] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [searchKey, setSearchKey] = useState("");

  const [movie, setMovie] = useState({ title: "Loading Movies" });

  // const [openMovieModalee, setOpenMovieModalee] = useState(false);

  //
  //
  //

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async (e) => {
    if (e) {
      e.preventDefault();
    }

    setQuery(e.target.value);

    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_TMDB_KEY}&language=en-US&sort_by=popularity.desc&page=1&include_adult=false&query=${e.target.value}`
    );

    console.log(data.results[0]);
    setMovies(data.results);
    setMovie(data.results[0]);

    if (data.results.length) {
      await fetchMovie(data.results[0].id);
    }
  };

  const fetchMovie = async (id) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}`
    );

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }

    setMovie(data);
  };

  const removeItem = (e) => {
    e.preventDefault(e);
    setSearchKey("");
    setMovies([]);
  };
  //
  //
  return (
    //

    //
    <MoviessContext.Provider
      value={{
        playing,
        setPlaying,
        trailer,
        setTrailer,
        query,
        setQuery,
        movie,
        setMovie,
        setMovies,
        movies,
        fetchMovies,
        fetchMovie,
        removeItem,
        //
        // openMovieModalee,
        // setOpenMovieModalee,
        //
      }}
    >
      {children}
    </MoviessContext.Provider>
  );
}
export default MoviessContext;
