import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile, mobileM, tablet, laptop } from "../responsive";
//
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";

//
import MovieeContext from "../ContextMovieHandler.js";

//
//

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
  z-index: 990;
  //
  ${mobile({
    flexDirection: "column",
  })}
`;

// LEFT
//
const Left = styled.div`
  width: 100%;
  color: #8741125e;
  text-transform: uppercase;
`;

const Brand = styled.h3`
  margin-left: 45px;
  color: rgba(241, 29, 29);

  letter-spacing: -2px;
  font-size: calc(28px + 1vmin);
  font-weight: 600;
  font-family: "Syncopate-Bold";

  ${mobile({
    marginLeft: "20px",
    fontSize: `calc(38px + 1vmin)`,
  })}
  ${mobileM({ marginLeft: "25px" })}
`;

const LogoLink = styled(Link)`
  color: rgba(241, 29, 29);
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
  //

  //
  text-transform: uppercase;
  ${mobile({
    margin: "0",
    padding: "10px 0",
    width: "100%",
    justifyContent: "center",
  })}
`;
//

//
const HambButton = styled.button`
  width: 35px;
  height: 35px;
  font-size: calc(12px + 1.8vmin);

  display: flex;
  justify-content: center;
  align-items: center;

  border: 0;

  color: red;
  border-radius: 100px;
  cursor: pointer;

  //
  z-index: 999;
  position: fixed;
  top: 2.5%;
  right: 30px;
`;
//
//

const UlMobile = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  //
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  //
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 998;
  //
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(56px);

  /*


  */
  ${mobile({})}
  ${mobileM({})}
    ${tablet({})}
    ${laptop({})}
`;
const LiMobile = styled.li`
  display: inline;
  list-style: none;
  margin: 0 30px 0 0;

  text-decoration: none;
  ${mobile({
    margin: "0 5px 0 0",
  })}
  ${mobileM({ margin: "0 5px 0 0" })}
`;
//
const NavbarLinkMobile = styled(Link)`
  display: flex;

  //
  margin: 10px;
  color: black;
  color: red;
  font-weight: 600;
  font-size: calc(38px + 1vmin);
  text-decoration: none;
  text-transform: capitalize;
  //

  ${mobile({
    fontSize: `calc(24px + 1vmin)`,
  })}
  ${mobileM({
    fontSize: `calc(30px + 1vmin)`,
  })}
    ${tablet({
    fontSize: `calc(40px + 1vmin)`,
  })}
    ${laptop({
    fontSize: `calc(50px + 1vmin)`,
  })}
`;

//
//
// -------------------------
const Navigation = () => {
  const {
    setVideoId,
    //  resize video
  } = useContext(MovieeContext);

  const handleCloseModal = (e) => {
    e.preventDefault(e);

    //
    // if you don't add this setVideoId(), when you will click in another movie, you will see the same previous video, and not only that, it will be launched without even have to click on "play", which is not good. so kill the process by adding the setVideoId() or setVideoId(null)
    setVideoId();
  };

  // open modalNav

  const [openModalNav, setOpenModalNav] = useState(false);

  const handlerOpenModalNav = (e) => {
    e.preventDefault();
    setOpenModalNav(!openModalNav);
  };

  return (
    <>
      <Header>
        <Nav>
          <Left>
            <Brand
              animate={{ y: 0, opacity: 1 }}
              initial={{
                opacity: 0,
                y: -500,
              }}
              transition={{
                delay: 1.2,
                type: "spring",
                duration: 1.8,
                damping: 12,
              }}
              as={motion.div}
              onClick={handleCloseModal}
            >
              <LogoLink to="/">MUBII:</LogoLink>
            </Brand>
          </Left>

          {/* ----------------  */}
          <Right>
            <HambButton
              animate={{ y: 0, opacity: 1 }}
              initial={{
                opacity: 0,
                y: -500,
              }}
              transition={{
                delay: 1.2,
                type: "spring",
                duration: 1.2,
                damping: 14,
              }}
              as={motion.div}
              onClick={handlerOpenModalNav}
            >
              {openModalNav ? <AiOutlineClose /> : <GiHamburgerMenu />}
            </HambButton>

            {openModalNav && (
              <UlMobile
                animate={{ opacity: 1 }}
                initial={{
                  // backgroundColor: currentsColorBg,

                  opacity: 0,
                }}
                exit={{ opacity: 0 }}
                as={motion.div}
                onClick={handlerOpenModalNav}
              >
                <LiMobile onClick={handleCloseModal}>
                  <NavbarLinkMobile to="/watchlist">
                    Watch list
                  </NavbarLinkMobile>
                </LiMobile>

                <LiMobile onClick={handleCloseModal}>
                  <NavbarLinkMobile to="/watched">Watched</NavbarLinkMobile>
                </LiMobile>
              </UlMobile>
            )}
          </Right>
        </Nav>
      </Header>
    </>
  );
};

export default Navigation;
