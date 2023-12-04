import React, { useEffect, useState } from "react";
import axios from "axios";
import Invoice from "./Invoice";
import { toast } from "react-toastify";
import { Container, Header } from "../styles/CommonStyle";
import Loader from "./Loader";

const PatientBill = ({ id }) => {
  const [detailCost, setDetailCost] = useState([]);
  const [patient, setPatient] = useState({});
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "/patient/cost",
          {
            reservationId: id,
          },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        setDetailCost(response.data.data2);
        setPatient(response.data.data[0]);
        setTotal(response.data.date3[0].sum);
        setIsLoading(false);
      } catch (error) {
        toast.error("데이터를 읽어오는데 실패했습니다.");
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      {isLoading && <Loader />}
      <Invoice
        detailCost={detailCost}
        patientInfo={patient}
        sum={total}
        id={id}
        patientDetailCost={detailCost}
      />
    </Container>
  );
};

export default PatientBill;
