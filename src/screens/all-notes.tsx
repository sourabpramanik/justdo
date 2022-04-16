import React, { useRef, useCallback, useContext, useState } from "react"
import { VStack, Text, useColorModeValue, Fab, Icon } from "native-base"
import { View, FlatList, Pressable } from "react-native"
import AnimatedColorBox from "../components/animate-color-box"
import NoteItem from "../components/note-item"
import { Animated } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { AntDesign } from "@expo/vector-icons"
import NoteContext from "../context/note"
import shortid from "shortid"

const SPACING = 20
const ITEM_SIZE = 60 + SPACING * 3

export default function AllNotes() {
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const scrollY = useRef(new Animated.Value(0)).current
  const navigation = useNavigation()
  const { noteItem, setNoteItem } = useContext(NoteContext)

  const handleNavigation = useCallback(item => {
    navigation.navigate("NotesScreen", { item })
  })

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
                onPress={() => {
                  handleNavigation(item)
                }}
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
        onPress={() => {
          const id = shortid.generate()
          setNoteItem([
            {
              id,
              title: "Untitled",
              desc: "Just Do is a productivity app designed for both IOS and Android. Happy working.",
              createdAt: new Date().toISOString()
            },
            ...noteItem
          ])
          setEditingItemId(id)
        }}
      />
    </AnimatedColorBox>
  )
}