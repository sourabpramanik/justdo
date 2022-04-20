import React, { useRef, useState, useCallback, useEffect } from "react"
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
import { useFocusEffect } from "@react-navigation/native"

interface NoteData {
  id: string
  title: string
  desc: string
}

interface Props {
  editMode: boolean
  item: NoteData
  isEditing: boolean
  onDescUpdate: (desc: string) => void
  onSaveDesc: () => void
}

const NotesEditor = props => {
  const { editMode, item, isEditing, onDescUpdate, onSaveDesc } = props

  const { id, title, desc } = item

  useFocusEffect(() => {
    RichText?.current?.setContentHTML(desc)

    return () => {
      RichText.current?.setContentHTML("")
    }
  }, [])

  const strikethrough = (
    <Foundation name="strikethrough" size={24} color="black" />
  ) //icon for strikethrough
  const video = <Feather name="video" size={24} color="black" /> //icon for Addvideo
  const RichText = useRef() //reference to the RichEditor component

  // const handleDescChange = useCallback(() => {
  //   const html = RichText.current.getContentHtml()
  //   onDescUpdate && onDescUpdate(html)
  // }, [onDescUpdate])

  // this function will be called when the editor has been initialized
  function editorInitializedCallback() {
    RichText.current?.setContentHTML(desc)
  }

  // Callback after height change

  function onPressAddImage() {
    // you can easily add images from your gallery
    RichText.current?.insertImage(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png"
    )
  }

  function insertVideo() {
    // you can easily add videos from your gallery
    RichText.current?.insertVideo(
      "https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4"
    )
  }
  const insertLink = (): void => {}

  const windowWidth = Dimensions.get("window")
  return (
    <VStack flex={1}>
      <ScrollView style={styles.container}>
        <RichEditor
          disabled={!editMode}
          initialFocus={editMode}
          initialContentHTML={`${desc}`}
          editorStyle={{
            backgroundColor: "transparent",
            color: useColorModeValue("#000", "#fff"),
            fontSize: 40
          }}
          ref={RichText}
          placeholder={"Start Writing Here"}
          onChange={text => onDescUpdate && onDescUpdate(text)}
          editorInitializedCallback={editorInitializedCallback}
          useContainer={true}
          initialHeight={windowWidth.height - 150}
        />
      </ScrollView>
      {editMode && (
        <RichToolbar
          style={[styles.richBar]}
          editor={RichText}
          iconTint="darkGray"
          unselectedIconTint={{
            color: "darkGray"
          }}
          selectedIconTint={"#0a82f3"}
          disabledIconTint="darkGray"
          onPressAddImage={onPressAddImage}
          iconSize={20}
          onInsertLink={insertLink}
          actions={[
            "insertVideo",
            ...defaultActions,
            actions.setStrikethrough,
            actions.heading1
          ]}
          // map icons for self made actions
          iconMap={{
            [actions.heading1]: ({ tintColor }) => (
              <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
            ),
            [actions.setStrikethrough]: strikethrough,
            ["insertVideo"]: video
          }}
          insertVideo={insertVideo}
        />
      )}
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
    // flex: 1,
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
