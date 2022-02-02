import React from "react"
import {
  Alert,
  VStack,
  HStack,
  Text,
  IconButton,
  CloseIcon,
  Collapse,
  Box
} from "native-base"
import { View } from "moti"
import { makeStyledComponent } from "../utils/styled"

interface Props {
  show: boolean
  children: React.ReactNode
}
const StyledView = makeStyledComponent(View)

const AlertPopUp = (props: Props) => {
  const { title, type } = props

  return (
    <StyledView
      w="full"
      mt="10%"
      position="absolute"
      from={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -50
      }}
      animate={{
        opacity: 1,
        scale: 1,
        marginBottom: 0
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46
      }}
    >
      <Box>
        <Collapse isOpen={props.show} px={4}>
          <Alert bg={props.show ? "red.600" : "blue.500"}>
            <VStack space={4} flexShrink={1} w="100%" alignItems="center">
              <HStack flexShrink={1} space={2} justifyContent="space-between">
                {props.show ? (
                  <HStack space={2} flexShrink={1}>
                    <Alert.Icon mt="1" color="white" />
                    <Text fontSize="lg" color="white">
                      {props.children}
                    </Text>
                  </HStack>
                ) : null}
              </HStack>
            </VStack>
          </Alert>
        </Collapse>
      </Box>
    </StyledView>
  )
}

export default AlertPopUp
