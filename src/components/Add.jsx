import React, { useState } from "react";
import styled from "styled-components";
import ResultCards from "./ResultCards";
import { CiSearch } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";

//
const { REACT_APP_TMDB_KEY } = process.env;

const AddPage = styled.div`
  width: 100%;
`;

const ClickableOverlay = styled.div`
  width: 100vw;
  min-height: 100vh;
  padding: 0 0 100px 0;

  //
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  cursor: pointer;
  //

  // ** BG + square gradient

  // ** squared pattern
  background-image: linear-gradient(#e8e4d8 1px, transparent 1px),
    linear-gradient(to right, #e8e4d8 1px, transparent 1px);
  background-size: 39px 39px;
  background-color: #ffffff;
`;

//
const Ul = styled.ul`
  margin: 150px auto 0 auto;
  width: 80%;
  padding: 100px 100px 0 100px;

  grid-template-columns: repeat(4, 1fr);
  display: grid;
  grid-gap: 2.8em;

  //
  background-color: #fefefe;
  border-radius: 50px;

  position: absolute;
  top: 1%;
  left: 10.5%;
  z-index: 10;

  //
  // ** squared pattern
`;
//
//
const InputWrapper = styled.div`
  padding: 10px 0px;
  margin: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const Input = styled.input`
  padding: 18px 26px;
  border-radius: 5rem;
  border: 0;
  text-align: center;
  color: rgba(142, 182, 203, 0.496);
  border: 3px solid rgba(142, 182, 203, 0.496);

  //

  //
  &::placeholder {
    color: rgba(142, 182, 203, 0.596);
  }
`;

//
//
export const Add = () => {
  //
  //
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  //
  const onChange = (e) => {
    e.preventDefault();
    //
    //
    setQuery(e.target.value);
    //
    //API
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${e.target.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        // if there is not errors, then show results
        if (!data.errors) {
          setResults(data.results);
          console.log(data);
        } else {
          // if there are errors, show empty array
          setResults([]);
        }
      });
  };

  //
  const removeItem = (e) => {
    e.preventDefault(e);
    setQuery("");
    setResults([]);
  };
  //
  return (
    <>
      <AddPage>
        <InputWrapper>
          <Input
            type="text"
            placeholder="SEARCH"
            value={query}
            onChange={onChange}
          />
        </InputWrapper>

        {results.length > 0 && (
          <>
            <ClickableOverlay onClick={removeItem} />
            <Ul className="results">
              {results.map((movie) => (
                <li key={movie.id}>
                  <ResultCards movie={movie} />
                </li>
              ))}
            </Ul>
          </>
        )}
      </AddPage>
    </>
  );
};
