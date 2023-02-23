import React, { useState, useContext } from "react";
import MovieesContext from "../ContextMovieHandler.js";
import { Link } from "react-router-dom";

//

import { mobile, mobileM, tablet, laptop, laptopM } from "../responsive";
import styled from "styled-components";
import { CgClose } from "react-icons/cg";
//
import { motion } from "framer-motion";
//

const defaultImg =
  "https://images.pexels.com/photos/4286932/pexels-photo-4286932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
//
//
//

const AddPage = styled.div``;
const ClickableOverlay = styled.div`
  width: 100vw;
  min-height: 200vh;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  cursor: pointer;

  //

  background-image: linear-gradient(#e8e4d8 1px, transparent 1px),
    linear-gradient(to right, #e8e4d8 1px, transparent 1px);
  background-size: 39px 39px;
  background-color: #fefefe;
`;

//
const Ul = styled.ul`
  padding: 100px 100px 200px 100px;
  margin: 30px auto 0 auto;
  width: 80%;

  grid-template-columns: repeat(4, 1fr);
  display: grid;
  grid-gap: 2.8em;

  //

  border-radius: 50px;

  position: absolute;
  top: 12%;
  left: 10.5%;
  z-index: 10;

  ${mobile({
    left: "0",
    width: "100%",
    gridTemplateColumns: `repeat(1, 1fr)`,
    padding: "100px 0px 180px 0px",
    gridGap: "0.9em",
    // background: "red",
  })}
  ${mobileM({
    left: "2.5%",
    width: "90%",
    gridTemplateColumns: `repeat(1, 1fr)`,
    padding: "100px 15px 180px 15px",
    gridGap: "0.9em",
  })}
${tablet({
    width: "85%",
    left: "4.5%",
    gridTemplateColumns: `repeat(2, 1fr)`,
    padding: "100px 20px 180px 20px",
    gridGap: "1.8em",
  })}
${laptop({
    width: "85%",
    gridTemplateColumns: `repeat(3, 1fr)`,
    padding: "100px 20px 180px 20px",
    gridGap: "2.5em",
  })}
  ${laptopM({
    width: "85%",
    gridTemplateColumns: `repeat(3, 1fr)`,
    padding: "100px 20px 180px 20px",
    gridGap: "2.5em",
  })}
`;
//
//

const Input = styled.input`
  padding: 18px 26px;
  border-radius: 5rem;
  border: 0;
  text-align: center;
  font-size: calc(2px + 1vmin);
  //
  background-color: rgba(251, 251, 251, 2.196);
  color: rgba(87, 87, 87, 0.4);

  // ** border btn input
  border: 2px solid rgba(248, 248, 248, 0.196);
  border-left: 3px solid rgba(248, 248, 248, 0.496);
  border-right: 3px solid rgba(248, 248, 248, 0.496);

  &:hover {
    -webkit-box-shadow: 28.5px 3px 26.5px 6.5px #f1f1f1;
    -moz-box-shadow: 28.5px 3px 26.5px 6.5px #f1f1f1;
    box-shadow: 28.5px 3px 26.5px 6.5px #f1f1f1;
  }

  transition: all 0.8s ease-in-out;

  -webkit-box-shadow: -1px 8px 32px 1px #e4e4dd;
  -moz-box-shadow: -1px 8px 32px 1px #e4e4dd;
  box-shadow: -1px 8px 32px 1px #e4e4dd;

  //
  &:focus-within {
    background-color: rgba(248, 248, 248);
    font-size: calc(2px + 1vmin);
  }
  &::placeholder {
    color: rgba(87, 87, 87, 0.2);
    letter-spacing: 1px;
    font-size: calc(8px + 1vmin);
  }

  ${mobile({
    padding: "16px 10px",
    fontSize: `calc(8px + 1vmin)`,

    "&::placeholder": { fontSize: `calc(10px + 1vmin)` },
  })}
  ${mobileM({
    padding: "16px 10px",
    fontSize: `calc(8px + 1vmin)`,
    "&::placeholder": { fontSize: `calc(10px + 1vmin)` },
  })}
`;
const ButtonCloseOverlay = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  //
  position: fixed;
  bottom: 2.5%;
  right: 2.5%;
  z-index: 10;

  width: 45px;
  height: 45px;
  border-radius: 100px;
  border: none;
  display: block;
  background-color: #fefefe;
  color: #b6b6b6;
  box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;

  &:hover {
    cursor: pointer;
    background-color: #fafafa;
    color: #282828;
  }
  ${mobileM({
    bottom: "30px",
    right: "7.5%",
  })}
`;
//---------
//
//

// ** outer modal
//
const Grid = styled.div``;
const ResultCard = styled.div`
  padding: 20px;

  text-align: center;
  width: 100%;
  height: auto;
  border-radius: 30px;
`;

const ImgBox = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;

  box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff;
  border-radius: 30px;

  //
  //
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: hsla(203, 30%, 73%, 0.352);
    display: block;

    //
  }

  ${mobileM({ width: "78%", margin: "0 auto" })}
  ${tablet({ width: "78%", margin: "0 auto" })}


  img {
    display: block;
    width: 100%;
    min-height: auto;
    object-fit: cover;
    //
  }
`;

//
//----------

const Add = () => {
  //
  const {
    query,
    setQuery,
    movies,
    setMovies,
    //video trailer
  } = useContext(MovieesContext);

  //
  // const navigate = useNavigate();
  // let location = useLocation();
  //
  // ** button remove
  const removeItem = (e) => {
    e.preventDefault(e);
    // navigate.push("/");
    setQuery("");
    setMovies([]);
    // console.log(location);
    // setVideoId();
  };
  //

  return (
    <>
      <AddPage>
        <Input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {movies.length > 0 ? (
          <>
            <Link to="/">
              <ClickableOverlay onClick={removeItem} />
            </Link>

            <Ul
              style={{ zIndex: "700", pointerEvents: "all" }}
              className="results"
            >
              {movies.map((moviearg) => (
                <li key={moviearg.id}>
                  <Link to={`/rainbow/${moviearg.id}`}>
                    {/* <p>{moviearg.title} </p> */}

                    <Grid>
                      <ResultCard>
                        {moviearg.poster_path ? (
                          <>
                            <ImgBox

                            // as={motion.div}
                            // initial={{
                            //   y: 200,
                            //   opacity: 0,
                            // }}
                            // animate={{ y: 0, opacity: 1 }}
                            // transition={{
                            //   delay: 0.08,
                            //   type: "spring",
                            //   damping: 8,
                            // }}
                            >
                              <img
                                // defaultImg
                                src={
                                  moviearg.poster_path
                                    ? `https://image.tmdb.org/t/p/w200${moviearg.poster_path}`
                                    : defaultImg
                                }
                                alt={`${moviearg.title} Poster`}
                              />
                            </ImgBox>
                          </>
                        ) : null}
                      </ResultCard>
                    </Grid>
                  </Link>

                  {/* <ResultCards
                    // useHISTORY

                    //
                    moviearg={moviearg}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    videoId={videoId}
                    setVideoId={setVideoId}
                  /> */}
                </li>
              ))}
            </Ul>

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
//
export default Add;
