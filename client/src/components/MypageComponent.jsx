import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Button from "./Button";
import { palette } from "../styles/GlobalStyles";
import { userInfoAtom } from "../stores/userInfo";
import axios from "axios";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import Loader from "./Loader";
import { Wrapper } from "../styles/CommonStyle";

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
      <Wrapper>
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
          <TableContainer>
            <TableHeader>
              <TableCell>예약번호</TableCell>
              <TableCell>병원명</TableCell>
              <TableCell>예약 날짜</TableCell>
              <TableCell>예약 시간</TableCell>
              <TableCell>예약 상태</TableCell>
              <TableCell>예약 취소</TableCell>
            </TableHeader>
            {appointmentList.length > 0 ? (
              <>
                {appointmentList.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.hospitalName}</TableCell>
                    <TableCell>{item.reservationDate}</TableCell>
                    <TableCell>{item.reservationTime}</TableCell>
                    <TableCell
                      isIncomplete={item.reservationStatus === "미완료"}
                    >
                      {item.reservationStatus}
                    </TableCell>

                    <TableCell>
                      <Button
                        padding="10px 5px"
                        fontSize="15px"
                        borderRadius="5px"
                        onClick={() => cancelReservation(item.id)}
                      >
                        예약 취소
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell>예약 내역이 없습니다.</TableCell>
              </TableRow>
            )}
          </TableContainer>
        </ColumnHalfWrapper>
      </Wrapper>
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
  padding: 100px 0;
  border: 1px solid ${palette.gray.border};
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

const ColumnDivideWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
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

const InfoTitle = styled.div`
  width: 30%;
`;

const InfoValue = styled.input`
  width: 60%;
  border: none;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  margin: auto;
  margin-top: 20px;
`;

const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none;
  }
`;

const TableHeader = styled(TableRow)`
  font-weight: bold;
  background-color: #f0f0f0;
  display: flex;
  padding: 8px;
`;

const TableCell = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.isIncomplete ? "#FF0000" : "")};
`;
