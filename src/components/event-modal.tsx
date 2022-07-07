import React, { useState } from "react"
import {
  VStack,
  HStack,
  Modal,
  Text,
  FormControl,
  IconButton,
  Icon
} from "native-base"
import InputField from "./input-field"
import CustomButton from "./custom-button"
import DatePicker from "./date-picker"
import DateTimePicker from "@react-native-community/datetimepicker"
import { Feather } from "@expo/vector-icons"

interface Props {
  title: string
  buttonLabel: string
  open: boolean
  onEventModal: () => void
  onAddEvent: () => void
  loading: boolean
  dateEdit: boolean
}

const EventModal = props => {
  const {
    open,
    onEventModal,
    setNewEvent,
    newEvent,
    onAddEvent,
    loading,
    title,
    buttonLabel,
    dateEdit
  } = props
  // const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)

  const handleDateChange = (event, selectedDate) => {
    setNewEvent({
      ...newEvent,
      date: selectedDate
        ? selectedDate.toISOString().split("T")[0]
        : newEvent.date
    })
    setShowPicker(false)
  }

  return (
    <Modal isOpen={open} size="xl" onClose={onEventModal}>
      <Modal.Content maxWidth="450">
        <Modal.CloseButton color="white" />
        <Modal.Header bg="blue.500">
          <Text fontSize={20} color="white" bold>
            {title}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>
              <HStack w="full" alignItems="center" justifyContent="center">
                <IconButton
                  icon={<Icon as={Feather} name="calendar" />}
                  _icon={{
                    color: "primary.500",
                    size: "sm"
                  }}
                  _hover={{
                    bg: "primary.600:alpha.20"
                  }}
                  _pressed={{
                    bg: "primary.600:alpha.20"
                  }}
                  _ios={{
                    _icon: {
                      size: "sm"
                    }
                  }}
                />
                <Text
                  fontSize={20}
                  color="primary.600"
                  bold
                  textAlign="center"
                  onPress={() => dateEdit && setShowPicker(true)}
                >
                  {newEvent.date
                    ? newEvent.date
                    : new Date().toISOString().split("T")[0]}
                </Text>
              </HStack>
            </FormControl.Label>
            <InputField
              placeholder="Event Name"
              type="text"
              value={newEvent.name}
              onChangeText={value => setNewEvent({ ...newEvent, name: value })}
            />
            <InputField
              placeholder="Event Description"
              type="text"
              value={newEvent.desc}
              onChangeText={value => setNewEvent({ ...newEvent, desc: value })}
            />
            <VStack>
              <CustomButton
                bg="blue.500"
                isLoading={loading}
                loadingText="Please wait a moment"
                loadingBg="blue.600:alpha.70"
                borderRadius="10"
                onPress={onAddEvent}
              >
                {buttonLabel}
              </CustomButton>
            </VStack>
          </FormControl>
          {showPicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={newEvent.date ? new Date(newEvent.date) : new Date()}
              mode={"date"}
              is24Hour={true}
              onChange={handleDateChange}
            />
          )}
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}

export default EventModal
