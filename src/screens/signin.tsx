import React, {useCallback} from 'react'
import {VStack, Text, Center, FormControl, Stack, Box} from 'native-base'
import AnimatedColorBox from '../components/animate-color-box'
import TitleMastHead from '../components/title-masthead'
import InputField from '../components/input-field'
import CustomButton from '../components/custom-button'


const Signin = (props)=>{
    const {navigation} = props
    const handleSignupNavigation = useCallback(()=>{
        navigation.navigate("Signup")
    },[navigation])
    return(
        <AnimatedColorBox flex={1} space={2}>
            <TitleMastHead title="Sign In" subtitle="👋 Hey there! Welcome to JustDo."/>                     
            <VStack flex={2} space={1}  mt="-20px" borderTopLeftRadius="20px" borderTopRightRadius="20px" pt="50px" bg='warmGray.50'>                
                    <FormControl isRequired>  
                        <InputField
                            placeholder="Enter your email"
                            fieldType="email"
                            name="Email"
                        />  
                        <InputField
                            placeholder="Enter your Password"
                            fieldType="password"
                            name="Password"
                        />  
                        <Box
                        alignItems="flex-end" 
                        w="full"
                        px={4}
                        >
                            <Text fontSize={16} color="red.400">Forgot password?</Text>
                        </Box>                                                
                        <CustomButton
                        bg="blue.500"
                        isLoading={false}
                        loadingText="Please wait a moment"
                        loadingBg="blue.600:alpha.70"
                        borderRadius="10"
                        >
                            Let me in
                        </CustomButton>                                                
                    </FormControl>                                     
                    <Center justifyContent="flex-end" h="250">
                        <Text fontSize="lg" color="blue.500" onPress={handleSignupNavigation}>
                            Want to create a new account?
                        </Text>
                    </Center>               
            </VStack>
        </AnimatedColorBox>
    )
}

export default Signin