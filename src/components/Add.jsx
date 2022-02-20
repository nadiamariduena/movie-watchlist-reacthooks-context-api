import React, { useState } from "react";
import styled from "styled-components";
import { mobile, mobileM, tablet } from "../responsive";

const AddPage = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div``;
const AddContent = styled.div``;
const InputWrapper = styled.div``;
const Input = styled.input`
  padding: 10px 26px;
  border-radius: 5rem;
  border: 0;
`;

//
//
const Add = () => {
  //
  //
  const [query, setQuery] = useState("");

  //
  const onChange = (e) => {
    e.preventDefault();
    //
    //
    setQuery(e.target.value);
    //
    //API
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${e.target.value}`
    );
  };
  //
  return (
    <>
      <AddPage>
        <Container>
          <AddContent>
            <InputWrapper>
              <Input
                type="text"
                placeholder="search for a movie"
                value={query}
                onChange={onChange}
              />
            </InputWrapper>
          </AddContent>
        </Container>
      </AddPage>
    </>
  );
};

export default Add;