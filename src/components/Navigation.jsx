import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile, mobileM, tablet, laptop } from "../responsive";

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
  padding: 25px 0;

  //
  position: fixed;
  top: 0;
  z-index: 999;
  //
  background: rgba(255, 255, 255, 0.45);
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
`;

// LEFT
//
const Left = styled.div`
  width: 30%;
  color: #8741125e;
  text-transform: uppercase;

  //
`;

const Brand = styled.h3`
  margin-left: 45px;
  .logo {
    color: rgba(241, 29, 29);

    letter-spacing: -2px;
    font-size: calc(28px + 1vmin);
    font-weight: 600;
    font-family: "Syncopate-Bold";
  }
  ${mobile({ marginLeft: "15px" })}
  ${mobileM({ marginLeft: "25px" })}
`;
//----------------------
//
//RIGHT
//
//

const Right = styled.div`
  width: 70%;

  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  margin: 0 20px;
  color: #ffffff5e;
  //
  text-transform: uppercase;
  ${mobile({ justifyContent: "space-between" })}
`;
//
const Ul = styled.ul`
  width: 90%;

  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
`;
const Li = styled.li`
  display: inline;
  list-style: none;
  margin: 0 30px 0 0;

  text-decoration: none;
  ${mobile({ margin: "0 5px 0 0" })}
  ${mobileM({ margin: "0 5px 0 0" })}
`;

const NavbarLink = styled(Link)`
  color: rgb(228, 228, 221, 0.9);
  font-weight: 600;

  font-size: calc(12px + 1vmin);
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 10px;
  text-transform: lowercase;

  //
  &:hover,
  &:focus {
    color: rgba(228, 228, 221, 4.196);
  }
  /* &:active {
    color: #181818;
  } */

  ${mobile({ fontSize: `calc(10px + 1vmin)` })}
  ${mobileM({ fontSize: `calc(10px + 1vmin)` })}
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
              <Link to="/" className="logo">
                MUBII:
              </Link>
            </Brand>
          </Left>
          {/* ---------------- */}
          <Right>
            <Ul className="nav-links">
              <Li>
                <NavbarLink to="/add">results</NavbarLink>
              </Li>
              <Li>
                <NavbarLink to="/watchlist">Watch list</NavbarLink>
              </Li>
              <Li>
                <NavbarLink to="/watched">Watched</NavbarLink>
              </Li>
              {/* <Li>
                <Link to="/add" className="btn-header">
                  + AddC
                </Link>
              </Li> */}
            </Ul>
          </Right>
        </Nav>
      </Header>
    </>
  );
};

export default Navigation;
