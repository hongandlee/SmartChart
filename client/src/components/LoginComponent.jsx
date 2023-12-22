import React from "react";
import Loader from "./Loader";
import SaveIdCheckbox from "./SaveIdCheckbox";
import Logo from "./Logo";
import Modal from "./Modal";
import Input from "./Input";
import {
  CheckBoxContainer,
  Error,
  Form,
  HelpContainer,
  Label,
  LabelWrapper,
  LogoContainer,
  PButton,
  PContainer,
  PContent,
  PInput,
  Password,
  PasswordTitle,
  Section,
  SelectWrapper,
  SignupLink,
} from "../styles/CommonStyle";
import styled from "styled-components";

const LoginComponent = ({
  email,
  password,
  error,
  isRememberMe,
  isDoctor,
  isLoading,
  findPassword,
  isValidEmail,
  emailAddress,
  onChange,
  handleRadioChange,
  checkEmailValidity,
  handlePassword,
  userLogin,
  findPasswordButton,
  setEmailAddress,
  setIsRememberMe,
}) => {
  return (
    <Container>
      {isLoading && <Loader />}
      <Form onSubmit={userLogin}>
        <LogoContainer>
          <Logo />
        </LogoContainer>

        <Section>
          <SelectWrapper>
            <LabelWrapper>
              환자
              <input
                type="radio"
                value="patient"
                name="isDoctor"
                checked={!isDoctor}
                onChange={handleRadioChange}
              />
            </LabelWrapper>
            <LabelWrapper>
              의사
              <input
                type="radio"
                value="doctor"
                name="isDoctor"
                checked={isDoctor}
                onChange={handleRadioChange}
              />
            </LabelWrapper>
          </SelectWrapper>
        </Section>
        <Section>
          <Label htmlFor="email">이메일</Label>
          <Input
            type="text"
            name="email"
            id="email"
            required
            value={email}
            onChange={onChange}
          />
        </Section>
        <Section>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            type="password"
            name="password"
            id="password"
            required
            value={password}
            onChange={onChange}
          />
        </Section>
        {error && error?.length > 0 && (
          <Section>
            <Error>{error}</Error>
          </Section>
        )}
        <HelpContainer>
          <Password onClick={handlePassword}>비밀번호 찾기</Password>
          <SignupLink to="/signup">회원가입하기</SignupLink>
        </HelpContainer>
        {findPassword === true && (
          <Modal isOpen={findPassword} handleModal={handlePassword}>
            <PContainer>
              <PasswordTitle>
                <div
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  비밀번호 찾기
                </div>
              </PasswordTitle>
              <PContent>
                <span style={{ color: "#555" }}>
                  입력한 이메일로 임시 비밀번호가 전송됩니다.
                </span>
                <PInput
                  type="email"
                  placeholder="qwerty@email.com"
                  onChange={(e) => {
                    setEmailAddress(e.target.value);
                    checkEmailValidity(e);
                  }}
                />
                <Error>
                  {!isValidEmail && "이메일 주소가 유효하지 않습니다."}
                </Error>
                <PButton onClick={findPasswordButton}>비밀번호 전송</PButton>
              </PContent>
            </PContainer>
          </Modal>
        )}
        <Section>
          <CheckBoxContainer>
            <SaveIdCheckbox
              checked={isRememberMe}
              onChange={() => setIsRememberMe(!isRememberMe)}
            />
          </CheckBoxContainer>
        </Section>
        <LoginWrapper>
          <LoginButton
            type="submit"
            value="로그인"
            disabled={error?.length > 0}
            isDoctor={isDoctor}
          />
        </LoginWrapper>
      </Form>
    </Container>
  );
};

export default LoginComponent;

const Container = styled.div`
  margin-top: 150px;
`;

const LoginButton = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  padding: 10px 10px;
  border-radius: 0.3rem;
  border: 1px solid lightgray;
  margin: 0 auto;
  cursor: pointer;
  font-size: 16px;
  background-color: #1798e1;
  color: white;
  font-weight: 600;
  width: 800px;
`;
const LoginWrapper = styled.div`
  max-width: 680px;
  display: flex;
  flex-direction: row;
  @media (max-width: 640px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
`;
