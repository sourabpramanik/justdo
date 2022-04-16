import React, { useCallback } from "react"
import {
  Flex,
  Text,
  useColorModeValue,
  Icon,
  Input,
  IconButton
} from "native-base"
import { AntDesign, Feather, SimpleLineIcons } from "@expo/vector-icons"

interface Props {
  item: any
  editMode: boolean
  copied: boolean
  handleBackNavigation: () => void
  handleEditModeChange: () => void
  handleDeleteModal: () => void
  handleCopyNotes: () => void
  onTitleChange: (item: any, newTitle: string) => void
}
const NoteTitleBar = props => {
  const {
    item,
    editMode,
    copied,
    handleBackNavigation,
    handleEditModeChange,
    handleDeleteModal,
    handleCopyNotes,
    onTitleChange
  } = props

  const handleTitleUpdate = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      onTitleChange && onTitleChange(e.nativeEvent.text)
    },
    [onTitleChange]
  )

  return (
    <Flex direction="row" alignItems="center" justifyContent="space-between">
      <Flex direction="row" alignItems="center" justifyContent="space-between">
        <IconButton
          _icon={{
            as: SimpleLineIcons,
            name: "arrow-left",
            size: 4,
            color: useColorModeValue("blue.500", "blue.400")
          }}
          onPress={handleBackNavigation}
        />
        <Input
          value={item.title}
          variant="unstyled"
          px={1}
          py={0}
          color={useColorModeValue("blue.500", "blue.400")}
          my="5"
          fontSize="2xl"
          fontWeight="bold"
          onChange={handleTitleUpdate}
        />
      </Flex>
      <Flex direction="row" alignItems="center" justifyContent="space-between">
        <IconButton
          _icon={{
            as: AntDesign,
            name: !editMode ? "eyeo" : "edit",
            size: 6,
            color: useColorModeValue("blue.500", "blue.400")
          }}
          onPress={() => handleEditModeChange()}
        />
        <IconButton
          _icon={{
            as: AntDesign,
            name: "delete",
            size: 6,
            color: useColorModeValue("blue.500", "blue.400")
          }}
          onPress={handleDeleteModal}
        />
        <IconButton
          _icon={
            !copied
              ? {
                  as: Feather,
                  name: "copy",
                  size: 6,
                  color: useColorModeValue("blue.500", "blue.400")
                }
              : {
                  as: AntDesign,
                  name: "checkcircle",
                  size: 6,
                  color: useColorModeValue("blue.500", "blue.400")
                }
          }
          onPress={handleCopyNotes}
        />
      </Flex>
    </Flex>
  )
}

export default NoteTitleBar
