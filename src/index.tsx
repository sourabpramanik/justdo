import React, { useContext, useEffect } from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import HomeScreen from "./screens/home"
import AboutScreen from "./screens/about"
import Signin from "./screens/signin"
import SignUp from "./screens/signup"
import ForgotPassword from "./screens/forgotPassword"
import Calendar from "./screens/calendar"
import Note from "./screens/note"
import LoadingModal from "./components/loading-modal"
import Sidebar from "./components/sidebar"
import UserContext from "./context/user"
import { Auth } from "aws-amplify"
import AsyncStorage from "@react-native-async-storage/async-storage"

const Drawer = createDrawerNavigator()

const App = () => {
  const { authUser, setAuthUser } = useContext(UserContext)
  const [loading, setLoading] = React.useState(false)

  const localUser = async () => {
    try {
      const value = await AsyncStorage.getItem("USER")
      if (value !== null) {
        setAuthUser(JSON.parse(value))
        setLoading(false)
      } else {
        setAuthUser(null)
        check()
        setLoading(false)
      }
    } catch (error) {
      // Error retrieving data
      console.log(error)
    }
  }

  useEffect(() => {
    setLoading(true)
    localUser()
  }, [])

  function check() {
    if (!authUser) {
      return
    }
  }

  return (
    <>
      <LoadingModal open={loading} />

      {!loading && (
        <Drawer.Navigator
          // initialRouteName="Main"
          drawerContent={props => <Sidebar {...props} />}
          screenOptions={{
            headerShown: false,
            drawerType: "back",
            overlayColor: "#00000000"
          }}
        >
          {!authUser ? (
            <>
              <Drawer.Screen name="Signin" component={Signin} />
              <Drawer.Screen name="Signup" component={SignUp} />
              <Drawer.Screen name="ForgotPassword" component={ForgotPassword} />
            </>
          ) : (
            <>
              <Drawer.Screen name="Home" component={HomeScreen} />
              <Drawer.Screen name="About" component={AboutScreen} />

              <Drawer.Screen name="Calendar" component={Calendar} />
              <Drawer.Screen name="Note" component={Note} />
            </>
          )}
        </Drawer.Navigator>
      )}
    </>
  )
}

export default App
