import { StatusBar } from "expo-status-bar"
import React from "react"
import AppContainer from "./src/components/app-container"
import Navigator from "./src/"
import Amplify from "aws-amplify"
import { UserProvider } from "./src/context/user"
import { TaskProvider } from "./src/context/task"
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
      <TaskProvider>
        <StatusBar
          animated={true}
          backgroundColor={useColorModeValue("blue.100", "darkBlue.800")}
          // barStyle={statusBarStyle}
          // showHideTransition="slide"
          // hidden={true}
        />
        <AppContainer>
          <Navigator />
        </AppContainer>
      </TaskProvider>
    </UserProvider>
  )
}
export default App
