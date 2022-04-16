import React, { useState, useCallback } from "react"
import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import AgendaItem from "../components/agenda-item"
import { useColorModeValue, Fab, Icon } from "native-base"
import { AntDesign } from "@expo/vector-icons"
import EventModal from "../components/event-modal"

const Calendar = () => {
  const [eventsList, setEventsList] = useState({
    "2022-04-01": [
      { name: "Event 1", desc: "This is the first event" },
      { name: "Event 2", desc: "This is the second event" },
      { name: "Event 3", desc: "This is the third event" },
      { name: "Event 0", desc: "This is the fourth event" }
    ],
    "2022-04-16": [
      { name: "Event 5", desc: "This is the fifth event" },
      { name: "Event 6", desc: "This is the sixth event" }
    ],
    "2022-04-16": [
      { name: "Event 43", desc: "This is the fifth event" },
      { name: "Event 6", desc: "This is the sixth event" }
    ]
  })
  const [open, setOpen] = useState(false)

  const handleEventModal = useCallback(() => {
    setOpen(prev => !prev)
  }, [setOpen])

  return (
    <SafeAreaView flex={1}>
      <AgendaItem eventsList={eventsList} />
      {!open && (
        <Fab
          position="absolute"
          renderInPortal={false}
          size="sm"
          mb="12"
          icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
          colorScheme={useColorModeValue("blue", "darkBlue")}
          bg={useColorModeValue("blue.500", "blue.400")}
          onPress={handleEventModal}
        />
      )}
      <EventModal open={open} handleEventModal={handleEventModal} />
    </SafeAreaView>
  )
}

export default Calendar
