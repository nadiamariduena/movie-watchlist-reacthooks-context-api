import React, { useContext, useRef } from "react";
import MovieeContext from "../ContextMovieHandler.js";

const Movie = () => {
  //
  const {
    //  resize video
    videoHeight,
    iframeRef,
    videoURL,
  } = useContext(MovieeContext);

  //

  //
  //

  return (
    <>
      <iframe
        title="videoMovie"
        ref={iframeRef}
        width="100%"
        height={`${videoHeight}px`}
        src={videoURL}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </>
  );
};

export default Movie;
