import React, { useEffect, useState } from "react";
import { CiSquareChevDown } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { userRoleAtom } from "../stores/userInfo";
import patientIcon from "../assets/patient.png";
import femaleDoctor from "../assets/doctor_female.png";
import axios from "axios";
import { toast } from "react-toastify";

const NavItem = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    gender: "",
    age: 0,
    phoneNumber: 0,
  });
  const [hospitalInfo, setHospitalInfo] = useState({
    name: "",
    address: "",
    mapx: "",
    mapy: "",
    tel: "",
    category: "",
  });
  const [userRole, setUserRole] = useRecoilState(userRoleAtom);

  function deleteCookie(name) {
    const currentDate = new Date();
    // 현재날짜 이전 날짜
    const expirationDate = new Date(currentDate.getTime() - 1);

    document.cookie = `${name}=; expires=${expirationDate.toUTCString()}; path=/;`;
  }
  const token = document.cookie.includes("token");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handlePatientLogout = async () => {
    await axios.get("/patient/sign_out");
    deleteCookie("token");
    navigate("/");
  };
  const handleDoctorLogout = async () => {
    await axios.get("/doctor/sign_out");
    deleteCookie("session");
    navigate("/");
  };

  useEffect(() => {
    const storedUserRole = localStorage.getItem("userRole");
    if (storedUserRole) {
      setUserRole({ role: storedUserRole });

      // 변경된 userRole적용
      fetchData(storedUserRole);
    }
  }, [setUserRole]);

  const fetchData = async (role) => {
    if (role === "PATIENT") {
      try {
        const response = await axios.get("/patient/page-view", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUserInfo(response.data.myPage[0]);
      } catch (err) {
        toast.error("사용자 정보를 읽어오는데 실패했습니다.");
      }
    } else if (role === "DOCTOR") {
      try {
        const response = await axios.get("/doctor/hospital-view", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setHospitalInfo(response.data.hospitalPage[0]);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <StyledNavItem>
      <NavItemWrapper>
        {!token ? (
          <NavLink to="/adminAppointment">예약/진료관리</NavLink>
        ) : (
          <NavLink to="/searchHospital">병원예약</NavLink>
        )}
      </NavItemWrapper>
      <NavItemWrapper>
        {!token ? (
          <NavLink to="/doctor/waiting-list-view">환자 대기 관리</NavLink>
        ) : (
          <NavLink to="/selfdiagnosis">스마트 문진</NavLink>
        )}
      </NavItemWrapper>
      <NavItemWrapper>
        {!token ? (
          <NavLink to="/accounting">매출관리</NavLink>
        ) : (
          <NavLink to="/pay">진료비 내기</NavLink>
        )}
      </NavItemWrapper>
      <NavItemWrapper>
        {!token ? <NavLink to="/chat">실시간 진료 상담</NavLink> : ""}
      </NavItemWrapper>
      {/* TODO:여기가 드롭다운이 생길 부분 */}
      <NavItemWrapper>
        {!token ? (
          <NameContainer>
            <Icon src={femaleDoctor} alt="여자의사" />
            <div>{hospitalInfo.hospitalName}</div>
            <CiSquareChevDown onClick={toggleDropdown} />
            {/* {userInfo.name} */}
          </NameContainer>
        ) : (
          <NameContainer>
            <Icon src={patientIcon} alt="환자아이콘" />
            <div>{userInfo.name}환자</div>
            <CiSquareChevDown onClick={toggleDropdown} />
          </NameContainer>
        )}
        {/* TODO:드롭다운이 생길부분 */}
        <MenuContent open={isOpen}>
          <MenuLinkContainer>
            {userRole.role === "DOCTOR" ? (
              <>
                <SignoutButton onClick={handleDoctorLogout}>
                  로그아웃
                </SignoutButton>
                <MenuLink to="/hospitalPage">병원페이지</MenuLink>
              </>
            ) : (
              <>
                <SignoutButton onClick={handlePatientLogout}>
                  로그아웃
                </SignoutButton>
                <MenuLink to="/mypage">마이페이지</MenuLink>
              </>
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
  color: #333;
`;
