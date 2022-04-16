import React from "react"
import {
  HStack,
  Text,
  useColorModeValue,
  IconButton,
  useTheme
} from "native-base"
import { EvilIcons } from "@expo/vector-icons"

interface Props {
  isEditing: boolean
  onLongPressTitle?: () => void
  onPressTitle?: () => void
  onRemove?: () => void
  onTitleChange?: (title: string) => void
  title: string
}

export default function NoteItem(props: Props) {
  const { title } = props

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
        {title}
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
