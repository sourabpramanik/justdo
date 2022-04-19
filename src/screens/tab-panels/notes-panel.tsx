import React, {
  useRef,
  useCallback,
  useContext,
  useState,
  useEffect
} from "react"
import { VStack, Text, useColorModeValue, Fab, Icon } from "native-base"
import { View, FlatList, Pressable } from "react-native"
import AnimatedColorBox from "../../components/animate-color-box"
import NoteItem from "../../components/note-item"
import { Animated } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { AntDesign } from "@expo/vector-icons"
import UserContext from "../../context/user"
import NoteContext from "../../context/note"
import shortid from "shortid"

const SPACING = 20
const ITEM_SIZE = 60 + SPACING * 3

export default function NotesPanel() {
  const scrollY = useRef(new Animated.Value(0)).current
  const navigation = useNavigation()
  const { authUser } = useContext(UserContext)
  const { noteItem, setNoteItem, queryData, handleCreateNote } =
    useContext(NoteContext)
  const [open, setOpen] = useState(false)
  const [modalData, setModalData] = useState({
    title: "",
    desc: ""
  })

  useEffect(() => {
    queryData(authUser)
  }, [])

  return (
    <AnimatedColorBox flex={1}>
      <VStack
        bg={useColorModeValue("warmGray.50", "primary.900")}
        flex={1}
        w="full"
        justifyContent="center"
      >
        <Animated.FlatList
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          data={noteItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            padding: SPACING,
            justifyContent: "center"
          }}
          renderItem={({ item, index }) => {
            const inputRange = [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 2)
            ]

            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0]
            })

            return (
              <Pressable
                key={item.id}
                onPress={() => navigation.navigate("Note", { id: item.id })}
              >
                <Animated.View
                  style={{ justifyContent: "center", transform: [{ scale }] }}
                >
                  <NoteItem title={item.title} />
                </Animated.View>
              </Pressable>
            )
          }}
        />
      </VStack>
      <Fab
        position="absolute"
        renderInPortal={false}
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
        colorScheme={useColorModeValue("blue", "darkBlue")}
        bg={useColorModeValue("blue.500", "blue.400")}
        onPress={() =>
          handleCreateNote({
            title: "Untitled",
            desc: "Just Do is a productivity app designed for both IOS and Android. Happy working.",
            userId: authUser?.attributes?.sub
          })
        }
      />
    </AnimatedColorBox>
  )
}
