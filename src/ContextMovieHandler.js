import { createContext, useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";

//

// coming from the .env
const { REACT_APP_TMDB_KEY } = process.env;
//
const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_TMDB_KEY}&language=en-US&query=`;
const VIDEO_URL = `https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=${REACT_APP_TMDB_KEY}&language=en-US`;
//
//
const MoviessContext = createContext();
export function MoviessProvider({ children }) {
  //

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const result = await axios.get(`${API_URL}${query}`);
      setMovies(result.data.results);
    };
    fetchMovies();
  }, [query]);

  // ** fetching the video
  useEffect(() => {
    const fetchVideoId = async () => {
      if (!selectedMovie) {
        return;
      }
      const result = await axios.get(
        `${VIDEO_URL.replace("{movie_id}", selectedMovie.id)}`
      );
      setVideoId(result.data.results[0].key);
    };
    fetchVideoId();
  }, [selectedMovie]);

  //
  // -------- video size
  // const iframeRef = useRef<HTMLIFrameElement>(null);
  // since we I already have the state in line 20, you can add it inside the url path, the add this value to the new variable, this videoURL variable will carry the data that you will pass in line 134, from there you will send it to the Movie.js component
  const videoURL = `https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://localhost:2280/"
  frameborder="0"`;
  // try to publish
  //
  const iframeRef = useRef();
  // ** default height
  // change this depending of the project you have
  const defaultHeight = 695;
  //
  const [videoHeight, setVideoHeight] = useState(
    iframeRef.current ? iframeRef.current.offsetWidth * 0.5625 : defaultHeight
  );
  //
  //
  //
  const handleChangeVideoWidth = useCallback(() => {
    const ratio =
      window.innerWidth > 990
        ? 1.0
        : window.innerWidth > 522
        ? 1.2
        : window.innerWidth > 400
        ? 1.45
        : 1.85;
    const height = iframeRef.current
      ? iframeRef.current.offsetWidth * 0.5625
      : defaultHeight;
    return setVideoHeight(Math.floor(height * ratio));
  }, []);

  //
  //
  useEffect(() => {
    window.addEventListener("resize", handleChangeVideoWidth);
    const ratio =
      window.innerWidth > 990
        ? 1.0
        : window.innerWidth > 522
        ? 1.2
        : window.innerWidth > 400
        ? 1.45
        : 1.85;
    const height = iframeRef.current
      ? iframeRef.current.offsetWidth * 0.5625
      : defaultHeight;
    setVideoHeight(Math.floor(height * ratio));
    return function cleanup() {
      window.removeEventListener("resize", handleChangeVideoWidth);
    };
  }, [videoHeight, handleChangeVideoWidth]);
  /*









  */
  const removeItem = (e) => {
    e.preventDefault(e);
    setQuery("");
    setMovies([]);
    // if you don't add this setVideoId(), when you will click in another movie, you will see the same previous video, and not only that, it will be launched without even have to click on "play", which is not good. so kill the process by adding the setVideoId() or setVideoId(null)
    setVideoId();
  };
  //
  //
  return (
    //

    //
    <MoviessContext.Provider
      value={{
        query,
        setQuery,
        movies,
        setMovies,
        selectedMovie,
        setSelectedMovie,
        videoId,
        setVideoId,
        //
        removeItem,
        //
        //  resize video
        videoHeight,
        setVideoHeight,
        iframeRef,
        videoURL,
      }}
    >
      {children}
    </MoviessContext.Provider>
  );
}
export default MoviessContext;
