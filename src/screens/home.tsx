import React, { useState, useEffect } from "react"
import Masthead from "../components/masthead"
import TaskPanel from "./tab-panels/task-panel"
import NotesPanel from "./tab-panels/notes-panel"
import { TabView, SceneMap } from "react-native-tab-view"
import NavBar from "../components/navbar"
import AnimatedColorBox from "../components/animate-color-box"
import AsyncStorage from "@react-native-async-storage/async-storage"

import {
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Animated,
  Pressable
} from "react-native"
import {
  Center,
  VStack,
  useColorModeValue,
  Fab,
  Icon,
  Box,
  Text
} from "native-base"

const FirstRoute = () => <TaskPanel />

const SecondRoute = () => <NotesPanel />

const initialLayout = {
  width: Dimensions.get("window").width
}
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute
})

export default function HomeScreen() {
  const [index, setIndex] = useState(0)
  const [dayCount, setDayCount] = useState({
    day: 0,
    activeDate: ""
  })

  useEffect(() => {
    if (dayCount.day === 0) {
      AsyncStorage.getItem("dayCount").then(res => {
        if (res) {
          const data = JSON.parse(res)
          if (new Date().toDateString() !== data.activeDate) {
            setDayCount({
              day: dayCount.day + 1,
              activeDate: new Date().toDateString()
            })
            AsyncStorage.setItem(
              "dayCount",
              JSON.stringify({
                day: data.day + 1,
                activeDate: new Date().toDateString()
              })
            )
          } else {
            setDayCount(data)
          }
        } else {
          setDayCount({
            day: dayCount.day + 1,
            activeDate: new Date().toDateString()
          })
          AsyncStorage.setItem(
            "dayCount",
            JSON.stringify({
              day: dayCount.day + 1,
              activeDate: new Date().toDateString()
            })
          )
        }
      })
    }
  }, [dayCount])

  const [routes] = useState([
    {
      key: "first",
      title: "Tasks"
    },
    {
      key: "second",
      title: "Notes"
    }
  ])
  function TabBar(props) {
    const tabBar = props.navigationState
    const inputRange = tabBar.routes.map((x, i) => i)
    return (
      <Box
        flexDirection="row"
        colorScheme={useColorModeValue("blue", "darkBlue")}
        bg={useColorModeValue("blue.500", "blue.400")}
        borderRadius={100}
        m={4}
      >
        {tabBar.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex =>
              inputIndex === i ? 1 : 0.5
            )
          })
          const color = tabBar.index === i ? "#000" : "#fff"
          const bgColor =
            tabBar.index === i
              ? "white"
              : useColorModeValue("blue.500", "blue.400")
          const boxShadow = tabBar.index === i ? "9" : null
          const border = tabBar.index === i ? 100 : 0
          return (
            <Box flex={1}>
              <Pressable
                onPress={() => {
                  setIndex(i)
                }}
              >
                <Box
                  alignItems="center"
                  p="2"
                  m="2"
                  bg={bgColor}
                  borderRadius={border}
                  shadow={boxShadow}
                >
                  <Text color={color} fontWeight="bold" fontSize="md">
                    {route.title}
                  </Text>
                </Box>
              </Pressable>
            </Box>
          )
        })}
      </Box>
    )
  }
  return (
    <AnimatedColorBox
      bg={useColorModeValue("warmGray.50", "primary.900")}
      w="full"
      flex={1}
    >
      <NavBar />
      <Center mx={5}>
        <Masthead dayCount={dayCount.day} />
      </Center>
      <VStack flex={1} space={1}>
        <TabView
          navigationState={{
            index,
            routes
          }}
          swipeEnabled={false}
          renderScene={renderScene}
          renderTabBar={TabBar}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
      </VStack>
    </AnimatedColorBox>
  )
}
