import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../components/Logo";
import { Link, useLocation } from "react-router-dom";

import { path } from "../modules/define/path";
import NavItem from "../components/NavItem";

const NavBar = () => {
  const pathname = useLocation().pathname;
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  if (
    pathname === "/" ||
    pathname === "/signup" ||
    pathname === " " ||
    pathname === "/auth/kakao/callback"
  ) {
    return null;
  }
  return (
    <NavBarContainer>
      <Wrapper>
        <NavLink to={path.home}>
          <Logo nav="true" />
        </NavLink>
        <MobileS>
          {/* 모바일 화면일 떄  */}
          {mobileMenu === false ? (
            <MobileButton onClick={handleMenu}>+</MobileButton>
          ) : (
            <MobileButton onClick={handleMenu}>-</MobileButton>
          )}
        </MobileS>
        <Desktop>
          <NavItem />
        </Desktop>
      </Wrapper>
      <Mobile>
        {/* 모바일일 때  */}
        {mobileMenu === false ? null : <NavItem />}
      </Mobile>
    </NavBarContainer>
  );
};

export default NavBar;
const NavBarContainer = styled.nav`
  position: relative;
  z-index: 10;
  width: 100%;
  height: 80px;
  color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;
const MobileS = styled.div`
  font-size: 1.5rem;
  display: none;
  @media (max-width: 640px) {
    display: block;
  }
`;
const MobileButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 30px;
`;

const Desktop = styled.div`
  display: none;

  @media (min-width: 640px) {
    display: block;
  }
`;

const Mobile = styled.div`
  display: block;

  @media (min-width: 640px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.5rem;
  white-space: nowrap;
  @media (max-width: 768px) {
    font-size: 0.5rem;
  }
`;
