import React, { useRef, useState, useCallback } from "react"
import { StyleSheet, Text, ScrollView, Dimensions } from "react-native"
import {
  actions,
  defaultActions,
  RichEditor,
  RichToolbar
} from "react-native-pell-rich-editor"
import {
  VStack,
  Alert,
  HStack,
  Heading,
  IconButton,
  Icon,
  Box,
  useColorModeValue
} from "native-base"
import HTMLView from "react-native-htmlview"
import { Foundation, Feather, Ionicons } from "@expo/vector-icons"
import QuillEditor, { QuillToolbar } from "react-native-cn-quill"

interface NoteData {
  id: string
  title: string
  desc: string
}

interface Props {
  item: NoteData
  editMode: boolean
  desc: string
  onDescUpdate: (desc: string) => void
  onFinishEditingDesc: () => void
  onPressNoteItemDesc: (item: NoteData) => void
}

const NotesEditor = (props: Props) => {
  const {
    editMode,
    item,
    onDescUpdate,
    onFinishEditingDesc,
    onPressNoteItemDesc
  } = props

  const { id, desc } = item

  const handlePressDesc = useCallback(() => {
    onPressNoteItemDesc(item)
  }, [item, onPressNoteItemDesc])
  const RichText = useRef() //reference to the RichEditor component

  const handleDescUpdate = useCallback(
    val => {
      onDescUpdate && onDescUpdate(val)
    },
    [onDescUpdate]
  )

  const windowWidth = Dimensions.get("window")

  return (
    <VStack flex={1} bg={useColorModeValue("warmGray.50", "primary.900")}>
      <QuillEditor
        style={{
          flex: 1,
          padding: 0,
          // marginVertical: 5,
          backgroundColor: "#111822"
        }}
        ref={RichText}
        initialHtml="<h1>Quill Editor for react-native</h1>"
      />
      <QuillToolbar
        editor={RichText}
        options="full"
        theme={{
          size: 30,
          color: "white",
          background: "#111822"
        }}
      />
    </VStack>
  )
}

export default NotesEditor

const styles = StyleSheet.create({
  /********************************/
  /* styles for html tags */
  a: {
    fontWeight: "bold",
    color: "blue"
  },
  div: {
    fontFamily: "monospace"
  },
  p: {
    fontSize: 30
  },
  /*******************************/
  container: {
    flex: 1
    // marginTop: 40,
    // backgroundColor: "red"
  },
  editor: {
    height: 900,
    backgroundColor: "transparent",
    color: "white"
  },
  rich: {
    flex: 1,
    backgroundColor: "blue"
  },
  richBar: {
    height: 50,
    justifyContent: "center",
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 0
  },
  text: {
    fontWeight: "bold",
    fontSize: 20
  },
  tib: {
    textAlign: "center",
    color: "#515156"
  }
})
