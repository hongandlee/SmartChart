import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Button from "../components/Button";
import { palette } from "../styles/GlobalStyles";
import axios from "axios";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { hospitalAtom } from "../stores/userInfo";
import Loader from "../components/Loader";
import { Container, Header, Wrapper } from "../styles/CommonStyle";

const HospitalPage = () => {
  const [hospitalInfo, setHospitalInfo] = useRecoilState(hospitalAtom);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await axios.get("/doctor/hospital-view", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setHospitalInfo(response.data.hospitalPage[0]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;

    setHospitalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    try {
      await axios.patch("/doctor/hospital", {
        hospitalName: hospitalInfo.hospitalName,
        hospitalPhoneNumber: hospitalInfo.hospitalPhoneNumber,
        hospitalIntroduction: hospitalInfo.hospitalIntroduce,
      });
      setHospitalInfo((prev) => ({ ...prev }));
      toast.success("성공적으로 업데이트 되었습니다.");
    } catch (error) {
      toast.error("에러가 발생하였습니다.");
    }
  };

  return (
    <Container>
      <Wrapper>
        <Header>병원페이지</Header>
        {isLoading && <Loader />}
        <Table>
          <tbody>
            <TR>
              <TH top="true">병원명</TH>
              <TD top="true">
                <Input
                  type="text"
                  name="hospitalName"
                  onChange={onChange}
                  value={hospitalInfo && hospitalInfo.hospitalName}
                  readOnly={false}
                />
              </TD>
            </TR>

            <TR alternate="true">
              <TH alternate="true">전화번호</TH>
              <TD>
                <Input
                  alternate="true"
                  type="text"
                  name="hospitalPhoneNumber"
                  onChange={onChange}
                  value={hospitalInfo && hospitalInfo.hospitalPhoneNumber}
                />
              </TD>
            </TR>
            <TR>
              <TH bottom="true">병원소개</TH>
              <TD bottom="true">
                <Textarea
                  type="text"
                  name="hospitalIntroduce"
                  onChange={onChange}
                  value={
                    hospitalInfo && hospitalInfo.hospitalIntroduce === null
                      ? "클릭하여 병원 소개를 입력해주세요"
                      : hospitalInfo.hospitalIntroduce
                  }
                />
              </TD>
            </TR>
          </tbody>
        </Table>
        <Button
          width="120px"
          height="45px"
          fontSize="16px"
          onClick={handleSubmit}
          borderRadius="10px"
        >
          업데이트
        </Button>
      </Wrapper>
    </Container>
  );
};

export default HospitalPage;

const Table = styled.table`
  border-collapse: collapse;
  width: 60%;
  min-width: 400px;
  height: 500px;
  margin-top: 100px;
  margin-bottom: 30px;
`;

const TH = styled.th`
  padding: 5px;
  border-right: 1px solid ${palette.gray.border};
  text-align: center;
  vertical-align: middle; /* 수직 가운데 정렬 */
  font-weight: 700;
  font-size: 20px;
  background-color: ${(props) =>
    props.alternate ? `${palette.white}` : `#E0E3E6`};
  border-top-left-radius: ${(props) => (props.top ? "10px" : "0")};
  border-bottom-left-radius: ${(props) => (props.bottom ? "10px" : "0")};
`;

const TD = styled.td`
  padding: 10px;
  text-align: center;
  border-top-right-radius: ${(props) => (props.top ? "10px" : "0")};
  border-bottom-right-radius: ${(props) => (props.bottom ? "10px" : "0")};
`;
const TR = styled.tr`
  height: 3rem;
  background-color: ${(props) =>
    props.alternate ? `${palette.white}` : "#E0E3E6"};
`;

const Input = styled.input`
  width: 100%;
  line-height: 2;
  padding: 0;
  font-size: 18px;
  background-color: ${(props) =>
    props.alternate ? `${palette.white}` : "#E0E3E6"};
  border: none;
  font-weight: 500;
`;

const Textarea = styled.textarea`
  width: 100%;
  line-height: 3;
  border: none;
  font-weight: 500;
  background-color: #e0e3e6;
  font-size: 18px;
`;
