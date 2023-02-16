import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import WatchedMovieCard from "./WatchedMovieCard";
import { mobile, mobileM, tablet, laptop } from "../responsive";
import { AnimatePresence, motion } from "framer-motion";

//
import styled from "styled-components";

const WrapperContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  // ** squared pattern
  background-image: linear-gradient(#e8e4d8 1px, transparent 1px),
    linear-gradient(to right, #e8e4d8 1px, transparent 1px);
  background-size: 39px 39px;
  background-color: #ffffff;
`;

//
const Content = styled.div`
  width: 100%;
  padding: 0 0 150px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    padding: 20vh 0 60px 0;
    font-weight: 600;
    font-size: calc(20px + 2vmin);
    font-family: "Poppins-Light";
    color: rgba(142, 182, 203, 0.496);
    text-align: center;
  }
  //
`;

const Ul = styled.ul`
  width: 80%;
  padding: 100px 100px 180px 100px;
  margin: 30px auto 0 auto;
  //
  grid-template-columns: repeat(4, 1fr);
  display: grid;
  grid-gap: 3em;
  //

  background-color: #fefefe;
  border-radius: 50px;
  border: 1px solid #eee;
  //
  ${mobile({
    width: "100%",
    gridTemplateColumns: `repeat(1, 1fr)`,
    padding: "100px 10px 180px 10px",
    gridGap: "0.9em",
  })}
  ${mobileM({
    width: "90%",
    gridTemplateColumns: `repeat(2, 1fr)`,
    padding: "100px 15px 180px 15px",
    gridGap: "0.9em",
  })}
  ${tablet({
    width: "85%",
    gridTemplateColumns: `repeat(3, 1fr)`,
    padding: "100px 20px 180px 20px",
    gridGap: "1.8em",
  })}
    ${laptop({
    width: "85%",
    gridTemplateColumns: `repeat(3, 1fr)`,
    padding: "100px 20px 180px 20px",
    gridGap: "2.5em",
  })}
`;

export const Watched = () => {
  //
  //
  const { watched } = useContext(GlobalContext);

  //
  //
  return (
    <>
      <WrapperContainer>
        <Content>
          <h1>Watched Movies</h1>

          {watched.length > 0 ? (
            <Ul className="results">
              {watched.map((movie) => (
                <motion.li key={movie.id}>
                  <WatchedMovieCard movie={movie} type="watched" />
                </motion.li>
              ))}
            </Ul>
          ) : (
            <div>No Movies, in your List</div>
          )}
        </Content>
      </WrapperContainer>
    </>
  );
};

export default Watched;
