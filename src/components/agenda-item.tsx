import React, { useState, useEffect } from "react"
import { View, Text } from "react-native"
import { Agenda } from "react-native-calendars"
import { useColorModeValue } from "native-base"

interface Props {
  eventsList: any
}
const AgendaItem = props => {
  const { eventsList } = props
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
      loadItemsForMonth={month => {
        console.log("trigger items loading", month)
      }}
      refreshing={refreshCalender}
      selected={new Date()}
      renderItem={(item, firstItemInDay) => {
        return (
          <View
            style={{
              height: 80,
              backgroundColor: "#0a82f3",
              marginTop: firstItemInDay ? 10 : 30,
              padding: 10,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10
            }}
          >
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
                marginTop: 5
              }}
            >
              {item.desc}
            </Text>
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
            >
              This is an empty date!!
            </Text>
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
