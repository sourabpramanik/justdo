import React, { useRef } from 'react';
import { VStack, Text, useColorModeValue } from "native-base"
import { View, FlatList } from "react-native"
import AnimatedColorBox from "../components/animate-color-box"
import WorkItem from "../components/work-item"
import { Animated } from 'react-native';

const workItemData = [
  {
    id: 1,
    label: "Zeus Project"
  },
  {
    id: 2,
    label: "Client Project"
  },
  {
    id: 3,
    label: "Project 3"
  },
  {
    id: 4,
    label: "Project 4"
  },
  {
    id: 5,
    label: "Project 5"
  },
  {
    id: 6,
    label: "Project 6"
  },
  {
    id: 7,
    label: "Project 7"
  },
  {
    id: 8,
    label: "Project 8"
  }
]
const SPACING = 20;
const ITEM_SIZE = 60 + SPACING * 3;

export default function WorkBoard() {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <VStack bg={useColorModeValue("warmGray.50", "primary.900")} flex={1} w="full" justifyContent="center">
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        data={workItemData}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          padding: SPACING,
          justifyContent: 'center',
        }}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2)
          ]

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0]
          })

          return (
            <Animated.View style={{ justifyContent: "center", transform: [{ scale }] }}>
              <WorkItem label={item.label} />
            </Animated.View>
          )
        }}
      />
    </VStack>
  )
}
