import React, { useState, useEffect } from "react"
import { View, Text } from "react-native"
import { Agenda } from "react-native-calendars"
import {
  useColorModeValue,
  IconButton,
  Icon,
  Menu,
  Pressable,
  HamburgerIcon
} from "native-base"
import { Entypo, MaterialIcons, Feather } from "@expo/vector-icons"

interface Props {
  eventsList: any
  onDeleteEvent: (event: any) => void
  onEventModal: () => void
}
const AgendaItem = props => {
  const { eventsList, onDeleteEvent, onEventModal, setNewEvent } = props
  const [refreshCalender, setRefreshCalender] = useState(false)
  useEffect(() => {
    setRefreshCalender(true)
    return () => {
      setRefreshCalender(false)
    }
  }, [eventsList])
  return (
    <Agenda
      items={eventsList}
      // loadItemsForMonth={month => {
      //   console.log("trigger items loading", month)
      // }}
      refreshing={refreshCalender}
      selected={new Date()}
      renderItem={(item, firstItemInDay) => {
        return (
          <View
            style={{
              flex: 1,
              backgroundColor: "#0a82f3",
              marginTop: firstItemInDay ? 10 : 30,
              padding: 10,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <View>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 22
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 17,
                  marginTop: 5,
                  maxWidth: 300
                }}
              >
                {item.desc}
              </Text>
            </View>
            <Menu
              w="140"
              h="40"
              trigger={triggerProps => {
                return (
                  <Pressable {...triggerProps}>
                    <HamburgerIcon size={5} color="white" />
                  </Pressable>
                )
              }}
            >
              <Menu.Group

              // flexDirection="column"
              // justifyContent="center"
              >
                <Menu.Item
                  alignItems="center"
                  flexDirection="row"
                  w="full"
                  justifyContent="center"
                  onPress={() => onDeleteEvent(item)}
                >
                  <IconButton
                    icon={<Icon as={MaterialIcons} name="delete-forever" />}
                    _icon={{
                      color: "red.500",
                      size: "sm"
                    }}
                    _hover={{
                      bg: "red.600:alpha.20"
                    }}
                    _pressed={{
                      bg: "red.600:alpha.20"
                    }}
                    _ios={{
                      _icon: {
                        size: "sm"
                      }
                    }}
                  />
                  <Text
                    style={{
                      color: "red",
                      fontSize: 16
                    }}
                  >
                    Remove
                  </Text>
                </Menu.Item>
                <Menu.Item
                  alignItems="center"
                  flexDirection="row"
                  w="full"
                  justifyContent="center"
                  onPress={() => {
                    onEventModal()
                    setNewEvent({
                      id: item.id,
                      name: item.name,
                      desc: item.desc,
                      date: item.date
                    })
                  }}
                >
                  <IconButton
                    icon={<Icon as={Feather} name="edit" />}
                    _icon={{
                      color: "primary.400",
                      size: "sm"
                    }}
                    _hover={{
                      bg: "primary.400:alpha.20"
                    }}
                    _pressed={{
                      bg: "primary.400:alpha.20"
                    }}
                    _ios={{
                      _icon: {
                        size: "sm"
                      }
                    }}
                  />
                  <Text
                    style={{
                      color: "#0a82f3",
                      fontSize: 16
                    }}
                  >
                    Edit
                  </Text>
                </Menu.Item>
              </Menu.Group>
            </Menu>
          </View>
        )
      }}
      renderEmptyDate={() => {
        return (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={{
                color: "gray",
                fontSize: 28
              }}
            ></Text>
          </View>
        )
      }}
      renderEmptyData={() => {
        return (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={{
                color: "gray",
                fontSize: 28
              }}
            >
              No Events Found
            </Text>
          </View>
        )
      }}
      rowHasChanged={(r1, r2) => {
        return r1.name !== r2.name
      }}
      markingType={"period"}
      onDayChange={e => console.log(e)}
      theme={{
        backgroundColor: useColorModeValue("#ffffff", "#111822"),
        calendarBackground: useColorModeValue("#ffffff", "#111822"),
        textSectionTitleColor: "#0e0e0e",
        selectedDayBackgroundColor: "#00adf5",
        selectedDayTextColor: "#0a82f3",

        todayTextColor: "#0a82f3",

        dayTextColor: "#0e0e0e",
        textDisabledColor: "#d9e1e8",
        dotColor: "#00adf5",
        selectedDotColor: "#0a82f3",
        arrowColor: "orange",
        monthTextColor: "#0a82f3",
        indicatorColor: "#0a82f3",
        textDayFontFamily: "monospace",
        textMonthFontFamily: "monospace",
        textDayHeaderFontFamily: "monospace",
        textDayFontWeight: "300",
        textMonthFontWeight: "bold",
        textDayHeaderFontWeight: "300",
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 16
      }}
    />
  )
}

export default AgendaItem
