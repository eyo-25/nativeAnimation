import React, { useEffect } from "react";
import styled from "styled-components/native";
import { GREY, PINK } from "./Color";
import { Ionicons } from "@expo/vector-icons";
import icons from "./icons";

const Top = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
`;
const Center = styled.ScrollView`
  flex: 5;
`;
const ContentContainer = styled.View`
  justify-content: flex-start;
  align-items: center;
`;
const RefreshBtn = styled.TouchableOpacity`
  margin-top: 10px;
`;
const TopHeaderText = styled.Text`
  color: white;
  font-size: 40px;
  font-weight: 800;
`;
const CenterHeaderText = styled.Text`
  color: white;
  font-size: 30px;
  font-weight: 600;
  margin: 20px 0;
`;
const RowWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const ContentBox = styled.View`
  align-items: center;
  justify-content: center;
  width: 50%;
`;
const ContentCard = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 80%;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const ContentHeadText = styled.Text`
  color: white;
  margin: 20px 0;
  font-size: 20px;
  font-weight: 800;
`;

const ContentText = styled.Text`
  color: ${(prop) => prop.color};
  margin: 20px 0;
  font-size: 20px;
  font-weight: 800;
`;

export default function Result({
  failArry,
  answerArry,
  setAnswerArry,
  setFailArry,
  setIsFinish,
  setGameIndex,
  gameArry,
}) {
  const total = failArry.length + answerArry.length;
  useEffect(() => {
    return () => {
      setAnswerArry([]);
      setFailArry([]);
    };
  }, []);
  const onRefresh = () => {
    setIsFinish(false);
    setGameIndex((prev) => (gameArry.length <= prev + 1 ? 0 : prev + 1));
  };
  return (
    <>
      <Top>
        <TopHeaderText>Game Result</TopHeaderText>
        <TopHeaderText>
          {answerArry.length}/{total}
        </TopHeaderText>
        <RefreshBtn onPress={onRefresh}>
          <Ionicons name="ios-refresh-circle" size={50} color="white" />
        </RefreshBtn>
      </Top>
      <Center>
        {failArry.length > 0 ? (
          <ContentContainer>
            <CenterHeaderText>FAIL WORD</CenterHeaderText>
            <RowWrapper>
              <ContentBox>
                <ContentHeadText>제출한 단어</ContentHeadText>
              </ContentBox>
              <ContentBox>
                <ContentHeadText>정답</ContentHeadText>
              </ContentBox>
            </RowWrapper>
            <RowWrapper>
              <ContentBox>
                {failArry.map((obj) => (
                  <ContentCard key={obj.word}>
                    <ContentText color={GREY}> {obj.word}</ContentText>
                  </ContentCard>
                ))}
              </ContentBox>
              <ContentBox>
                {failArry.map((obj) => (
                  <ContentCard key={obj.word}>
                    <Ionicons
                      name={icons[obj.index].name}
                      color={PINK}
                      size={30}
                    />
                    <ContentText color={PINK}>: {obj.answer}</ContentText>
                  </ContentCard>
                ))}
              </ContentBox>
            </RowWrapper>
          </ContentContainer>
        ) : null}
        {answerArry.length > 0 ? (
          <ContentContainer>
            <CenterHeaderText>CORRECT WORD</CenterHeaderText>
            <RowWrapper>
              <ContentBox>
                <ContentHeadText>제출한 단어</ContentHeadText>
              </ContentBox>
              <ContentBox>
                <ContentHeadText>정답</ContentHeadText>
              </ContentBox>
            </RowWrapper>
            <RowWrapper>
              <ContentBox>
                {answerArry.map((obj) => (
                  <ContentCard key={obj.word}>
                    <ContentText color={GREY}> {obj.word}</ContentText>
                  </ContentCard>
                ))}
              </ContentBox>
              <ContentBox>
                {answerArry.map((obj) => (
                  <ContentCard key={obj.word}>
                    <Ionicons
                      name={icons[obj.index].name}
                      color="#F32075"
                      size={30}
                    />
                    <ContentText color={PINK}>: {obj.answer}</ContentText>
                  </ContentCard>
                ))}
              </ContentBox>
            </RowWrapper>
          </ContentContainer>
        ) : null}
      </Center>
    </>
  );
}
