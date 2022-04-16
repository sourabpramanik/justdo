import { StatusBar } from "expo-status-bar"
import React from "react"
import AppContainer from "./src/components/app-container"
import Navigator from "./src/"
import Amplify from "aws-amplify"
import { UserProvider } from "./src/context/user"
import { TaskProvider } from "./src/context/task"
import { NoteProvider } from "./src/context/note"
import awsExports from "./src/aws-exports"
import { LogBox } from "react-native"
import _ from "lodash"
import { useColorModeValue } from "native-base"

Amplify.configure({ ...awsExports, Analytics: { disabled: true } })

function App() {
  LogBox.ignoreLogs(["Warning:..."]) // ignore specific logs
  LogBox.ignoreAllLogs() // ignore all logs
  const _console = _.clone(console)
  console.warn = message => {
    if (message.indexOf("Setting a timer") <= -1) {
      _console.warn(message)
    }
  }

  return (
    <UserProvider>
      <NoteProvider>
        <TaskProvider>
          <StatusBar animated={true} showHideTransition="slide" hidden={true} />
          <AppContainer>
            <Navigator />
          </AppContainer>
        </TaskProvider>
      </NoteProvider>
    </UserProvider>
  )
}
export default App
