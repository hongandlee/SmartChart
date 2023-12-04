import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import SelfDiagnosisComponent from "./SelfDiagnosisComponent";
import SendSMS from "./SendSMS";
import axios from "axios";
import { Container, Header, Wrapper } from "../styles/CommonStyle";
import { toast } from "react-toastify";
import Loader from "./Loader";

const AdminAppointmentComponent = () => {
  const navigate = useNavigate();
  const [searchUsername, setSearchUsername] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [isSMSModalOpen, setIsSMSModalOpen] = useState(false);
  const [SMSInfo, setSMSInfo] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [appointmentModals, setAppointmentModals] = useState(
    appointments.map(() => false)
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/doctor/reservation-view", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setAppointments(response.data.data);
        setIsLoading(false);
      } catch (error) {
        toast.error("데이터를 읽어오는데 실패했습니다.");
      }
    };

    fetchData();
  }, []);

  const handleUsernameChange = (event) => {
    setSearchUsername(event.target.value);
    filterAppointments(event.target.value, searchDate);
  };

  const handleDateChange = (event) => {
    setSearchDate(event.target.value);
    filterAppointments(searchUsername, event.target.value);
  };
  const filterAppointments = (username, date) => {
    const filtered = appointments.filter((appointment) => {
      const nameMatch = username ? appointment.name.includes(username) : true;
      const dateMatch = date
        ? appointment.reservationDate.includes(date)
        : true;
      return nameMatch && dateMatch;
    });

    setFilteredAppointments(filtered);
  };

  const handleClickBillingButton = (appointment) => {
    navigate(`/billing?id=${appointment.id}`, {
      state: appointment,
    });
  };

  const handleModal = (index) => {
    const updatedModals = [...appointmentModals];
    updatedModals[index] = !updatedModals[index];
    setAppointmentModals(updatedModals);
  };

  const handleSMSModal = ({ appointment } = {}) => {
    setIsSMSModalOpen(!isSMSModalOpen);
    setSMSInfo(appointment);
  };

  useEffect(() => {
    filterAppointments(searchUsername, searchDate);
  }, [searchUsername, searchDate, appointments]);
  return (
    <Container>
      <Wrapper>
        <Header>예약관리</Header>
        {isLoading && <Loader />}
        <Modal isOpen={isSMSModalOpen} handleModal={handleSMSModal}>
          <SendSMS SMSInfo={SMSInfo} />
        </Modal>
        <ResultContainer>
          <Search>
            <LabelContainer>
              <LabelWrapper>
                <label>날짜 검색:</label>
                <Input
                  type="date"
                  value={searchDate}
                  onChange={handleDateChange}
                />
              </LabelWrapper>
              <LabelWrapper>
                <label>환자명 검색:</label>
                <Input
                  type="text"
                  value={searchUsername}
                  onChange={handleUsernameChange}
                />
              </LabelWrapper>
            </LabelContainer>
          </Search>
          {filteredAppointments.length > 0 ? (
            <Table>
              <thead>
                <tr>
                  <Th>예약번호</Th>
                  <Th>환자명</Th>
                  <Th>날짜</Th>
                  <Th>시간</Th>
                  <Th>전화번호</Th>
                  <Th>예약확정 체크하기</Th>
                  <Th>진료비 청구 체크하기</Th>
                  <Th></Th>
                  <Th></Th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment, index) => (
                  <tr key={appointment.id}>
                    <Td>{appointment.id}</Td>
                    <Td>{appointment.name}</Td>
                    <Td>{appointment.reservationDate}</Td>
                    <Td>{appointment.reservationTime}</Td>
                    <Td>{appointment.phoneNumber}</Td>
                    <Td>
                      <Button
                        width="120px"
                        height="30px"
                        padding="0"
                        fontSize="12px"
                        onClick={() => handleSMSModal({ appointment })}
                      >
                        예약 확정 문자
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        width="130px"
                        height="30px"
                        padding="0"
                        fontSize="12px"
                        onClick={() => handleClickBillingButton(appointment)}
                      >
                        진료비 청구하기
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        width="100px"
                        height="30px"
                        padding="0"
                        fontSize="12px"
                        onClick={() =>
                          navigate(`/medicalcaremanagement/${appointment.id}`)
                        }
                      >
                        진료관리 가기
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        width="100px"
                        height="30px"
                        padding="0"
                        fontSize="12px"
                        onClick={() => handleModal(index)}
                      >
                        건강체크 확인
                      </Button>
                      <Modal
                        isOpen={appointmentModals[index]}
                        handleModal={() => handleModal(index)}
                      >
                        <SelfDiagnosisComponent id={appointment.patientId} />
                      </Modal>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div>
              <h4>검색 결과가 없습니다.</h4>
            </div>
          )}
        </ResultContainer>
      </Wrapper>
    </Container>
  );
};

const Search = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  padding: 2rem;
  min-width: 700px;
`;
const LabelContainer = styled.div`
  display: flex;
  padding: 1.5rem;
  justify-content: space-between;
  margin-right: 5rem;
  width: 100%;
  &:last-child {
    margin-right: 0;
  }
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const Input = styled.input`
  width: 60%; /* 입력 필드 너비 설정 */
`;
const Table = styled.table`
  border: 1px solid gray;
  width: 80%;
  margin-top: 2rem;
  white-space: nowrap;
`;

const Th = styled.th`
  border: 1px solid gray;
  padding: 8px;
  background-color: #f5f5f5;
`;

const Td = styled.td`
  border: 1px solid gray;
  padding: 8px;
  text-align: center;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  min-height: 600px;
`;

export default AdminAppointmentComponent;
