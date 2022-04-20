import React, { useCallback } from "react"
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

interface Note {
  id: string
  title: string
  desc: string
}

interface Props {
  item: Note
  open: boolean
  onShowDeleteModal: () => void
  onDeleteNote: (item: Note) => void
}

const DeleteModal = (props: Props) => {
  const { open, onShowDeleteModal, item, onDeleteNote } = props
  const { id, title } = item

  const handleRemove = useCallback(() => {
    onDeleteNote && onDeleteNote(item)
  }, [onDeleteNote, item])

  return (
    <Modal isOpen={open} size="xl" onClose={onShowDeleteModal}>
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
                onPress={handleRemove}
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
                onPress={onShowDeleteModal}
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
