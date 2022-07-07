import React, { useState, useCallback, useEffect } from "react"
import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import AgendaItem from "../components/agenda-item"
import { useColorModeValue, Fab, Icon } from "native-base"
import { AntDesign } from "@expo/vector-icons"
import EventModal from "../components/event-modal"
import shortid from "shortid"
import AsyncStorage from "@react-native-async-storage/async-storage"

const Calendar = props => {
  console.log("Calendar props", props)

  const [refresh, setRefresh] = useState(false)
  const [eventsList, setEventsList] = useState({
    "2022-04-16": [
      {
        id: shortid(),
        date: "2022-04-16",
        name: "Event 43",
        desc: "This is the fifth event"
      },
      {
        id: shortid(),
        date: "2022-04-16",
        name: "Event 6",
        desc: "This is the sixth event"
      }
    ],
    "2022-05-14": [
      {
        id: shortid(),
        date: "2022-05-14",
        name: "React Conf. @14:00 GMT",
        desc: "Attend React 18 release conference on live from LA. "
      },
      {
        id: shortid(),
        date: "2022-05-14",
        name: "DAO and NFT webinar",
        desc: "Nader Dabit is attending Miami ETH meetup and webinar starting today @17:00 PST"
      }
    ]
  })

  useEffect(() => {
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
    const saveEvents = async () => {
      try {
        await AsyncStorage.setItem("events", JSON.stringify(eventsList))
      } catch (error) {
        console.log(error)
      }
    }
    saveEvents()
  }, [eventsList])

  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [newEvent, setNewEvent] = useState({
    id: "",
    name: "",
    desc: "",
    date: null
  })

  const handleAddEvent = useCallback(() => {
    if (!newEvent.name || !newEvent.desc) {
      alert("Please fill all fields")
      return
    }
    setLoading(true)
    setEventsList(prev => {
      const newData = { ...prev }
      const date = newEvent.date
        ? newEvent.date
        : new Date().toISOString().split("T")[0]
      newData[date] = [
        ...(newData[date] || []),
        {
          id: shortid(),
          date: date,
          name: newEvent.name,
          desc: newEvent.desc
        }
      ]
      return newData
    })

    setOpen(false)
    setLoading(false)
    setNewEvent({
      id: "",
      name: "",
      desc: "",
      date: null
    })
  }, [newEvent])

  const handleDeleteEvent = useCallback(event => {
    setEventsList(prev => {
      const newData = { ...prev }
      newData[event.date] = newData[event.date].filter(el => el.id !== event.id)

      return newData
    })
  }, [])

  const handleUpdateEvent = useCallback(() => {
    setEventsList(prev => {
      const newData = { ...prev }
      console.log(prev)

      newData[newEvent.date] = newData[newEvent.date].map(el => {
        if (el.id === newEvent.id) {
          return {
            ...el,
            name: newEvent.name,
            desc: newEvent.desc,
            date: newEvent.date
          }
        }
        return el
      })
      return newData
    })
    setOpenEdit(false)
    setNewEvent({
      id: "",
      name: "",
      desc: "",
      date: null
    })
  }, [newEvent])

  const handleEventModal = useCallback(() => {
    setNewEvent({
      id: "",
      name: "",
      desc: "",
      date: null
    })
    setOpen(prev => !prev)
  }, [setOpen])

  const handleEditEventModal = useCallback(event => {
    setOpenEdit(prev => !prev)
  }, [])

  return (
    <SafeAreaView flex={1}>
      <AgendaItem
        eventsList={eventsList}
        onDeleteEvent={handleDeleteEvent}
        onEventModal={handleEditEventModal}
        setNewEvent={setNewEvent}
      />
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
      <EventModal
        title="Add an event to your agenda"
        buttonLabel="Add event"
        open={open}
        onEventModal={handleEventModal}
        setNewEvent={setNewEvent}
        newEvent={newEvent}
        onAddEvent={handleAddEvent}
        dateEdit={true}
      />
      <EventModal
        title="Edit your event"
        buttonLabel="Edit event"
        open={openEdit}
        onEventModal={handleEditEventModal}
        setNewEvent={setNewEvent}
        newEvent={newEvent}
        onAddEvent={handleUpdateEvent}
        dateEdit={false}
      />
    </SafeAreaView>
  )
}

export default Calendar
