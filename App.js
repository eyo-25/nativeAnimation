import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import WBord from "./WBord";
import Result from "./Result";
import { PINK } from "./Color";

const Container = styled.View`
  flex: 1;
  background-color: ${PINK};
`;

export default function App() {
  const [isFinish, setIsFinish] = useState(false);
  const [failArry, setFailArry] = useState([]);
  const [answerArry, setAnswerArry] = useState([]);
  return (
    <Container>
      <StatusBar style="light" />
      {isFinish ? (
        <Result
          failArry={failArry}
          answerArry={answerArry}
          setIsFinish={setIsFinish}
          setFailArry={setFailArry}
          setAnswerArry={setAnswerArry}
        />
      ) : (
        <WBord
          setIsFinish={setIsFinish}
          setFailArry={setFailArry}
          setAnswerArry={setAnswerArry}
        />
      )}
    </Container>
  );
}
