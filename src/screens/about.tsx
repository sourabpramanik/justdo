import React from "react"
import {
  Box,
  Text,
  VStack,
  ScrollView,
  Icon,
  useColorModeValue,
  Image
} from "native-base"
import { Feather } from "@expo/vector-icons"
import AnimatedColorBox from "../components/animate-color-box"
import NavBar from "../components/navbar"
import TitleMastHead from "../components/title-masthead"
import LinkButton from "../components/link-button"
function AboutScreen() {
  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue("warmGray.50", "warmGray.900")}
      w="full"
    >
      <TitleMastHead
        title="About Just Do."
        subtitle="A simple app to help you manage your daily tasks."
      />
      <ScrollView
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        bg={useColorModeValue("warmGray.50", "primary.900")}
        mt="-20px"
        pt="30px"
        p={4}
      >
        <VStack flex={1} space={4}>
          <Box alignItems="center">
            <Image
              source={require("../assets/justdo-logo.png")}
              borderRadius={10}
              resizeMode="cover"
              w={120}
              h={120}
              alt="author"
            />
          </Box>
          <Text fontSize="md" w="full">
            Just Do is a simple app to help you manage your daily tasks. It
            helps you to keep track of your tasks and also helps you to organize
            your tasks. From the moment you create an account, you can create
            tasks and add them to your task list. You can also add a due date to
            your task. You can also mark your tasks as completed. You can also
            see your tasks in a calendar view. It also lets you take notes on
            your tasks. You can add important detail from your projects,
            meetings, and other important notes.
          </Text>
          <Text fontSize="lg" w="full" bold textAlign="center">
            Developed by{" Sourab Pramanik "}
          </Text>
          <Text fontSize="lg" w="full" bold textAlign="center">
            Designed by
            {" T Jaydeep Rao "}
          </Text>
          {/* <LinkButton
            colorScheme="red"
            size="lg"
            borderRadius="full"
            href="https://www.youtube.com/devaslife"
            leftIcon={
              <Icon as={Feather} name="youtube" size="sm" opacity={0.5} />
            }
          >
            Go to YouTube channel
          </LinkButton> */}
          <LinkButton
            colorScheme={useColorModeValue("blue", "darkBlue")}
            size="lg"
            borderRadius="full"
            href="https://twitter.com/sourab_pramanik"
            leftIcon={
              <Icon as={Feather} name="twitter" size="sm" opacity={0.5} />
            }
          >
            @sourab_pramanik
          </LinkButton>
          <LinkButton
            colorScheme={useColorModeValue("blue", "darkBlue")}
            size="lg"
            borderRadius="full"
            href="https://twitter.com/jaydeeprao_"
            leftIcon={
              <Icon as={Feather} name="twitter" size="sm" opacity={0.5} />
            }
          >
            @jaydeeprao_
          </LinkButton>
        </VStack>
      </ScrollView>
    </AnimatedColorBox>
  )
}

export default AboutScreen
