import React, {useCallback, useState} from 'react'
import {Heading, VStack, HStack, Avatar, IconButton, useColorModeValue, Center, Button, Icon} from 'native-base';
import {DrawerContentComponentProps} from '@react-navigation/drawer'
import AnimatedColorBox from './animate-color-box'
import ThemeToggle from './theme-toggle'
import {Feather,AntDesign} from '@expo/vector-icons'
import MenuButton from './menu-button'
import {Auth} from "aws-amplify"
const Sidebar=(props: DrawerContentComponentProps)=>{
    const {state, navigation} = props
    const [isLoggingOut, setLoggingOut] = useState(false)
    const currentRoute = state.routeNames[state.index]
    const handlePressBackButton = useCallback(()=>{
        navigation.closeDrawer()
    }, [navigation])
    const handlePressMenuMain = useCallback(()=>{
        navigation.navigate("Main")
    }, [navigation])
    const handlePressMenuAbout = useCallback(()=>{
        navigation.navigate("About")
    }, [navigation])
    const handleLogout = useCallback(()=>{
        setLoggingOut(true)
        Auth.signOut();
    },[Auth])

    return(
        <AnimatedColorBox safeArea flex={1} bg={useColorModeValue('blue.50', 'darkBlue.800')} p={7}>
            <VStack flex={1} space={2}>
                <HStack justifyContent="flex-end">
                    <IconButton 
                    onPress={handlePressBackButton} 
                    borderRadius={100} 
                    variant="outline"
                    borderColor={useColorModeValue('blue.300','darkBlue.700')}
                    _icon={{
                        as:Feather,
                        name: 'chevron-left',
                        size:6,
                        color: useColorModeValue('blue.800', 'darkBlue.700')
                    }}
                    />
                </HStack>
                <Avatar source={require('../assets/profile.png')} size="xl" mb={6} borderColor="primary.300" borderRadius={100} borderWidth={3}/>
                <Heading mb={4} size="xl">
                    Viron
                </Heading>
                <MenuButton active={currentRoute==="Main"} onPress={handlePressMenuMain} icon="inbox">
                    To Dos
                </MenuButton>
                <MenuButton active={currentRoute==="About"} onPress={handlePressMenuAbout} icon="info">
                    About
                </MenuButton>
            </VStack> 
            <Center>
                <ThemeToggle/>
                <Button 
                size="lg"
                bg="red.500"
                borderRadius="full" 
                w="full"                                      
                leftIcon={
                    <Icon as={AntDesign} name="logout" size="sm" opacity={0.5} />
                }       
                onPress={handleLogout} 
                isLoading={isLoggingOut}
                _loading={{
                bg: "red.600:alpha.70",
                _text: {
                    color: "coolGray.700",
                },
                }}
                _spinner={{
                color: "white",
                }}
                isLoadingText="Logging Out" 
                >
                    Logout
                </Button>
            </Center>           
        </AnimatedColorBox>
    )
}
export default Sidebar