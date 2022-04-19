import React, { useEffect, useState, useContext, useCallback } from "react"
import {
  VStack,
  Text,
  useColorModeValue,
  HStack,
  Spinner,
  Heading
} from "native-base"
import { useRoute, useNavigation } from "@react-navigation/native"
import { DataStore } from "@aws-amplify/datastore"
import UserContext from "../context/user"
import NoteContext from "../context/note"
import { NoteItem } from "../models"
import NoteTitleBar from "../components/note-titlebar"
import NotesEditor from "../components/notes-editor"
import { SafeAreaView } from "react-native-safe-area-context"
import AnimatedColorBox from "../components/animate-color-box"
import DeleteModal from "../components/delete-modal"
import * as Clipboard from "expo-clipboard"

const Note = () => {
  const { authUser } = useContext(UserContext)
  const { handleTitleChange, handleDeleteNote, handleDescChange } =
    useContext(NoteContext)

  const route = useRoute()
  const navigation = useNavigation()
  const noteId = route.params.id
  const [note, setNote] = useState(null)
  const [copied, setCopied] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editingItem, setEditingItem] = useState({
    titleId: "",
    descId: ""
  })
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!noteId || !authUser) {
      return
    }
    queryData(authUser)
  }, [noteId, authUser])

  const queryData = async props => {
    try {
      const models = await DataStore.query(NoteItem, c =>
        c.userID("contains", props?.attributes?.sub)
      )
      setNote(models.find(item => item.id === noteId))
    } catch (error) {
      console.log(error)
    }
  }

  const handleNavigateBack = () => {
    navigation.goBack()
  }

  const handleShowDeleteModal = () => {
    setOpen(!open)
  }

  const handleEditModeChange = useCallback(() => {
    setEditMode(!editMode)
  }, [editMode])

  const handleCopyNote = useCallback(item => {
    Clipboard.setString(`${item.title}: ${item.desc}`)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }, [])

  const handleTitleUpdate = useCallback(title => {
    setNote(prev => {
      return { ...prev, title }
    })
  }, [])

  const handleDescUpdate = useCallback(desc => {
    setNote(prev => {
      return { ...prev, desc }
    })
  }, [])

  const handleFinishEditingTitle = useCallback(() => {
    setEditingItem({
      titleId: "",
      descId: ""
    })

    handleTitleChange({
      title: note.title,
      id: note.id
    })
  }, [note])

  const handleFinishEditingDesc = useCallback(() => {
    setEditingItem({
      titleId: "",
      descId: ""
    })

    handleDescChange({
      desc: note.desc,
      id: note.id
    })
  }, [note])

  const handlePressNoteItemDesc = useCallback(item => {
    setEditingItem({
      titleId: "",
      descId: item.id
    })
  }, [])

  const handlePressNoteItemTitle = useCallback(item => {
    setEditingItem({
      titleId: item.id,
      descId: ""
    })
  }, [])

  const handleDelete = useCallback(id => {
    handleDeleteNote({
      id: note.id
    })
    navigation.goBack()
  }, [])

  console.log(note)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {note ? (
        <AnimatedColorBox
          bg={useColorModeValue("warmGray.50", "primary.900")}
          w="full"
          flex={1}
        >
          <VStack flex={1} px={3}>
            <NoteTitleBar
              item={note}
              editMode={editMode}
              copied={copied}
              isEditing={editingItem.titleId === note.id}
              onNavigateback={handleNavigateBack}
              onEditModeChange={handleEditModeChange}
              onShowDeleteModal={handleShowDeleteModal}
              onCopyNote={handleCopyNote}
              onTitleUpdate={handleTitleUpdate}
              onFinishEditingTitle={handleFinishEditingTitle}
              onPressNoteItemTitle={handlePressNoteItemTitle}
            />
            <NotesEditor
              editMode={editMode}
              item={note}
              isEditing={editingItem.descId === note.id}
              onDescUpdate={handleDescUpdate}
              onFinishEditingDesc={handleFinishEditingDesc}
              onPressNoteItemDesc={handlePressNoteItemDesc}
            />
          </VStack>
          <DeleteModal
            item={note}
            title={note.title}
            onShowDeleteModal={handleShowDeleteModal}
            open={open}
            onDeleteNote={handleDelete}
          />
        </AnimatedColorBox>
      ) : (
        <HStack space={2} justifyContent="center" flex={1} alignItems="center">
          <Spinner accessibilityLabel="Please wait.." />
          <Heading color="primary.500" fontSize="2xl">
            Please wait..
          </Heading>
        </HStack>
      )}
    </SafeAreaView>
  )
}

export default Note
