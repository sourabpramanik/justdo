import React from 'react'
import { Text, HStack, Switch, useColorMode } from 'native-base'
// import { Appearance } from 'react-native';

export default function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()
  // const systemColorScheme = Appearance.getColorScheme();
  // console.log(systemColorScheme);
  
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === 'light'}
        onToggle={toggleColorMode}
      ></Switch>
      <Text>Light</Text>
    </HStack>
  )
}