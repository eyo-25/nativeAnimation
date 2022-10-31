import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import WBord from "./WBord";
import Result from "./Result";
import { PINK } from "./Color";
import icons from "./icons";

const Container = styled.View`
  flex: 1;
  background-color: ${PINK};
`;

export default function App() {
  const [isFinish, setIsFinish] = useState(false);
  const [failArry, setFailArry] = useState([]);
  const [answerArry, setAnswerArry] = useState([]);
  const [gameArry, setGameArry] = useState([]);
  const [gameIndex, setGameIndex] = useState(0);
  useEffect(() => {
    const iconsLength = Math.floor(icons.length / 5);
    for (let i = 0; i < iconsLength; i++) {
      setGameArry((prev) => {
        const copy = [...prev];
        const sliceNumber = i * 5 > 0 ? i * 5 : 0;
        copy.push(icons.slice(sliceNumber, sliceNumber + 5));
        return [...copy];
      });
    }
  }, []);
  console.log(gameArry.length);
  return (
    <Container>
      <StatusBar style="light" />
      {gameArry.length > 0 ? (
        <>
          {isFinish ? (
            <Result
              failArry={failArry}
              answerArry={answerArry}
              setIsFinish={setIsFinish}
              setFailArry={setFailArry}
              setAnswerArry={setAnswerArry}
              setGameIndex={setGameIndex}
              gameArry={gameArry}
            />
          ) : (
            <WBord
              setIsFinish={setIsFinish}
              setFailArry={setFailArry}
              setAnswerArry={setAnswerArry}
              gameArry={gameArry[gameIndex]}
            />
          )}
        </>
      ) : null}
    </Container>
  );
}
