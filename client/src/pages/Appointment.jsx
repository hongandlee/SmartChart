import React, { useEffect, useState } from "react";
import SelectData from "../components/SelectData";
import DatePicker from "../components/DatePickerComponent";
import { styled } from "styled-components";
import { palette } from "../styles/GlobalStyles";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { dateAtom, selectedOptionState } from "../stores/dateAtom";
import axios from "axios";
import { toast } from "react-toastify";
import { Container, Header, Wrapper } from "../styles/CommonStyle";
import Loader from "../components/Loader";

const availableTimes = [
  "09:00:00",
  "10:00:00",
  "11:00:00",
  "12:00:00",
  "13:00:00",
  "14:00:00",
  "15:00:00",
  "16:00:00",
  "17:00:00",
];
const Appointment = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const [info, setInfo] = useState({});
  const [checkAvailablity, setCheckAvailablity] = useState(false);
  const selectedDate = useRecoilValue(dateAtom);
  const selectedTime = useRecoilValue(selectedOptionState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/patient/reservation-view/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          withCredentials: true,
        });
        setInfo(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const checkAvaliablity = () => {
    const data = {
      reservationDate: selectedDate,
      reservationTime: selectedTime,
    };
    setIsLoading(true);
    try {
      const response = axios.post("/patient/check-reservation", data);
      setCheckAvailablity(true);
      toast.success("예약 가능한 시간입니다.");
      setIsLoading(false);
    } catch (error) {
      toast.error("예약불가능한 시간입니다.");
    }
  };
  const handleSave = () => {
    setIsLoading(true);
    try {
      axios
        .post(`/patient/reservation`, {
          doctorId: info.doctorId,
          reservationDate: selectedDate,
          reservationTime: selectedTime,
        })
        .then(toast.success("예약되었습니다."), navigate("/selfdiagnosis"));
      setIsLoading(false);
    } catch (error) {
      toast.error("예약이 되지 않았습니다.");
    }
  };
  return (
    <Container>
      <Wrapper>
        <Header>병원 예약하기</Header>
        {isLoading && <Loader />}
        <FirstColumnHalfWrapper>
          <ColumnDivideWrapper>
            <RowDivideWrapper>
              <InfoTitle>환자이름:</InfoTitle>
              <InfoValue>{info.patientName}</InfoValue>
            </RowDivideWrapper>
            <RowDivideWrapper>
              <InfoTitle>성별:</InfoTitle>
              <InfoValue>{info.patiengGender}</InfoValue>
            </RowDivideWrapper>
          </ColumnDivideWrapper>
          <ColumnDivideWrapper>
            <RowDivideWrapper>
              <InfoTitle>나이:</InfoTitle>
              <InfoValue>{info.patientgAge}세</InfoValue>
            </RowDivideWrapper>
            <RowDivideWrapper>
              <InfoTitle>전화번호:</InfoTitle>
              <InfoValue>{info.patiengPhoneNumber}</InfoValue>
            </RowDivideWrapper>
          </ColumnDivideWrapper>
        </FirstColumnHalfWrapper>
        <ColumnHalfWrapper>
          <ColumnDivideWrapper>
            <RowDivideWrapper>
              <InfoTitle>병원이름:</InfoTitle>
              <InfoValue>{info.hospitalName}</InfoValue>
            </RowDivideWrapper>

            <RowDivideWrapper>
              <InfoTitle>예약날짜:</InfoTitle>
              <DatePicker />
            </RowDivideWrapper>
          </ColumnDivideWrapper>
          <ColumnDivideWrapper>
            <SelectTimeContainer>
              <RowDivideWrapper style={{ paddingRight: "20px" }}>
                <SelectData availableOption={availableTimes} title="예약시간" />
              </RowDivideWrapper>
              <RowDivideWrapper>
                <Button
                  width="100px"
                  height="35px"
                  padding="0"
                  borderRadius="10px"
                  fontSize="12px"
                  onClick={checkAvaliablity}
                  disabled={!selectedTime}
                >
                  예약 가능 조회
                </Button>
              </RowDivideWrapper>
            </SelectTimeContainer>
          </ColumnDivideWrapper>
        </ColumnHalfWrapper>
        <Button
          width="100px"
          height="45px"
          padding="0"
          fontSize="15px"
          borderRadius="10px"
          disabled={!checkAvailablity}
          onClick={handleSave}
        >
          예약하기
        </Button>
      </Wrapper>
    </Container>
  );
};

export default Appointment;

const ColumnHalfWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 80px 0%;
  font-size: 20px;
`;

const ColumnDivideWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 40%;
  padding: 10px;
`;

const FirstColumnHalfWrapper = styled(ColumnHalfWrapper)`
  border-bottom: 1px solid ${palette.gray.border};
`;

const RowDivideWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  font-weight: bold;
  font-size: 20px;
`;

const InfoTitle = styled.div`
  width: 30%;
`;

const InfoValue = styled.div`
  width: 70%;
`;
const SelectTimeContainer = styled.div`
  display: flex;
  width: 80%;
`;
