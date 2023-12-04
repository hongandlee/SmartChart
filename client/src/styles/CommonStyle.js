import styled from "styled-components";
import { palette } from "./GlobalStyles";
import { Link } from "react-router-dom";

export const CheckBoxContainer = styled.div`
  width: 100%;
  height: 50px;
`;

export const PContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #333;
  padding-top: 20px;
`;
export const PasswordTitle = styled.div`
  font-size: 20px;
  padding: 10px;
  background-color: #1798e1;
  border-radius: 5px;
  color: #fff;
  font-weight: 600;
  width: 50%;
  position: absolute;
  top: 10px;
  text-align: center;
  z-index: 1;
`;
export const PContent = styled.div`
  border: 1px solid #333;
  border-radius: 5px;
  padding: 20px;
  padding-top: 40px;
`;
export const PInput = styled.input`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  line-height: 1.5;
  border-color: #1798e1;
  border-radius: 3px;
`;

export const PButton = styled.button`
  background-color: #1798e1;
  border: none;
  color: #fff;
  font-weight: 600;
  padding: 5px 10px;
`;
export const Error = styled.div`
  color: red;
  margin-bottom: 5px;
  font-size: 14px;
`;
export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  justify-content: center;
  margin: 10px 0;
`;
export const LabelWrapper = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
export const Form = styled.form`
  margin: 0 auto;
  max-width: 680px;
  padding: 20px;
  margin-top: 20px;
  min-height: 10vh;
`;
export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Section = styled.div`
  display: ${(props) => (props.email ? "flex" : "")};
  justify-content: ${(props) => (props.email ? "space-between" : "")};
  align-items: ${(props) => (props.email ? "flex-end" : "")};
  margin-top: 20px;
  width: 100%;
`;
export const SectionInput = styled.input`
  margin-top: 20px;
  height: 40px;
  padding: 10px 10px;
  font-size: 16px;
  border-radius: 0.3rem;
  border: 1px solid lightgray;
  width: 100%;
  max-width: 680px;
`;

export const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 5px;
  margin-top: 10px;
`;
export const SubmitButton = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 10px 10px;
  border-radius: 0.3rem;
  border: 1px solid lightgray;
  max-width: 680px;
  float: right;
  margin: 0 auto;
  cursor: pointer;
  font-size: 16px;
  background-color: #1798e1;
  color: white;
  font-weight: 600;
`;

export const HelpContainer = styled.div`
  margin-top: 20px;
  width: 50%;
  display: flex;
  justify-content: space-between;
`;
export const SignupLink = styled(Link)`
  text-decoration: none;
  color: ${palette.gray.dark};
`;
export const Password = styled.div`
  color: ${palette.gray.dark};
`;
export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 900px;
  min-height: calc(100vh - 80px);
  height: auto;
  position: relative;
  overflow-y: auto;
`;
export const Wrapper = styled.div`
  display: flex;
  position: absolute;
  top: 100px;
  flex-direction: column;
  align-items: center;
  width: 40%;
  min-width: 1100px;
  padding: 40px 10px 10px 10px;
  border: 1px solid ${palette.gray.border};
  border-radius: 20px;
  height: auto;
`;

export const Header = styled.div`
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 25px;
  position: absolute;
  top: 40px;
`;
