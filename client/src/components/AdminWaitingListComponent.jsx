import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { palette } from "../styles/GlobalStyles";
import axios from "axios";
import { Header, Wrapper, Container } from "../styles/CommonStyle";
import Loader from "./Loader";

const AdminWaitingListComponent = () => {
  const [appointment, setAppointment] = useState([]);
  const currentTime = new Date();
  const year = currentTime.getFullYear();
  const month = String(currentTime.getMonth() + 1).padStart(2, "0");
  const day = String(currentTime.getDate()).padStart(2, "0");
  const today = `${year}-${month}-${day}`;
  const sortedAppointments =
    appointment.length >= 2
      ? [...appointment].sort(compareAppointments)
      : appointment;
  const [tasks, setTasks] = useState({
    대기중: sortedAppointments,
    진료중: [],
    완료: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/doctor/waiting-list-view", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        const fetchedAppointments = response.data.data;

        // 정렬된 상태를 가져오기 위해 새로운 배열 생성
        const sortedAppointments = [...fetchedAppointments].sort(
          compareAppointments
        );

        setAppointment(sortedAppointments);

        setTasks({
          대기중: sortedAppointments,
          진료중: [],
          완료: [],
        });
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  function compareAppointments(appointment1, appointment2) {
    const dateComparison = appointment1.reservationDate.localeCompare(
      appointment2.reservationDate
    );

    if (dateComparison === 0) {
      return appointment1.reservationTime.localeCompare(
        appointment2.reservationTime
      );
    }

    return dateComparison;
  }

  const handleDragStart = (e, appointment, status) => {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ appointment, status })
    );
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const { appointment, status } = JSON.parse(data);

    if (status !== targetStatus) {
      const updatedTasks = {
        ...tasks,
        [status]: tasks[status].filter((apt) => apt.id !== appointment.id), // 기존 상태에서 해당 약속 제거
        [targetStatus]: [...tasks[targetStatus], appointment],
      };
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks)); // 읽어온 값 tasks초기화
    }
  }, [appointment]);

  return (
    <Container>
      <Wrapper>
        <Header>환자 대기 관리</Header>
        <ColumnContainer>
          {isLoading && <Loader />}
          <Today>{today}</Today>
          <Columns>
            {Object.keys(tasks).map((status) => (
              <Column
                key={status}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, status)}
              >
                <Title>{status}</Title>
                {tasks[status].map((appointment) => (
                  <Appointment
                    key={appointment.patientName}
                    draggable
                    onDragStart={(e) => handleDragStart(e, appointment, status)}
                  >
                    <DateText>{appointment.reservationDate}</DateText>
                    <Info>
                      <StyledP>{appointment.patientName}</StyledP>
                      <StyledP>{appointment.reservationTime}</StyledP>
                    </Info>
                  </Appointment>
                ))}
              </Column>
            ))}
          </Columns>
        </ColumnContainer>
      </Wrapper>
    </Container>
  );
};

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  min-width: 1000px;
  overflow-x: auto;
  margin-top: 100px;
`;

const Today = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: ${palette.gray.dark};
  color: #fff;
  font-weight: 700;
  font-size: 1.5rem;
  border-radius: 5px 5px 0 0;
  height: 3rem;
`;

const Columns = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 600px;
`;

const Column = styled.div`
  flex: 1;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-left: 1rem;
  padding: 20px;
  border-radius: 5px;
  min-height: 400px;
  &:first-child {
    margin-left: 0;
  }
`;

const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 2rem;
  background-color: ${palette.gray.light};
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const Appointment = styled.div`
  margin: 10px 0;
  padding: 5px;
  background-color: ${palette.gray.dark};
  border: 1px solid ${palette.gray.border};
  border-radius: 5px;
`;

const DateText = styled.p`
  font-weight: bold;
  font-size: 1rem;
  color: #fff;
  background-color: ${palette.gray.dark};
  margin-bottom: 5px;
`;

const Info = styled.div`
  background-color: #fff;
  border-radius: 5px;
`;

const StyledP = styled.p`
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export default AdminWaitingListComponent;
