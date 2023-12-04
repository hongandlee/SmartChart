import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { palette } from "../styles/GlobalStyles";
import { useRecoilState } from "recoil";
import { answerAtom } from "../stores/answerAtom";
import { questions } from "../assets/questions";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "./Loader";

const SelfDiagnosisComponent = ({ id }) => {
  const [answers, setAnswers] = useRecoilState(answerAtom);
  const [data, setData] = useState([]);
  const localStorageUserRole = localStorage.getItem("userRole");
  const [isLoading, setIsLoading] = useState(false);

  const handleAnswer = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = {
      questionNumber: index + 1,
      answer: value,
    };
    setAnswers(newAnswers);
  };
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      if (localStorageUserRole === "DOCTOR") {
        setIsLoading(true);

        try {
          const response = await axios.post(
            `/doctor/health-check`,
            {
              patientId: id,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setData(response.data.data);
          if (response.data.data.length === 0) {
            toast.error("환자가 아직 체크하지 않았습니다.");
          }
          setIsLoading(false);
        } catch (error) {
          toast.error(error);
          console.error(error);
        }
      }
    };

    fetchData();
  }, [id, localStorageUserRole]);

  return (
    <Table>
      <Subject>
        <Title>기본 건강 체크</Title>
        {isLoading && <Loader />}
        <Body>
          {data.length !== 0
            ? data.map(({ questionNumber, answer, idx }) => (
                <div key={idx}>
                  <SubTitle>
                    {questionNumber}. {questions[questionNumber - 1].question}
                  </SubTitle>
                  <div>
                    <Label>
                      <input
                        type="radio"
                        value="예"
                        defaultChecked={answer === "Y"}
                        style={{ marginRight: "30px" }}
                      />
                      네
                    </Label>
                    <Label>
                      <input
                        type="radio"
                        value="아니오"
                        defaultChecked={answer === "N"}
                        style={{ marginRight: "30px" }}
                      />
                      아니요
                    </Label>
                    <Label>
                      <input
                        type="radio"
                        value="모름"
                        defaultChecked={answer === "unawareness"}
                        style={{ marginRight: "30px" }}
                      />
                      모름
                    </Label>
                  </div>
                </div>
              ))
            : questions.map(({ question, questionId }) => (
                <div key={questionId}>
                  <SubTitle>
                    {questionId}. {question}
                  </SubTitle>
                  <div>
                    <Label>
                      <input
                        type="radio"
                        value="네"
                        checked={answers[questionId - 1].answer === "Y"}
                        onChange={() => handleAnswer(questionId - 1, "Y")}
                        style={{ marginRight: "30px" }}
                      />
                      네
                    </Label>
                    <Label>
                      <input
                        type="radio"
                        value="아니오"
                        checked={answers[questionId - 1].answer === "N"}
                        onChange={() => handleAnswer(questionId - 1, "N")}
                        style={{ marginRight: "30px" }}
                      />
                      아니요
                    </Label>
                    <Label>
                      <input
                        type="radio"
                        value="모름"
                        checked={
                          answers[questionId - 1].answer === "unawareness"
                        }
                        onChange={() =>
                          handleAnswer(questionId - 1, "unawareness")
                        }
                        style={{ marginRight: "30px" }}
                      />
                      모름
                    </Label>
                  </div>
                </div>
              ))}
        </Body>
      </Subject>
    </Table>
  );
};

export default SelfDiagnosisComponent;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Subject = styled.div`
  height: 70%;
  min-width: 450px;
  min-height: 700px;
  display: flex;
  flex-direction: column;
  outline: 1px solid ${palette.gray.border};
  margin-bottom: 30px;
  margin-top: 30px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
  width: 100%;
  height: calc(100% / 9);
  background-color: ${palette.gray.light};
  padding: 1rem;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% / 9 * 8);
  & > div {
    margin-bottom: 1px;
  }
  & > label + label {
    margin-top: 1px;
  }
  /* background-color: yellow; */
`;

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  font-weight: 600;
  padding-left: 10px;
  background-color: ${palette.blue.light};
  outline: 1px solid ${palette.gray.border};
`;

const Label = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 30px;
  outline: 1px solid ${palette.gray.border};
  padding-left: 10px;
`;
