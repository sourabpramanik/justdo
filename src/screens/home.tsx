import React, { useState } from "react"
import Masthead from "../components/masthead"
import MainScreen from "./main"
import AllNotes from "./all-notes"
import { TabView, SceneMap } from "react-native-tab-view"
import NavBar from "../components/navbar"
import AnimatedColorBox from "../components/animate-color-box"
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

const FirstRoute = () => <MainScreen />

const SecondRoute = () => <AllNotes />

const initialLayout = {
  width: Dimensions.get("window").width
}
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute
})

export default function HomeScreen() {
  const [index, setIndex] = useState(0)
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
        <Masthead />
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
