import React, { useState } from "react";
import { CiSquareChevDown } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { userInfoAtom } from "../stores/userInfo";
import patientIcon from "../assets/patient.png";
import femaleDoctor from "../assets/doctor_female.png";
import maleDoctor from "../assets/doctor_male.png";

const NavItem = () => {
  const userInfo = useRecoilValue(userInfoAtom);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };
  return (
    <StyledNavItem>
      <NavItemWrapper>
        {userInfo.isDoctor ? (
          <NavLink to="/adminAppointment">예약/진료관리</NavLink>
        ) : (
          <NavLink to="/searchHospital">병원예약</NavLink>
        )}
      </NavItemWrapper>
      <NavItemWrapper>
        {userInfo.isDoctor ? (
          <NavLink to="/adminWaitingList">환자 대기 관리</NavLink>
        ) : (
          <NavLink to="/selfdiagnosis">스마트 문진</NavLink>
        )}
      </NavItemWrapper>
      <NavItemWrapper>
        {userInfo.isDoctor ? (
          <NavLink to="/accounting">매출관리</NavLink>
        ) : (
          <NavLink to="/pay">진료비 내기</NavLink>
        )}
      </NavItemWrapper>
      <NavItemWrapper>
        {userInfo.isDoctor ? (
          <NavLink to="/teleConsult">실시간 진료 상담</NavLink>
        ) : (
          ""
        )}
      </NavItemWrapper>
      {/* TODO:여기가 드롭다운이 생길 부분 */}
      <NavItemWrapper>
        {userInfo.isDoctor ? (
          userInfo.gender === "female" ? (
            <NameContainer>
              <Icon src={femaleDoctor} alt="여자의사" />
              <div>{userInfo.username}의사</div>
              <CiSquareChevDown onClick={toggleDropdown} />
              {userInfo.username}
            </NameContainer>
          ) : (
            <NameContainer>
              <Icon src={maleDoctor} alt="남자의사" />
              <div>{userInfo.username}의사</div>
              <CiSquareChevDown onClick={toggleDropdown} />
            </NameContainer>
          )
        ) : (
          <NameContainer>
            <Icon src={patientIcon} alt="환자아이콘" />
            <div>{userInfo.username}환자</div>
            <CiSquareChevDown onClick={toggleDropdown} />
          </NameContainer>
        )}
        {/* TODO:드롭다운이 생길부분 */}
        <MenuContent open={isOpen}>
          <MenuLinkContainer>
            <SignoutButton
              onClick={() => {
                console.log("logout");
              }}
            >
              로그아웃
            </SignoutButton>
            {userInfo.isDoctor ? (
              <MenuLink to="/hospitalPage">병원페이지</MenuLink>
            ) : (
              <MenuLink to="/mypage">마이페이지</MenuLink>
            )}
          </MenuLinkContainer>
        </MenuContent>
      </NavItemWrapper>
    </StyledNavItem>
  );
};

export default NavItem;
const StyledNavItem = styled.ul`
  justify-content: center;
  display: flex;
  gap: 1rem;
  width: 100%;
  align-items: center;
  @media (max-width: 640px) {
    flex-direction: column;
    height: 100%;
  }
`;

const NavItemWrapper = styled.div`
  padding: 0.5rem 1rem;
  text-align: center;
  cursor: pointer;
  list-style: none;
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.5rem;
  white-space: nowrap; /* 줄 바꿈 방지 */
  @media (max-width: 768px) {
    font-size: 0.5rem;
  }
`;

const Icon = styled.img`
  width: 2rem;
`;
const NameContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  white-space: nowrap;
  font-weight: 600;
  color: #333;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
const MenuContent = styled.div`
  display: ${(props) => (props.open ? "block" : "none")};
  position: absolute;
  top: 100%;
  right: 2%;
  z-index: 1;
  padding: 1rem;
  background-color: #fff;
  font-size: 1rem;
  font-weight: 700;
  border: 1px solid gray;
  white-space: nowrap;
`;
const MenuLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
const MenuLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const SignoutButton = styled.div`
  &:hover {
    cursor: pointer;
  }
`;