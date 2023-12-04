import React, { useEffect, useState } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  BarElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  Buttons,
  ChartContainer,
  Charts,
  MainChart,
  Wrapper,
} from "./WeeklyChart";
import useActiveChart from "../../hooks/useActiveChart";
import RevenueChart from "./RevenueChart";
import LatestChart from "./LatestChart";
import Button from "../Button";
import AverageAgeChart from "./AverageAgeChart";
import PatientGenderTrends from "./PatientGenderTrends";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  BarElement
);

const options = {
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "월별 매출과 환자 수 추이",
    },
  },
  scales: {
    "y-axis-1": {
      type: "linear",
      position: "left",
      ticks: {
        beginAtZero: true,
      },
      title: {
        display: true,
        text: "월간 매출 (원)",
      },
    },
    "y-axis-2": {
      type: "linear",
      position: "right",
      ticks: {
        beginAtZero: true,
      },
      title: {
        display: true,
        text: "환자 수",
      },
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const MonthlyChart = ({
  datas,
  salesMonth,
  recentMonth,
  gender,
  averageAge,
}) => {
  const { activeChart, handleChart } = useActiveChart();
  const labels = datas.map((item) => item.year_MONTH);
  const data = {
    labels: labels,

    datasets: [
      {
        label: "월 매출",
        data: datas.map((item) => item.sum),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y-axis-1",
        type: "line",
      },
      {
        label: "환자수",
        data: datas.map((item) => item.patientCount),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y-axis-2",
        type: "bar",
      },
    ],
  };

  useEffect(() => {}, []);

  return (
    <Wrapper>
      <ChartContainer>
        <Charts>
          <MainChart>
            <Line data={data} options={options} />
          </MainChart>
          {activeChart === "gender" && <PatientGenderTrends datas={gender} />}
          {activeChart === "averageAge" && (
            <AverageAgeChart datas={averageAge} />
          )}
          {activeChart === "revenue" && <RevenueChart basisData={salesMonth} />}
          {activeChart === "latest" && <LatestChart basisData={recentMonth} />}
        </Charts>

        <Buttons>
          <Button
            width="100px"
            padding="10px"
            borderRadius="7px"
            onClick={() => handleChart("gender")}
          >
            월별 성별
          </Button>
          <Button
            width="100px"
            padding="10px"
            borderRadius="7px"
            onClick={() => handleChart("averageAge")}
            whiteSpace="nowrap"
          >
            월별 평균 나이
          </Button>
          <Button
            width="100px"
            padding="10px"
            borderRadius="7px"
            onClick={() => handleChart("revenue")}
          >
            매출별
          </Button>
          <Button
            width="100px"
            padding="10px"
            borderRadius="7px"
            onClick={() => handleChart("latest")}
          >
            최신순
          </Button>
        </Buttons>
      </ChartContainer>
    </Wrapper>
  );
};

export default MonthlyChart;
