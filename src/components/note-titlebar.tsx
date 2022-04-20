import React, { useCallback } from "react"
import {
  Flex,
  Text,
  useColorModeValue,
  Icon,
  Input,
  IconButton,
  Heading
} from "native-base"
import { AntDesign, Feather, SimpleLineIcons } from "@expo/vector-icons"
import AnimatedTaskLabel from "./animated-tasklabel"

interface NoteData {
  id: string
  title: string
  desc: string
}

interface Props {
  item: NoteData
  editMode: boolean
  copied: boolean
  isEditing: boolean
  onNavigateback: () => void
  onEditModeChange: (item: NoteData) => void
  onDeleteModal: () => void
  onCopyNote: (title: string, desc: string) => void
  onTitleUpdate: (title: string) => void
  onFinishEditingTitle: () => void
  onPressNoteItemTitle: (item: NoteData) => void
}
const NoteTitleBar = (props: Props) => {
  const {
    item,
    editMode,
    copied,
    isEditing,
    onNavigateback,
    onEditModeChange,
    onShowDeleteModal,
    onCopyNote,
    onTitleUpdate,
    onFinishEditingTitle,
    onPressNoteItemTitle
  } = props

  const handleEdit = useCallback(() => {
    onEditModeChange && onEditModeChange(item)
  }, [onEditModeChange, item])

  const handleCopyNote = useCallback(() => {
    onCopyNote && onCopyNote(item)
  }, [onCopyNote, item])

  const handlePressTitle = useCallback(() => {
    onPressNoteItemTitle(item)
  }, [item, onPressNoteItemTitle])

  const handleTitleUpdate = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventitem>) => {
      onTitleUpdate && onTitleUpdate(e.nativeEvent.text)
    },
    [onTitleUpdate]
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
          onPress={onNavigateback}
        />
        {isEditing ? (
          <Input
            value={item.title}
            // variant="outlined"
            underline={false}
            truncated
            maxW="200"
            px={1}
            py={0}
            color={useColorModeValue("blue.500", "blue.400")}
            my="5"
            fontSize="2xl"
            fontWeight="bold"
            autoFocus
            blurOnSubmit
            onChange={handleTitleUpdate}
            onBlur={onFinishEditingTitle}
            borderRadius={4}
          />
        ) : (
          <Heading
            truncated
            maxW="200"
            color={useColorModeValue("blue.500", "blue.400")}
            onPress={handlePressTitle}
            px={1}
            py={0}
            my="5"
            fontSize="2xl"
            fontWeight="bold"
          >
            {item.title}
          </Heading>
        )}
      </Flex>
      <Flex direction="row" alignItems="center" justifyContent="space-between">
        <IconButton
          _icon={{
            as: AntDesign,
            name: !editMode ? "eyeo" : "edit",
            size: 6,
            color: useColorModeValue("blue.500", "blue.400")
          }}
          onPress={handleEdit}
        />
        <IconButton
          _icon={{
            as: AntDesign,
            name: "delete",
            size: 6,
            color: useColorModeValue("blue.500", "blue.400")
          }}
          onPress={onShowDeleteModal}
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
          onPress={handleCopyNote}
        />
      </Flex>
    </Flex>
  )
}

export default NoteTitleBar
