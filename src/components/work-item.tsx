import React from "react"
import { HStack, Text, useColorModeValue, IconButton } from "native-base"
import { EvilIcons } from "@expo/vector-icons"

interface Props {
  label: string
}

export default function WorkItem(props: Props) {
  const { label } = props

  return (
    <HStack
      alignItems="center"
      justifyContent="space-between"
      w="full"
      px={3}
      py={3}
      my={3}
      bg={useColorModeValue("blue.100", "darkBlue.800")}
      borderRadius={10}
    >
      <Text
        fontSize={19}
        fontWeight="bold"
        color={useColorModeValue("darkBlue.500", "white")}
      >
        {label}
      </Text>
      <IconButton
        // onPress={handlePressMenuButton}
        _icon={{
          as: EvilIcons,
          name: "external-link",
          size: 6,
          color: useColorModeValue("darkBlue.500", "white")
        }}
      />
    </HStack>
  )
}
