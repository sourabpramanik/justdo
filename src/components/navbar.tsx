import React, { useCallback } from "react"
import { HStack, IconButton, useColorMode } from "native-base"
import { Feather, Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { DrawerNavigationProp } from "@react-navigation/drawer"

const NavBar = () => {
  const navigation = useNavigation<DrawerNavigationProp<{}>>()
  const handlePressMenuButton = useCallback(() => {
    navigation.openDrawer()
  }, [navigation])
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <HStack w="full" h={40} alignItems="center" justifyContent="space-between">
      <IconButton
        onPress={handlePressMenuButton}
        borderRadius={100}
        _icon={{
          as: Feather,
          name: "menu",
          size: 6,
          color: "blue.500"
        }}
      />
      <IconButton
        onPress={toggleColorMode}
        borderRadius={100}
        _icon={{
          as: Ionicons,
          name: colorMode === "light" ? "sunny-outline" : "ios-moon-outline",
          size: 6,
          color: "blue.500"
        }}
      />
    </HStack>
  )
}
export default NavBar
