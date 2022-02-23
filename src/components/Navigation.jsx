import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

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
  background-color: #000000;
  //
  position: fixed;
  top: 0;
  z-index: 3;
  //
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
  margin: 0 0 0 30px;
  .logo {
    color: #ffffffd6;
    letter-spacing: 3px;
  }
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
  color: #ffffff5e;
  text-transform: uppercase;
  ${mobile({ justifyContent: "space-between" })}
`;
//
const Ul = styled.ul``;
const Li = styled.li`
  display: inline;
  list-style: none;
  margin: 0 30px 0 0;
  color: #f7f7f7;

  text-decoration: none;
  ${mobile({ margin: "0 10px 0 0" })}
   .btn-header {
      padding: 10px 26px;
      background-color: #ffffffa7;
      
      text-transform: uppercase;
      font-weight: 700;
      display: inline-block;
      border: none;
      font-size: "calc(9px + 1vmin)",
      transition: all 0.3s ease;
      line-height: 1.1;
      &:hover {
        background-color: #b4cec4;
      }
    }
    //
    .linkos {
      color: #ffffffc3;

      font-size: 1em;
      font-weight: 100;
      text-transform: uppercase;
      font-weight: 500;
      text-transform: lowercase;
      letter-spacing: 1px;
      transition: all 0.6s ease-in-out;
    }

  @media screen and (min-width: 868px) {
 
    /* 
    
    
    */
    .btn-header {
      padding: 10px 26px;
      background-color: #9dcebba7;
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
    //
    .linkos {
      color: #dfdfdfc3;

      font-size: 1em;
      font-weight: 100;
      text-transform: uppercase;
      font-weight: 500;
      text-transform: lowercase;
      letter-spacing: 1px;
      transition: all 0.6s ease-in-out;
    }
  }
`;
//
// -------------------------
export const Navigation = () => {
  return (
    <>
      <Header>
        <Nav>
          <Left>
            <Brand>
              {" "}
              <Link to="/" className="logo">
                GHDH
              </Link>
            </Brand>
          </Left>
          {/* ---------------- */}
          <Right>
            <Ul className="nav-links">
              <Li>
                <Link to="/watchlist" className="linkos">
                  Watch list
                </Link>
              </Li>
              <Li>
                <Link to="/watched" className="linkos">
                  Watched
                </Link>
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
