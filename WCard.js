import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, PanResponder, View } from "react-native";
import styled from "styled-components/native";

const WordCard = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  border-radius: 10px;
  width: 100px;
  height: 150px;
  justify-content: center;
  align-items: center;
`;
const Word = styled.Text`
  font-size: 38px;
  font-weight: 900;
  text-align: center;
  justify-content: center;
  align-items: center;
  color: #f32075;
`;

export default function WCard({ word, setWordArray, setInputArray }) {
  // Values
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  // Animations
  const onPressIn = Animated.spring(scale, {
    toValue: 0.9,
    useNativeDriver: true,
  });
  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const goHome = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });
  //   const reset = Animated.timing(position, {
  //     toValue: 0,
  //     duration: 50,
  //     easing: Easing.linear,
  //     useNativeDriver: true,
  //   });
  const onDropScale = Animated.timing(scale, {
    toValue: 0,
    duration: 50,
    easing: Easing.linear,
    useNativeDriver: true,
  });
  const onDropOpacity = Animated.timing(opacity, {
    toValue: 0,
    duration: 50,
    easing: Easing.linear,
    useNativeDriver: true,
  });
  const remove = () => {
    setWordArray((prev) => {
      const copy = [...prev];
      const num = copy.indexOf(word);
      copy.splice(num, 1);
      return [...copy];
    });
    setInputArray((prev) => {
      const copy = [...prev];
      copy.push(word);
      return [...copy];
    });
  };
  // Pan Responders
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx, dy }) => {
        position.setValue({ x: dx, y: dy });
      },
      onPanResponderGrant: () => {
        onPressIn.start();
      },
      onPanResponderRelease: (_, { dy }) => {
        if (220 < dy) {
          Animated.sequence([
            Animated.parallel([onDropScale, onDropOpacity]),
            // reset,
          ]).start(remove());
        } else {
          Animated.parallel([onPressOut, goHome]).start();
        }
      },
    })
  ).current;
  // State
  //   const nextIcon = () => {
  //     setIndex((prev) => prev + 1);
  //     Animated.parallel([
  //       Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
  //       Animated.spring(opacity, { toValue: 1, useNativeDriver: true }),
  //     ]).start();
  //   };
  return (
    <WordCard
      {...panResponder.panHandlers}
      style={{
        opacity: opacity,
        transform: [...position.getTranslateTransform(), { scale }],
      }}
    >
      <Word>{word}</Word>
    </WordCard>
  );
}
