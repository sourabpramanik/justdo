import React, {useCallback} from 'react'
import {VStack, Text, Center, FormControl, Stack, Box} from 'native-base'
import AnimatedColorBox from '../components/animate-color-box'
import TitleMastHead from '../components/title-masthead'
import InputField from '../components/input-field'
import CustomButton from '../components/custom-button'


const Signup = (props)=>{
    const {navigation} = props
    const handleSignInNavigation = useCallback(()=>{
        navigation.navigate("Signin")
    },[navigation])

    return(
        <AnimatedColorBox flex={1} space={2}>
            <TitleMastHead title="Sign Up" subtitle="Add what to do while enjoying your brew ☕ "/>                     
            <VStack flex={2} space={1}  mt="-20px" borderTopLeftRadius="20px" borderTopRightRadius="20px" pt="50px" bg='warmGray.50'>                
                    <FormControl isRequired>  
                        <InputField
                            placeholder="Enter your name"
                            fieldType="name"
                            name="Name"
                        />
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
                    <Center justifyContent="flex-end" h="200">
                        <Text fontSize="lg" color="blue.500" onPress={handleSignInNavigation}>
                            Already have an account?
                        </Text>
                    </Center>               
            </VStack>
        </AnimatedColorBox>
    )
}

export default Signup