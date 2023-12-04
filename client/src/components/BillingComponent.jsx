import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";
import Invoice from "./Invoice";
import { toast } from "react-toastify";
import Loader from "./Loader";

const BillingComponent = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const isDoctor = true;

  const [patientInfo, setPatientInfo] = useState([]);
  const [cost, setCost] = useState([]);
  const [prevCost, setPrevCost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/doctor/cost-view/${id}`);
        setPatientInfo(response.data.data[0]);
        setCost(response.data.data2);
        setPrevCost(response.data.data3);
        setIsLoading(false);
      } catch (error) {
        toast.error("데이터를 읽어오는데 실패했습니다.");
      }
    };

    fetchData();
  }, [id]);

  return (
    <Container>
      <Header>의료비 청구</Header>
      {isLoading && <Loader />}
      <Invoice
        patientInfo={patientInfo}
        id={id}
        cost={cost}
        prevCost={prevCost}
        isDoctor={isDoctor}
      />
    </Container>
  );
};

export default BillingComponent;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 1300px;
  min-height: 900px;
  position: relative;
`;

const Header = styled.div`
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 25px;
  position: absolute;
  top: 100px;
`;
