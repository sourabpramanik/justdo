import React, { useContext, useEffect } from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import HomeScreen from "./screens/home"
import AboutScreen from "./screens/about"
import Signin from "./screens/signin"
import SignUp from "./screens/signup"
import ForgotPassword from "./screens/forgotPassword"
import WorkSpace from "./screens/workSpace"
import Sidebar from "./components/sidebar"
import UserContext from "./context/user"
import { Auth } from "aws-amplify"

const Drawer = createDrawerNavigator()

const App = () => {
  const { authUser } = useContext(UserContext)

  useEffect(() => {
    check()
  }, [])

  function check() {
    if (!authUser) {
      return
    }
  }

  return (
    <Drawer.Navigator
      // initialRouteName="Main"
      drawerContent={props => <Sidebar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: "back",
        overlayColor: "#00000000"
      }}
    >
      {authUser ? (
        <>
          <Drawer.Screen name="Signin" component={Signin} />
          <Drawer.Screen name="Signup" component={SignUp} />
          <Drawer.Screen name="ForgotPassword" component={ForgotPassword} />
        </>
      ) : (
        <>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="About" component={AboutScreen} />
          <Drawer.Screen name="WorkSpace" component={WorkSpace} />
        </>
      )}
    </Drawer.Navigator>
  )
}

export default App
