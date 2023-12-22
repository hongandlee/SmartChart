import React from "react";
import { styled } from "styled-components";
import { palette } from "../styles/GlobalStyles";
import { Container, Header, Wrapper } from "../styles/CommonStyle";

const AccountingComponent = ({
  selectedChart,
  handleChartSelection,
  selectedButton,
  handleDateChange,
  isSearchButtonDisabled,
  duration,
  data,
  wrapperHeight,
}) => {
  return (
    <Container>
      <Wrapper
        style={{
          height: wrapperHeight,
        }}
      >
        <Header>매출관리</Header>
        <ContentContainer>
          <Buttons>
            <Button
              onClick={() => handleChartSelection("월별 매출")}
              selected={selectedButton === "월별 매출"}
            >
              월별 매출
            </Button>
            <Button
              onClick={() => handleChartSelection("주간 매출")}
              selected={selectedButton === "주간 매출"}
            >
              주간 매출
            </Button>
            <Button
              onClick={() => handleChartSelection("연 매출")}
              selected={selectedButton === "연 매출"}
            >
              연 매출
            </Button>
          </Buttons>
          <Buttons second="true">
            <Button
              onClick={() => handleChartSelection("일 매출")}
              selected={selectedButton === "일 매출"}
            >
              일 매출
            </Button>
            <Duration>
              <InputContainer>
                <DateInput
                  type="date"
                  name="startDate"
                  value={duration ? duration.startDate : ""}
                  onChange={handleDateChange}
                />
                ~
                <DateInput
                  type="date"
                  name="endDate"
                  value={duration ? duration.endDate : ""}
                  onChange={handleDateChange}
                />
              </InputContainer>
              <Button
                onClick={() => handleChartSelection("기간별")}
                disabled={isSearchButtonDisabled}
                selected={selectedButton === "기간별"}
              >
                검색
              </Button>
            </Duration>
          </Buttons>
          {selectedChart}
        </ContentContainer>
      </Wrapper>
    </Container>
  );
};

export default AccountingComponent;

const ContentContainer = styled.div`
  min-width: 1000px;
  max-height: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const Buttons = styled.div`
  display: grid;
  width: 100%;
  padding: 2rem;
  grid-template-columns: ${({ second }) =>
    second ? "1fr 2fr" : "repeat(3, 1fr)"};
  gap: 20px;
`;
const Button = styled.button`
  background-color: ${({ disabled, selected }) =>
    selected ? "#0d5d91" : disabled ? "#b0b0b0" : palette.primary.blue};
  border: none;
  padding: 0.5rem 1rem;
  color: ${({ disabled }) => (disabled ? "#666" : palette.white)};
  font-weight: 700;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 120px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;
const DateInput = styled.input`
  width: 100%;
  height: 2.5rem;
`;
const Duration = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  align-items: center;
`;
