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
  padding: 25px 0;
  background-color: #000000;
  //
  position: fixed;
  top: 0;
  z-index: 15;
  //
  background: rgba(255, 255, 255, 0.4);
  -webkit-backdrop-filter: blur(9px);
  backdrop-filter: blur(9px);
  border-bottom: 1px solid #eee;
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
    color: #141414;
    letter-spacing: 3px;
    font-size: calc(28px + 1vmin);
    font-weight: 500;
    font-family: "Syncopate-Bold";
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

  text-decoration: none;
  ${mobile({ margin: "0 10px 0 0" })}
`;

const NavbarLink = styled(Link)`
  color: rgba(142, 182, 203, 0.496);
  font-size: calc(12px + 1vmin);
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 10px;
  text-transform: lowercase;

  //
  &:hover,
  &:focus {
    color: rgba(142, 182, 203, 0.796);
  }
  &:active {
    color: red;
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
              <Link to="/" className="logo">
                MUBII
              </Link>
            </Brand>
          </Left>
          {/* ---------------- */}
          <Right>
            <Ul className="nav-links">
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
