import React, { lazy, Suspense, useState } from "react";
import { styled } from "styled-components";
import { palette } from "../styles/GlobalStyles";
import Loader from "../components/Loader";
import Maps from "../components/Maps";
import { Wrapper } from "../styles/CommonStyle";

const SearchHospital = () => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Suspense fallback={<Loader />}>
      <Container>
        {isLoading && <Loader />}
        <Wrapper>
          <Header>병원 검색하기</Header>
          <Maps setIsLoading={setIsLoading} />
        </Wrapper>
      </Container>
    </Suspense>
  );
};

export default SearchHospital;
const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 100px);
  min-width: 950px;
  min-height: 800px;
  padding-top: 50px;
`;

const Header = styled.div`
  /* background-color: red; */
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 25px;
`;
