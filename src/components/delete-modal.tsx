import React from "react"
import {
  VStack,
  HStack,
  Modal,
  Text,
  FormControl,
  Flex,
  Button,
  Icon
} from "native-base"
import { Foundation } from "@expo/vector-icons"

interface Props {
  open: boolean
  handleDeleteModal: () => void
  title: string
}

const DeleteModal = props => {
  const { open, handleDeleteModal, title } = props
  return (
    <Modal isOpen={open} size="xl" onClose={handleDeleteModal}>
      <Modal.Content maxWidth="450">
        <Modal.Body>
          <FormControl>
            <FormControl.Label
              p={3}
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <Icon as={Foundation} name="alert" color="red.500" size="lg" />
              <Text fontSize={22} color="red.500" bold textAlign="center">
                Are you sure you want to delete {title}?
              </Text>
            </FormControl.Label>
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="space-around"
            >
              <Button
                bg="red.500"
                // isLoading={confirmationLoading}
                loadingText="Please wait a moment"
                loadingBg="blue.600:alpha.70"
                borderRadius="10"
                // onPress={handleSignupConfirmation}
              >
                <Text fontSize={18} color="white">
                  Confirm
                </Text>
              </Button>
              <Button
                bg="blue.200:alpha.70"
                // isLoading={confirmationLoading}
                loadingText="Please wait a moment"
                loadingBg="blue.600:alpha.70"
                borderRadius="10"
                onPress={handleDeleteModal}
              >
                <Text fontSize={18}>Cancel</Text>
              </Button>
            </Flex>
          </FormControl>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}

export default DeleteModal
