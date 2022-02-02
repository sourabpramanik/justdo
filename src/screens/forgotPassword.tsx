import React, { useCallback, useContext, useEffect } from "react"
import {
  VStack,
  HStack,
  Text,
  Center,
  FormControl,
  Stack,
  Box,
  Modal
} from "native-base"
import AnimatedColorBox from "../components/animate-color-box"
import TitleMastHead from "../components/title-masthead"
import InputField from "../components/input-field"
import CustomButton from "../components/custom-button"
import AlertPopUp from "../components/alert-popups"
import UserContext from "../context/user"

const ForgotPassword = props => {
  const {
    formState,
    setFormState,
    codeSending,
    passwordModal,
    handlePasswordChange,
    handlePasswordModal,
    changingPassword,
    handlePasswordSubmit,
    uiState,
    valid
  } = useContext(UserContext)
  const { navigation } = props
  const handleSigninNavigation = useCallback(() => {
    navigation.navigate("Signin")
  }, [navigation])

  useEffect(() => {
    if (uiState === "Signin") {
      handleSigninNavigation()
    }
  }, [uiState])
  return (
    <AnimatedColorBox flex={1} space={2}>
      <TitleMastHead
        title="Forgot Password"
        subtitle="Not a problem, we can help you 👷"
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
          <CustomButton
            bg="blue.500"
            isLoading={codeSending}
            loadingText="Sending Code"
            loadingBg="blue.600:alpha.70"
            borderRadius="10"
            onPress={handlePasswordChange}
          >
            Get Confirmation Code
          </CustomButton>
        </FormControl>
        <Modal isOpen={passwordModal} size="xl" onClose={handlePasswordModal}>
          <Modal.Content maxWidth="450">
            <Modal.CloseButton color="white" />
            <Modal.Header bg="blue.500">
              <Text fontSize={20} color="white" bold>
                Change the Password
              </Text>
            </Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>
                  <Text fontSize={16} color="blue.500" bold>
                    Enter the confirmation code recieved in your email and new
                    password.
                  </Text>
                </FormControl.Label>
                <InputField
                  placeholder="Confirmation Code"
                  type="password"
                  value={formState.authCode}
                  onChangeText={value =>
                    setFormState({ ...formState, authCode: value })
                  }
                />
                <InputField
                  placeholder="Create New Password"
                  type="password"
                  value={formState.password}
                  onChangeText={value =>
                    setFormState({ ...formState, password: value })
                  }
                />
                <HStack>
                  <CustomButton
                    bg="blue.500"
                    isLoading={changingPassword}
                    loadingText="Please wait a moment"
                    loadingBg="blue.600:alpha.70"
                    borderRadius="10"
                    onPress={handlePasswordSubmit}
                  >
                    Change Password
                  </CustomButton>
                </HStack>
              </FormControl>
            </Modal.Body>
          </Modal.Content>
        </Modal>
        <Center justifyContent="flex-end" h="380">
          <Text fontSize="lg" color="blue.500" onPress={handleSigninNavigation}>
            I remember my password
          </Text>
        </Center>
      </VStack>
    </AnimatedColorBox>
  )
}

export default ForgotPassword
