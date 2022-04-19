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
import { MaterialIcons } from "@expo/vector-icons"

const Signin = props => {
  const { formState, setFormState, handleLogin, signInLoading, valid } =
    useContext(UserContext)
  const { navigation } = props
  const [showPassword, setShowPassword] = useState(false)
  const handleSignupNavigation = useCallback(() => {
    navigation.navigate("Signup")
  }, [navigation])
  const habdlePasswordNavigation = useCallback(() => {
    navigation.navigate("ForgotPassword")
  }, [navigation])
  return (
    <AnimatedColorBox flex={1} space={2}>
      <TitleMastHead
        title="Sign In"
        subtitle="👋 Hey there! Welcome to JustDo."
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
            placeholder="Enter your email"
            type="email"
            labelName="Email"
            value={formState.email}
            onChangeText={value => setFormState({ ...formState, email: value })}
          />
          <InputField
            placeholder="Enter your Password"
            type={showPassword ? "text" : "password"}
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
          <Box alignItems="flex-end" w="full" px={4}>
            <Text
              fontSize={16}
              color="red.400"
              onPress={habdlePasswordNavigation}
            >
              Forgot password?
            </Text>
          </Box>
          <CustomButton
            bg="blue.500"
            isLoading={signInLoading}
            loadingText="Please wait a moment"
            loadingBg="blue.600:alpha.70"
            borderRadius="10"
            onPress={handleLogin}
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
