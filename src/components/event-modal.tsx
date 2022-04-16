import React from "react"
import { VStack, HStack, Modal, Text, FormControl } from "native-base"
import InputField from "./input-field"
import CustomButton from "./custom-button"
import DatePicker from "./date-picker"

interface Props {
  open: boolean
  handleEventModal: () => void
}

const EventModal = props => {
  const { open, handleEventModal } = props
  return (
    <Modal isOpen={open} size="xl" onClose={handleEventModal}>
      <Modal.Content maxWidth="450">
        <Modal.CloseButton color="white" />
        <Modal.Header bg="blue.500">
          <Text fontSize={20} color="white" bold>
            Confirm Your Email
          </Text>
        </Modal.Header>
        <Modal.Body>
          {/* <DatePicker /> */}
          <FormControl>
            <FormControl.Label>
              {/* <Text fontSize={16} color="blue.500" bold>
                Enter the confirmation code recieved in your email.
              </Text> */}
            </FormControl.Label>
            <InputField
              placeholder="Event Name"
              type="text"
              //   value={formState.authCode}
              //   onChangeText={value =>
              //     setFormState({ ...formState, authCode: value })
              //   }
            />
            <InputField
              placeholder="Event Description"
              type="text"
              //   value={formState.authCode}
              //   onChangeText={value =>
              //     setFormState({ ...formState, authCode: value })
              //   }
            />
            <VStack>
              <CustomButton
                bg="blue.500"
                // isLoading={confirmationLoading}
                loadingText="Please wait a moment"
                loadingBg="blue.600:alpha.70"
                borderRadius="10"
                // onPress={handleSignupConfirmation}
              >
                Add Event
              </CustomButton>
              <CustomButton
                bg="red.500"
                // isLoading={confirmationLoading}
                loadingText="Please wait a moment"
                loadingBg="blue.600:alpha.70"
                borderRadius="10"
                // onPress={handleSignupConfirmation}
              >
                Remove Event
              </CustomButton>
            </VStack>
          </FormControl>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}

export default EventModal
