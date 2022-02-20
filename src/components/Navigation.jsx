import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile, mobileM, tablet } from "../responsive";

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  position: relative;
`;

const Nav = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  background-color: white;
  //
  position: fixed;
  top: 0;
  z-index: 3;
  //

  .linkos {
    padding: 0;
    margin: 0;
    color: #87411238;
    text-decoration: none;
    font-size: 1.5em;
    font-weight: 100;
    font-family: "KenokyLight";
    text-transform: lowercase;
    letter-spacing: 5px;
    transition: all 0.6s ease-in-out;
  }
`;

// LEFT
//
const Left = styled.div`
  flex: 1;
  color: #8741125e;
  text-transform: uppercase;

  //
`;

const Brand = styled.h3`
  color: #874012;
  opacity: 0.3;
  margin: 0 0 0 30px;
`;
//----------------------
//
//RIGHT
//
//

const Right = styled.div`
  flex: 1;

  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  margin: 0 20px;
  color: #8741125e;
  text-transform: uppercase;
  ${mobile({ justifyContent: "flex-start" })}
`;
//
const Ul = styled.ul``;
const Li = styled.li`
  display: inline;
  list-style: none;
  margin: 0 30px 0 0;
  color: #874012;
  opacity: 0.3;
  text-decoration: none;
  ${mobile({ margin: "0 10px 0 0" })}

  .btn-header {
    padding: 10px 26px;
    background-color: #9dcebb;
    border-radius: 50px;
    text-transform: uppercase;
    font-weight: 700;
    display: inline-block;
    border: none;
    font-size: 1rem;
    transition: all 0.3s ease;
    line-height: 1.1;
    &:hover {
      background-color: #b4cec4;
    }
  }
`;
//
// -------------------------
const Navigation = () => {
  return (
    <>
      <Header>
        <Nav>
          <Left>
            <Brand>
              {" "}
              <Link to="/">Watch</Link>
            </Brand>
          </Left>
          {/* ---------------- */}
          <Right>
            <Ul className="nav-links">
              <Li>
                <Link to="/">Watch list</Link>
              </Li>
              <Li>
                <Link to="/watched">Watched</Link>
              </Li>
              <Li>
                <Link to="/add" className="btn-header">
                  + Add
                </Link>
              </Li>
            </Ul>
          </Right>
        </Nav>
      </Header>
    </>
  );
};

export default Navigation;
