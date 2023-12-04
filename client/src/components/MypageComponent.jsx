import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Button from "./Button";
import { palette } from "../styles/GlobalStyles";
import { userInfoAtom } from "../stores/userInfo";
import axios from "axios";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import Loader from "./Loader";

const MypageComponent = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [appointmentList, setAppointmentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/patient/page-view", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const appointmentList = response.data.myPageList;
        // 최신 5개만 남기기
        const latestAppointments = appointmentList
          .slice(-5)
          .sort(
            (a, b) => new Date(b.reservationDate) - new Date(a.reservationDate)
          );
        setUserInfo(response.data.myPage[0]);
        setAppointmentList(latestAppointments);
        setIsLoading(false);
      } catch (err) {}
    };
    fetchData();
  }, []);

  const cancelReservation = async (id) => {
    setIsLoading(true);
    const reservationId = String(id);
    try {
      await axios.delete("/patient/page-cancel", {
        data: { reservationId: reservationId },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      const updatedAppointmentList = appointmentList.filter(
        (item) => item.id !== id
      );
      setAppointmentList(updatedAppointmentList);
      toast.success("예약이 취소되었습니다.");
      setIsLoading(false);
    } catch (err) {
      toast.error("예약 취소 중 오류가 발생했습니다.");
    }
  };

  const columns = [
    { name: "", width: "10%" },
    { name: "병원명", width: "15%" },
    { name: "예약 날짜", width: "25%" },
    { name: "예약 시간", width: "20%" },
    { name: "예약 상태", width: "15%" },
    { name: "", width: "15%" },
  ];

  const handleChange = (field, value) => {
    setUserInfo({ ...userInfo, [field]: value });
  };
  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      await axios.patch("/patient/page", {
        name: userInfo.name,
        gender: userInfo.gender,
        age: 10,
        phoneNumber: userInfo.phoneNumber,
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("저장되었습니다.");
      setIsLoading(false);
    } catch (error) {
      toast.error("관리자에게 문의해주세요");
    }
  };

  return (
    <MypageContainer>
      <MypageWrapper>
        <Header>마이페이지</Header>
        {isLoading && <Loader />}

        <FirstColumnHalfWrapper>
          <ColumnDivideWrapper>
            <RowDivideWrapper>
              <InfoTitle>환자이름:</InfoTitle>
              <div>{userInfo.name}</div>
            </RowDivideWrapper>
            <RowDivideWrapper>
              <InfoTitle>성별:</InfoTitle>
              <div>{userInfo.gender}</div>
            </RowDivideWrapper>
          </ColumnDivideWrapper>
          <ColumnDivideWrapper>
            <RowDivideWrapper>
              <InfoTitle>나이:</InfoTitle>
              <div>{userInfo.age}</div>
            </RowDivideWrapper>
            <RowDivideWrapper>
              <InfoTitle>전화번호:</InfoTitle>
              <InfoValue
                type="text"
                value={userInfo.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
              />
            </RowDivideWrapper>
          </ColumnDivideWrapper>
          <Tip>
            **전화번호 변경시 기존번호를 클릭하시고 새로운 번호를 입력하신 후
            아래의 업데이트 버튼을 눌러주세요.**
          </Tip>
        </FirstColumnHalfWrapper>
        <Button
          width="100px"
          height="100px"
          padding="10px"
          fontSize="15px"
          onClick={handleUpdate}
        >
          Update
        </Button>
        <ColumnHalfWrapper>
          {/* <Header>예약리스트</Header> */}
          <Table>
            <AppointmentListTitle>
              {columns.map((column, index) => (
                <ListRowDivideWrapper
                  width={column.width}
                  index={index}
                  key={index}
                >
                  {column.name}
                </ListRowDivideWrapper>
              ))}
            </AppointmentListTitle>

            <AppointmentListBody>
              {appointmentList.map((item, index) => (
                <ListWrapper key={index}>
                  <div style={{ width: "10%" }}>{item.id}</div>
                  <div style={{ width: "15%" }}>{item.hospitalName}</div>
                  <div style={{ width: "25%" }}>{item.reservationDate}</div>
                  <div style={{ width: "20%" }}>{item.reservationTime}</div>
                  <div style={{ width: "15%" }}>{item.reservationStatus}</div>

                  <ButtonContainer style={{ width: "15%" }}>
                    <Button
                      width="70%"
                      height="60%"
                      padding="5px"
                      fontSize="15px"
                      borderRadius="10px"
                      onClick={() => cancelReservation(item.id)}
                    >
                      예약 취소
                    </Button>
                  </ButtonContainer>
                </ListWrapper>
              ))}
            </AppointmentListBody>
          </Table>
        </ColumnHalfWrapper>
      </MypageWrapper>
    </MypageContainer>
  );
};

export default MypageComponent;

const MypageContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 100px);
  min-width: 950px;
  min-height: 800px;
`;

const MypageWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 40%;
  height: 80%;
  min-width: 950px;
  min-height: 800px;
  /* border: 1px solid ${palette.gray.border}; */
  /* border-radius: 20px; */
  padding: 100px 0;
`;
const Tip = styled.div`
  font-size: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 10px;
  color: #3498db;
  font-weight: 600;
`;
const Header = styled.div`
  font-weight: bold;
  font-size: 25px;
  width: 100%;
  text-align: center;
  margin-top: 40px;
`;

const ColumnHalfWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-bottom: 40px;
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ColumnDivideWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
const AppointmentListTitle = styled.div`
  display: flex;
  width: 90%;
  height: 10%;
  background-color: ${palette.gray.light};
  border-top: 1px solid ${palette.gray.border};
  border-bottom: 1px solid ${palette.gray.border};
`;
const AppointmentListBody = styled.div`
  display: flex;
  width: 90%;
  height: 20%;
  flex-direction: column;
  margin-bottom: 80px;
`;

const FirstColumnHalfWrapper = styled(ColumnHalfWrapper)`
  border: 0.5px solid ${palette.gray.dark};
  width: 80%;
  border-radius: 5px;
  margin-top: 20px;
`;

const RowDivideWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  font-weight: bold;
  font-size: 16px;
  padding: 20px;
`;

const ListRowDivideWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: ${(props) =>
    (props.index === 0 || props.index === 5 || props.index === 6) && "center"};
  width: ${(props) => (props.width ? props.width : "100%")};
  height: 100%;
  font-weight: bold;
  font-size: 16px;
  border-left: ${(props) =>
    props.index !== 0 && `1px solid ${palette.gray.border}`};
  padding-left: ${(props) =>
    props.index !== 0 && props.index !== 5 && props.index !== 6 && "10px"};
  background-color: ${(props) =>
    props.index === 0 ? palette.gray.light : "transparent"};
`;

const InfoTitle = styled.div`
  width: 30%;
`;

const InfoValue = styled.input`
  width: 60%;
  border: none;
`;
const ListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${palette.gray.border};
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ButtonContainer = styled.div`
  width: ${(props) => props.width || "10%"};
  display: flex;
  justify-content: center;
  white-space: nowrap;
`;
