import React, { useContext, useCallback, useState } from "react"
import {
  VStack,
  Flex,
  Text,
  useColorModeValue,
  Icon,
  Input,
  IconButton
} from "native-base"
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import AnimatedColorBox from "../components/animate-color-box"
import { useKeyboard } from "@react-native-community/hooks"

import NoteContext from "../context/note"
import NotesEditor from "../components/notes-editor"
import NoteTitleBar from "../components/note-titlebar"
import DeleteModal from "../components/delete-modal"
import * as Clipboard from "expo-clipboard"

const NotesScreen = props => {
  const { navigation, route } = props
  const { item } = route.params

  const keyboard = useKeyboard()
  const insets = useSafeAreaInsets()
  const [editMode, setEditMode] = React.useState(false)
  const { noteItem, setNoteItem } = useContext(NoteContext)
  const [showModal, setShowModal] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleBackNavigation = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  const handleEditModeChange = React.useCallback(() => {
    setEditMode(!editMode)
  }, [editMode])

  const handleDeleteModal = useCallback(() => {
    setShowModal(prevData => !prevData)
  }, [setShowModal])

  const handleCopyNotes = useCallback(() => {
    Clipboard.setString(`${item.title}: ${item.desc}`)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }, [])

  const handleChangeTitle = useCallback(
    newTitle => {
      let newData = [...noteItem]

      setNoteItem(() => {
        newData.map(data => {
          if (data.id === item.id) {
            data.title = newTitle
          }
        })
        return newData
      })
    },
    [item]
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AnimatedColorBox
        bg={useColorModeValue("warmGray.50", "primary.900")}
        w="full"
        flex={1}
      >
        <VStack flex={1} px={3}>
          <NoteTitleBar
            title={item.title}
            item={item}
            editMode={editMode}
            copied={copied}
            handleBackNavigation={handleBackNavigation}
            handleEditModeChange={handleEditModeChange}
            handleDeleteModal={handleDeleteModal}
            handleCopyNotes={handleCopyNotes}
            onTitleChange={handleChangeTitle}
          />
          <NotesEditor editMode={editMode} desc={item.desc} />
        </VStack>
        <DeleteModal
          title={item.title}
          handleDeleteModal={handleDeleteModal}
          open={showModal}
        />
      </AnimatedColorBox>
    </SafeAreaView>
  )
}
export default NotesScreen
