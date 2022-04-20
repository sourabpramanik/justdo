import React, { useContext, useState, useEffect } from "react"
import { ImageSourcePropType } from "react-native"
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
  "2022-04-16": [
    { name: "Event 5", desc: "This is the fifth event" },
    { name: "Event 6", desc: "This is the sixth event" }
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

  useEffect(() => {
    if (allAgendaItems) {
      Object.keys(allAgendaItems).forEach(key => {
        if (key === today) {
          setEventsList(Object.assign({}, allAgendaItems[key]))
        }
      })
    }
  }, [today])

  let index = 1
  setTimeout(() => {
    if (eventsList) {
      setCurrentEvent(eventsList[index])
    }
  }, 3000)

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
            Good Evening,
          </Text>
          <Text color="white" fontSize="3xl" bold letterSpacing="xl">
            {authUser?.attributes.name}
          </Text>
        </Flex>
      </Flex>
      <Text color="white" fontSize="xl" bold letterSpacing="xl" py="6">
        Upcoming event: {currentEvent?.name}
      </Text>
      <Box w="full" bg="white" py="0.2"></Box>
      <Flex direction="row" alignItems="center" pt="2">
        <Text color="white" fontSize="md" letterSpacing="xl">
          View productivity stats
        </Text>
        <IconButton
          // onPress={handlePressMenuButton}
          _icon={{
            as: MaterialIcons,
            name: "keyboard-arrow-right",
            size: 6,
            color: "white"
          }}
        />
      </Flex>
    </VStack>
  )
}
export default Masthead
