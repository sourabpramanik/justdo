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
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import AnimatedColorBox from "../components/animate-color-box"
import { AntDesign, Feather, SimpleLineIcons } from "@expo/vector-icons"
import { useKeyboard } from "@react-native-community/hooks"
import CodeEditor, {
  CodeEditorSyntaxStyles
} from "@rivascva/react-native-code-editor"
import WorkContext from "../context/work"
import NotesEditor from "../components/notes-editor"
import DeleteModal from "../components/delete-modal"
import * as Clipboard from "expo-clipboard"

const NotesScreen = ({ navigation, route }) => {
  const { item } = route.params
  const keyboard = useKeyboard()
  const insets = useSafeAreaInsets()
  const [editMode, setEditMode] = React.useState(true)
  const { setWorkItem } = useContext(WorkContext)
  const [showModal, setShowModal] = useState(false)

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
  }, [])

  const handleChangeTitle = (item, newTitle) => {
    setWorkItem(prevData => {
      prevData[item.id].title = newTitle
    })
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AnimatedColorBox
        bg={useColorModeValue("warmGray.50", "primary.900")}
        w="full"
        flex={1}
      >
        <VStack flex={1} px={3}>
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
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
                onChange={() => handleChangeTitle(item)}
              />
            </Flex>
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
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
                _icon={{
                  as: Feather,
                  name: "copy",
                  size: 6,
                  color: useColorModeValue("blue.500", "blue.400")
                }}
                onPress={handleCopyNotes}
              />
            </Flex>
          </Flex>
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
