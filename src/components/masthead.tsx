import React, { useContext, useState, useEffect } from "react"
import { ImageSourcePropType, Pressable } from "react-native"
import {
  VStack,
  Text,
  useColorModeValue,
  Flex,
  Box,
  IconButton
} from "native-base"
import { MaterialIcons } from "@expo/vector-icons"
import UserContext from "../context/user"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface Props {
  title: string
  image: ImageSourcePropType
  children: React.ReactNode
  dayCount: number
}

const allAgendaItems = {
  "2022-04-01": [
    { name: "Event 1", desc: "This is the first event" },
    { name: "Event 2", desc: "This is the second event" },
    { name: "Event 3", desc: "This is the third event" },
    { name: "Event 0", desc: "This is the fourth event" }
  ],
  "2022-04-23": [
    {
      name: "React Conf. @14:00 GMT",
      desc: "Attend React 18 release conference on live from LA."
    },
    {
      name: "DAO and NFT webinar",
      desc: "Nader Dabit is attending Miami ETH meetup and webinar starting today @17:00 PST"
    }
  ]
}
const Masthead = ({ title, image, children, dayCount }: Props) => {
  const { authUser } = useContext(UserContext)
  const offset = new Date().getTimezoneOffset()
  const today = new Date(new Date().getTime() - offset * 60 * 1000)
    .toISOString()
    .split("T")[0]
  const [eventsList, setEventsList] = useState(null)
  const [currentEvent, setCurrentEvent] = useState(null)
  const [dayTime, setDayTime] = useState("Good Morning")
  const navigation = useNavigation()

  useEffect(() => {
    var today = new Date()
    var curHr = today.getHours()

    if (curHr < 12) {
      setDayTime("Good morning")
    } else if (curHr < 18) {
      setDayTime("Good afternoon")
    } else {
      setDayTime("Good evening")
    }
    const getEvents = async () => {
      try {
        const events = await AsyncStorage.getItem("events")
        if (events) {
          setEventsList(JSON.parse(events))
        }
      } catch (error) {
        console.log(error)
      }
    }
    getEvents()
  }, [])

  useEffect(() => {
    var today = new Date()
    // console.log(eventsList[today.toISOString().split("T")[0]])
    const todayEvents =
      eventsList && eventsList[today.toISOString().split("T")[0]]
    if (eventsList && todayEvents) {
      setCurrentEvent(todayEvents[0])
    }
  }, [eventsList])

  return (
    <VStack
      w="full"
      borderRadius="20"
      p={6}
      bg={useColorModeValue("blue.500", "blue.400")}
    >
      <Flex
        direction="row"
        w="full"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Text color="white" fontSize="4xl" bold letterSpacing="xl">
          Day {dayCount}
        </Text>
        <Flex alignItems="flex-end">
          <Text color="white" fontSize="xl" letterSpacing="xl">
            {dayTime},
          </Text>
          <Text color="white" fontSize="3xl" bold letterSpacing="xl">
            {authUser?.attributes.name}
          </Text>
        </Flex>
      </Flex>
      <Pressable onPress={() => navigation.navigate("Calendar")}>
        <Box w="full" pt="6" pb="2">
          {currentEvent ? (
            <Text color="white" fontSize="xl" bold letterSpacing="xl">
              Upcoming event: {currentEvent.name}
            </Text>
          ) : (
            <Text color="white" fontSize="xl" bold italics letterSpacing="xl">
              No upcoming events
            </Text>
          )}
        </Box>
      </Pressable>
    </VStack>
  )
}
export default Masthead
