import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { palette } from "../styles/GlobalStyles";
import Button from "../components/Button";
import Modal from "../components/Modal";
import PatientBill from "../components/PatientBill";
import axios from "axios";
import { Container, Header, Wrapper } from "../styles/CommonStyle";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Pay = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [list, setList] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [patient, setPatient] = useState({});
  const [total, setTotal] = useState(0);
  const [id, setId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleModal = (itemId) => {
    setSelectedItemId(itemId);
    setIsModalOpen(!isModalOpen);
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/patient/cost-view", {});
      setList(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePayment = async (id) => {
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
      setPatient(response.data.data[0]);
      setTotal(response.data.date3[0].sum);
      setId(id);
      kakaoPay();
    } catch (error) {
      toast.error("정보를 가져오는데 실패했습니다.");
    }
  };
  const kakaoPay = () => {
    const IMP = window.IMP;
    IMP.init("imp18267031");

    IMP.request_pay(
      {
        pg: "kakaopay.TC0ONETIME",
        pay_method: "kakaopay",
        merchant_uid: "patient_" + new Date().getTime(),
        name: "병원비 내기",
        amount: total,
        reservationId: id,
        hospital_name: patient.hospitalName,
        patient_name: patient.name,
      },

      function (rsp) {
        if (rsp.success) {
          let data = {
            imp_uid: rsp.imp_uid,
            amount: rsp.paid_amount,
            reservationId: id,
          };
          fetch("/patient/vertifyIamport", {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((result) => {
              alert("결제 및 결제 검증이 완료되었습니다.");
            })
            .catch((error) => {
              alert(error.message);
            });
        } else {
          alert("결제 실패1");
        }
      }
    );
  };
  useEffect(() => {
    // total이 들어왔고, patient 객체있어야 카카오로 요청
    if (total > 0 && patient && Object.keys(patient).length > 0) {
      kakaoPay(id, total, patient);
    }
  }, [total, patient]);

  return (
    <Container>
      <Wrapper>
        <Header>진료비</Header>
        <TableContainer>
          {isLoading && <Loader />}

          <TableHeader>
            <TableCell>예약번호</TableCell>
            <TableCell>병원명</TableCell>
            <TableCell>진료날짜</TableCell>
            <TableCell>환자 성명</TableCell>
            <TableCell>총 금액</TableCell>
            <TableCell>진료비 납부상태</TableCell>
            <TableCell>진료비 보기</TableCell>
            <TableCell>진료비 내기</TableCell>
          </TableHeader>

          <TableBody>
            {list.map((item, itemIndex) => (
              <TableRow key={itemIndex}>
                <div>{item.id}</div>
                <div>{item.hospitalName}</div>
                <div>{item.reservationDate}</div>
                <div>{item.name}</div>
                <div>{item.sum}원</div>
                <div>{item.patientPaymentStatus}</div>
                <ButtonContainer>
                  <Button
                    width="80px"
                    fontSize="12px"
                    padding="5px"
                    borderRadius="7px"
                    onClick={() => handleModal(item.id)}
                  >
                    진료비 보기
                  </Button>
                </ButtonContainer>
                <ButtonContainer>
                  <Button
                    width="80px"
                    fontSize="12px"
                    padding="5px"
                    borderRadius="7px"
                    onClick={() => handlePayment(item.id)}
                    disabled={item.patientPaymentStatus === "완료"}
                  >
                    진료비 내기
                  </Button>
                </ButtonContainer>
              </TableRow>
            ))}
          </TableBody>
        </TableContainer>
        <Modal isOpen={isModalOpen} handleModal={handleModal}>
          <PatientBill id={selectedItemId} />
        </Modal>
      </Wrapper>
    </Container>
  );
};
export default Pay;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 0;
  width: 1000px;
`;

const TableHeader = styled.div`
  display: flex;
  width: 100%;
  height: 20%;
  background-color: ${palette.gray.light};
  border-top: 1px solid ${palette.gray.border};
  border-bottom: 1px solid ${palette.gray.border};
  padding: 10px;
  & > div {
    flex: 1;
    padding: 5px;
  }
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5px;
`;

const TableRow = styled.div`
  display: flex;
  margin: 5px 0px;
  & > div {
    flex: 1;
    padding: 5px;
    align-items: center;
    text-align: center;
  }
`;

const TableCell = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-weight: bold;
  font-size: 16px;
  border-left: ${(props) =>
    props.index !== 0 && `1px solid ${palette.gray.border}`};
  white-space: nowrap;
`;
const ButtonContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
