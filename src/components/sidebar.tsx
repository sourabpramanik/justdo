import React, {useCallback, useState} from 'react'
import {Heading, VStack, HStack, Avatar, IconButton, useColorModeValue, Center, Button, Icon} from 'native-base';
import {DrawerContentComponentProps} from '@react-navigation/drawer'
import AnimatedColorBox from './animate-color-box'
import ThemeToggle from './theme-toggle'
import {Feather,AntDesign} from '@expo/vector-icons'
import MenuButton from './menu-button'
import {Auth} from "aws-amplify"
import CustomButton from './custom-button'
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
                <Heading mb={4} size="2xl">
                    Hey, Sourab
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
                <CustomButton                 
                bg="red.500"
                borderRadius={10}                                                     
                leftIcon={
                    <Icon as={AntDesign} name="logout" size="sm" opacity={0.5} color="white"/>
                }       
                onPress={()=>console.log("logout")
                } 
                isLoading={true}
                loadingBg={useColorModeValue('red.600:alpha.70', 'red.500:alpha.70')}
                loadingText="Taking you out.."                
                >
                    Logout
                </CustomButton>
            </Center>           
        </AnimatedColorBox>
    )
}
export default Sidebar