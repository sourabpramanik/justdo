import React from "react"
import { Modal, VStack, Spinner, Heading } from "native-base"

interface Props {
  open: boolean
}

const LoadingModal = (props: Props) => {
  const { open } = props
  return (
    <Modal isOpen={open}>
      <VStack bg="white" p={6} borderRadius={8}>
        <Heading fontSize={18} mb="4">
          Almost there...
        </Heading>
        <Spinner />
      </VStack>
    </Modal>
  )
}

export default LoadingModal
