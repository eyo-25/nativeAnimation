import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, View } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import WCard from "./WCard";
import { Fontisto } from "@expo/vector-icons";

const AnswerBox = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Answer = styled(Animated.createAnimatedComponent(View))`
  width: 200px;
  height: 200px;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 100px;
  z-index: 12;
`;

const Top = styled.View`
  flex: 3;
  justify-content: flex-end;
  align-items: center;
  z-index: 10;
`;
const TopText = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: white;
  margin-bottom: 10px;
`;
const Center = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`;
const Edge = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
`;
const InputBox = styled(Animated.createAnimatedComponent(View))`
  width: 100%;
  padding-left: 20%;
  padding-right: 20%;
`;
const WordInput = styled.View`
  height: 80px;
  justify-content: center;
  align-items: center;
  border-color: white;
  border-width: 3px;
  border-radius: 10px;
  flex-direction: row;
`;

const WordText = styled.Text`
  color: white;
  font-size: 30px;
  letter-spacing: 5px;
`;

const CardBox = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  z-index: 10;
`;

export default function WBord({
  gameArry,
  setIsFinish,
  setFailArry,
  setAnswerArry,
}) {
  // State
  const [index, setIndex] = useState(0);
  const [wordArray, setWordArray] = useState([]);
  const [inputArray, setInputArray] = useState([]);
  const [isPass, setIsPass] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const arry = gameArry[index].word.split("-");
  const answer = gameArry[index].word.replace(/-/g, "");
  const submitWord = inputArray.join("");
  const nextIcon = () => {
    setIndex((prev) => prev + 1);
  };
  // Values
  const scale = useRef(new Animated.Value(0)).current;
  // Animations
  const creatScale = Animated.timing(scale, {
    toValue: 1,
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: true,
    duration: 250,
  });
  const increaseScale = Animated.timing(scale, {
    delay: 550,
    toValue: 10,
    duration: 800,
    useNativeDriver: true,
  });
  const opacity = scale.interpolate({
    inputRange: [0, 1, 9, 10],
    outputRange: [0, 1, 0.9, 0],
    extrapolate: "clamp",
  });
  //useEffect
  useEffect(() => {
    return () => {};
  }, []);
  useEffect(() => {
    setWordArray(() => {
      arry.sort(() => Math.random() - 0.5);
      return [...arry];
    });
  }, [index]);
  useEffect(() => {
    if (wordArray.length <= 0 && arry.length === inputArray.length) {
      setIsPass(true);
      if (submitWord === answer) {
        setSuccess(true);
        setAnswerArry((prev) => {
          const copy = [...prev];
          const obj = {
            index: index,
            word: answer,
            answer: answer,
          };
          copy.push(obj);
          return [...copy];
        });
      } else {
        setSuccess(false);
        setFailArry((prev) => {
          const copy = [...prev];
          const obj = {
            index: index,
            word: submitWord,
            answer: answer,
          };
          copy.push(obj);
          return [...copy];
        });
      }
      creatScale.start(() => {
        if (gameArry.length - 1 !== index) {
          setTimeout(() => {
            nextIcon();
            setInputArray([]);
          }, 600);
        }
        increaseScale.start(() => {
          if (gameArry.length - 1 === index) {
            setIsFinish(true);
            return;
          }
          setIsPass(false);
          scale.setValue(0);
        });
      });
    }
  }, [wordArray]);

  return (
    <>
      <Top>
        <TopText>😜 What is This?</TopText>
        <Ionicons name={gameArry[index].name} color="white" size={200} />
      </Top>
      <Center>
        <CardBox>
          {wordArray.map((word, i) => (
            <WCard
              key={word}
              word={word}
              setWordArray={setWordArray}
              setInputArray={setInputArray}
            />
          ))}
        </CardBox>
      </Center>
      <Edge>
        <InputBox>
          <WordInput>
            {inputArray.map((word, i) => (
              <WordText key={i}>{word}</WordText>
            ))}
          </WordInput>
        </InputBox>
      </Edge>
      {isPass ? (
        <AnswerBox>
          <Answer
            style={{
              opacity: opacity,
              transform: [{ scale }],
            }}
          >
            <Fontisto
              name={isSuccess ? "check" : "ban"}
              size={80}
              color={isSuccess ? "#2ecc71" : "#e74c3c"}
            />
          </Answer>
        </AnswerBox>
      ) : null}
    </>
  );
}
