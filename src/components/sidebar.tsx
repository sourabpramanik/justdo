import React, { useCallback, useState, useContext } from "react"
import {
  Heading,
  VStack,
  HStack,
  Avatar,
  IconButton,
  useColorModeValue,
  Center,
  Button,
  Icon
} from "native-base"
import { DrawerContentComponentProps } from "@react-navigation/drawer"
import AnimatedColorBox from "./animate-color-box"
import { Feather, AntDesign } from "@expo/vector-icons"
import MenuButton from "./menu-button"
import { Auth } from "aws-amplify"
import CustomButton from "./custom-button"
import UserContext from "../context/user"
const Sidebar = (props: DrawerContentComponentProps) => {
  const { state, navigation } = props
  const { setAuthUser } = useContext(UserContext)
  const [isLoggingOut, setLoggingOut] = useState(false)
  const currentRoute = state.routeNames[state.index]
  const handlePressBackButton = useCallback(() => {
    navigation.closeDrawer()
  }, [navigation])
  const handlePressMenuMain = useCallback(() => {
    navigation.navigate("Main")
  }, [navigation])
  const handlePressMenuAbout = useCallback(() => {
    navigation.navigate("About")
  }, [navigation])
  const handlePressMenuCalendar = useCallback(() => {
    navigation.navigate("Calendar")
  }, [navigation])
  const handleLogout = useCallback(() => {
    setLoggingOut(true)
    setAuthUser(null)
    handlePressBackButton()
    Auth.signOut()
  }, [Auth])

  return (
    <AnimatedColorBox
      safeArea
      flex={1}
      bg={useColorModeValue("blue.50", "darkBlue.800")}
      p={7}
    >
      <VStack flex={1} space={2}>
        <HStack justifyContent="flex-end">
          <IconButton
            onPress={handlePressBackButton}
            borderRadius={100}
            variant="outline"
            borderColor={useColorModeValue("blue.300", "darkBlue.700")}
            _icon={{
              as: Feather,
              name: "chevron-left",
              size: 6,
              color: useColorModeValue("blue.800", "darkBlue.700")
            }}
          />
        </HStack>
        <HStack justifyContent="center" alignItems="center">
          <Avatar
            source={require("../assets/justdo-logo.png")}
            size="md"
            mb={6}
            borderRadius={10}
          />
          <Heading mb={4} mx="4" size="xl" bold>
            JustDo.
          </Heading>
        </HStack>
        <MenuButton
          active={currentRoute === "Main"}
          onPress={handlePressMenuMain}
          icon="home"
        >
          Home
        </MenuButton>
        <MenuButton
          active={currentRoute === "Notes"}
          // onPress={handlePressMenuAbout}
          icon="edit-3"
        >
          Notes
        </MenuButton>
        <MenuButton
          active={currentRoute === "Calendar"}
          onPress={handlePressMenuCalendar}
          icon="calendar"
        >
          Calendar
        </MenuButton>
        <MenuButton
          active={currentRoute === "About"}
          onPress={handlePressMenuAbout}
          icon="info"
        >
          About
        </MenuButton>
      </VStack>
      <Center>
        <CustomButton
          bg="red.500"
          borderRadius={10}
          leftIcon={
            <Icon
              as={AntDesign}
              name="logout"
              size="sm"
              opacity={0.5}
              color="white"
            />
          }
          onPress={handleLogout}
          isLoading={false}
          loadingBg={useColorModeValue("red.600:alpha.70", "red.500:alpha.70")}
          loadingText="Taking you out.."
        >
          Logout
        </CustomButton>
      </Center>
    </AnimatedColorBox>
  )
}
export default Sidebar
