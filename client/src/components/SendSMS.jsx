import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";

function SendSMS() {
  const [recipientPhoneNumber, setRecipientPhoneNumber] = useState("");
  const [content, setContent] = useState("");

  const sendSMS = () => {};

  return (
    <Container>
      <Header>문자 전송하기</Header>
      <Body>
        <HospitalName>병원이름</HospitalName>
        <TextInput
          type="text"
          placeholder="수신인 전화번호는 (-)없이 기입해주시기 바랍니다."
          value={recipientPhoneNumber}
          onChange={(e) => setRecipientPhoneNumber(e.target.value)}
        />
        <Textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button width="100%" height="10px" onClick={sendSMS}>
          문자보내기
        </Button>
      </Body>
    </Container>
  );
}

export default SendSMS;
const Container = styled.div`
  padding: 30px;
  height: 300px;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  font-size: 24px;
  font-weight: 600;
`;
const Body = styled.div`
  width: 100%;
  padding: 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const HospitalName = styled.div`
  font-weight: 500;
`;

const TextInput = styled.input`
  width: 100%;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100%;
`;