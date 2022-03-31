import React from "react"
import { VStack, Text, useColorModeValue, Fab, Icon } from "native-base"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import AnimatedColorBox from "../components/animate-color-box"
import { AntDesign } from "@expo/vector-icons"
import { useKeyboard } from "@react-native-community/hooks"
import CodeEditor, {
  CodeEditorSyntaxStyles
} from "@rivascva/react-native-code-editor"

const WorkSpace = ({ navigation, route }) => {
  const { item } = route.params
  const keyboard = useKeyboard()
  const insets = useSafeAreaInsets()
  const [mode, setMode] = React.useState(true)

  const handleModeChange = React.useCallback(() => {
    setMode(!mode)
  }, [mode])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AnimatedColorBox bg="primary.900" w="full" flex={1}>
        <VStack flex={1} px={3}>
          <Text color="white" my="5" fontSize="4xl">
            {item}
          </Text>
          <CodeEditor
            style={{
              fontFamily: "Menlo-Regular",
              fontSize: 20,
              inputLineHeight: 0,
              highlighterLineHeight: 26,
              backgroundColor: "transparent"
            }}
            language="markdown"
            syntaxStyle={CodeEditorSyntaxStyles.solarizedDark}
            showLineNumbers
            readOnly={mode}
          />
          <Fab
            position="absolute"
            renderInPortal={false}
            size="sm"
            mb="4"
            icon={
              <Icon
                color="white"
                as={<AntDesign name={mode ? "eyeo" : "edit"} />}
                size="sm"
              />
            }
            colorScheme={useColorModeValue("blue", "darkBlue")}
            bg={useColorModeValue("blue.500", "blue.400")}
            onPress={() => handleModeChange()}
          />
        </VStack>
      </AnimatedColorBox>
    </SafeAreaView>
  )
}
export default WorkSpace
