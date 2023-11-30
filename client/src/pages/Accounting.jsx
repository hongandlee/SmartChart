import React, { useEffect, useState } from "react";
import WeeklyChart from "../components/chart/WeeklyChart";
import YearlyChart from "../components/chart/YearlyChart";
import DailyChart from "../components/chart/DailyChart";
import MonthlyChart from "../components/chart/MonthlyChart";
import { styled } from "styled-components";
import { palette } from "../styles/GlobalStyles";
import PeriodChart from "../components/chart/PeriodChart";
import axios from "axios";
import Table from "../components/chart/Table";
import { Container, Header, Wrapper } from "../styles/CommonStyle";
import { toast } from "react-toastify";

const Accounting = () => {
  const [selectedChart, setSelectedChart] = useState(null);
  const [data, setData] = useState({});
  const [duration, setDuration] = useState({
    startDate: "",
    endDate: "",
  });

  const handleDateChange = (e) => {
    const { name, value } = e.target;

    setDuration((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isSearchButtonDisabled = !duration.startDate || !duration.endDate;

  const handleChartSelection = (chartType) => {
    switch (chartType) {
      case "주간 매출":
        setSelectedChart(
          <>
            <WeeklyChart
              datas={data.week}
              salesWeek={data.salesWeek}
              recentWeek={data.recentWeek}
            />
            <Table tableData={data.week} />
          </>
        );
        break;
      case "연 매출":
        setSelectedChart(
          <>
            <YearlyChart
              datas={data.year}
              salesYear={data.salesYear}
              recentYear={data.recentYear}
            />
            <Table tableData={data.year} />
          </>
        );
        break;
      case "일 매출":
        setSelectedChart(
          <>
            <DailyChart
              datas={data.date}
              recentDate={data.recentDate}
              salesDate={data.salesDate}
            />
            <Table tableData={data.date} />
          </>
        );
        break;
      case "월별 매출":
        setSelectedChart(
          <>
            <MonthlyChart
              datas={data.month}
              salesMonth={data.salesMonth}
              recentMonth={data.recentMonth}
              gender={data.genderMonth}
              averageAge={data.averageAgeMonth}
            />
            <Table tableData={data.genderMonth} />
          </>
        );
        break;

      case "기간별":
        setSelectedChart(<PeriodChart duration={duration} />);
        break;
      default:
        setSelectedChart(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("/doctor/month-sales-view", {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => setData(res.data));
      } catch (err) {
        toast.error("데이터를 읽어오는데 실패했습니다.");
      }
    };
    fetchData();
  }, []);
  return (
    <Container>
      <Wrapper>
        <Header>매출관리</Header>
        <ContentContainer>
          <Buttons>
            <Button onClick={() => handleChartSelection("월별 매출")}>
              월별 매출
            </Button>
            <Button onClick={() => handleChartSelection("주간 매출")}>
              주간 매출
            </Button>
            <Button onClick={() => handleChartSelection("연 매출")}>
              연 매출
            </Button>
          </Buttons>
          <Buttons second="true">
            <Button onClick={() => handleChartSelection("일 매출")}>
              일 매출
            </Button>
            <Duration>
              <InputContainer>
                <DateInput
                  type="date"
                  name="startDate"
                  value={duration.startDate}
                  onChange={handleDateChange}
                />
                ~
                <DateInput
                  type="date"
                  name="endDate"
                  value={duration.endDate}
                  onChange={handleDateChange}
                />
              </InputContainer>
              <Button
                onClick={() => handleChartSelection("기간별")}
                disabled={isSearchButtonDisabled}
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

export default Accounting;

const ContentContainer = styled.div`
  min-width: 1000px;
  max-height: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 100px;
  flex-grow: 1;
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
  background-color: ${({ disabled }) => (disabled ? "#b0b0b0" : "#1798e1")};
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
