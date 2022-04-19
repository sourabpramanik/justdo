import React, { useCallback, useContext, useState } from "react"
import {
  VStack,
  Text,
  Center,
  FormControl,
  Stack,
  Box,
  Icon
} from "native-base"
import AnimatedColorBox from "../components/animate-color-box"
import TitleMastHead from "../components/title-masthead"
import InputField from "../components/input-field"
import CustomButton from "../components/custom-button"
import AlertPopUp from "../components/alert-popups"
import UserContext from "../context/user"
import AnimatedModal from "../components/animated-modal"
import { MaterialIcons } from "@expo/vector-icons"

const Signup = props => {
  const {
    formState,
    setFormState,
    handleSignUp,
    open,
    handleModalOverlay,
    handleSignupConfirmation,
    signUpLoading,
    confirmationLoading,
    valid
  } = useContext(UserContext)
  const [showPassword, setShowPassword] = useState(false)

  const { navigation } = props
  const handleSignInNavigation = useCallback(() => {
    navigation.navigate("Signin")
  }, [navigation])

  return (
    <AnimatedColorBox flex={1} space={2}>
      <TitleMastHead
        title="Sign Up"
        subtitle="Add what to do while enjoying your brew ☕ "
      />
      <AlertPopUp show={valid.status}>{valid.message}</AlertPopUp>
      <VStack
        flex={2}
        space={1}
        mt="-20px"
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        pt="50px"
        bg="warmGray.50"
      >
        <FormControl isRequired>
          <InputField
            placeholder="Enter your name"
            type="text"
            labelName="Name"
            value={formState.name}
            onChangeText={value => setFormState({ ...formState, name: value })}
          />
          <InputField
            placeholder="Enter your email"
            type="email"
            labelName="Email"
            value={formState.email}
            onChangeText={value => setFormState({ ...formState, email: value })}
          />
          <InputField
            placeholder="Enter your Password"
            type="password"
            labelName="Password"
            value={formState.password}
            onChangeText={value =>
              setFormState({ ...formState, password: value })
            }
            InputRightElement={
              <Icon
                as={
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                  />
                }
                mr="2"
                size={6}
                color={showPassword ? "blue.400" : "muted.400"}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />
          <CustomButton
            bg="blue.500"
            isLoading={signUpLoading}
            loadingText="Please wait a moment"
            loadingBg="blue.600:alpha.70"
            borderRadius="10"
            onPress={handleSignUp}
          >
            Sign Up
          </CustomButton>
        </FormControl>
        <Center justifyContent="flex-end" h="200">
          <Text fontSize="lg" color="blue.500" onPress={handleSignInNavigation}>
            Already have an account?
          </Text>
        </Center>
        <AnimatedModal
          formState={formState}
          setFormState={setFormState}
          open={open}
          handleModalOverlay={handleModalOverlay}
          handleSignupConfirmation={handleSignupConfirmation}
          confirmationLoading={confirmationLoading}
          valid={valid}
        />
      </VStack>
    </AnimatedColorBox>
  )
}

export default Signup
