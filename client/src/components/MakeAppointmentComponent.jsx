import React, { useState } from "react";
import { styled } from "styled-components";
import Maps from "../components/Maps";
import { Container, Wrapper } from "../styles/CommonStyle";

const MakeAppointmentComponent = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Container>
      <Wrapper>
        <Header>병원 검색하기</Header>
        <Maps setIsLoading={setIsLoading} isLoading={isLoading} />
      </Wrapper>
    </Container>
  );
};

export default MakeAppointmentComponent;
const Header = styled.div`
  /* background-color: red; */
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 25px;
`;
