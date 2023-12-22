import React from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { selectedOptionState } from "../stores/dateAtom";

const SelectData = ({ availableOption, title }) => {
  const [selectedOption, setSelectedOption] =
    useRecoilState(selectedOptionState);

  const handleTimeChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Container>
      <InfoTitle>{title}</InfoTitle>
      <OptionSelect value={selectedOption} onChange={handleTimeChange}>
        <option value="">{`${title} 선택`}</option>
        {availableOption.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </OptionSelect>
    </Container>
  );
};

export default SelectData;
const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const OptionSelect = styled.select`
  width: 70%;
  padding: 10px;
  margin: 10px 0;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
`;

const InfoTitle = styled.div`
  width: 30%;
`;
