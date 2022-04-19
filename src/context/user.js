import React, { useState, useEffect, useCallback } from "react"
import { Auth } from "aws-amplify"
import AlertPopUp from "../components/alert-popups"
import AsyncStorage from "@react-native-async-storage/async-storage"

const UserContext = React.createContext()

const InitialData = {
  name: "",
  email: "",
  password: "",
  authCode: ""
}

const ErrorData = {
  message: "",
  status: false
}

const UserProvider = props => {
  const { children } = props
  const [formState, setFormState] = useState(InitialData)
  const { name, email, password, authCode } = formState
  const [open, setOpen] = useState(false)
  const [authUser, setAuthUser] = useState(null)
  const [signUpLoading, setSignUpLoading] = useState(false)
  const [signInLoading, setSignInLoading] = useState(false)
  const [codeSending, setCodeSending] = useState(false)
  const [changingPassword, setChangingPassword] = useState(false)
  const [passwordModal, setPasswordModal] = useState(false)
  const [confirmationLoading, setConfirmationLoading] = useState(false)
  const [uiState, setUiState] = useState(null)
  const [valid, setValid] = useState(ErrorData)

  const checkUser = async () => {
    await Auth.currentAuthenticatedUser().then(res => {
      if (res?.attributes?.sub) {
        setAuthUser(res)
        try {
          AsyncStorage.setItem("USER", JSON.stringify(res))
        } catch (error) {
          // Error saving data
          console.log(error)
        }
      } else {
        setValid({
          message: "Something went wrong. Please try again.",
          status: true
        })
        console.log("TRY AGAIN")
      }
    })
  }

  useEffect(() => {
    if (valid.status == true) {
      setTimeout(() => {
        setValid({
          message: "",
          status: false
        })
      }, 3000)
    }
  }, [valid])

  const handleModalOverlay = useCallback(() => {
    setOpen(open => !open)
  }, [open])

  const handleSignUp = async () => {
    setSignUpLoading(true)
    setOpen(true)
    try {
      if (!name || !email || !password) {
        setValid({
          message: "* Marked Fields are important. Sign Up failed.",
          status: true
        })
        setSignUpLoading(false)
        setOpen(false)
      } else {
        await Auth.signUp({
          name,
          username: email,
          password,
          attributes: { name }
        })
      }
    } catch (error) {
      setValid({
        message: "Something went wrong. Please try again.",
        status: true
      })
      setSignUpLoading(false)
      console.log(error)
    }
  }
  const handleSignupConfirmation = async () => {
    try {
      setConfirmationLoading(true)
      if (!email) {
        setValid({
          message: "E-mail is empty.",
          status: true
        })
        setConfirmationLoading(false)
      } else if (!authCode) {
        setValid({
          message: "Auth Code is required",
          status: true
        })
        setConfirmationLoading(false)
      } else {
        await Auth.confirmSignUp(email, authCode).then(res => {
          if (res === "SUCCESS") {
            Auth.signIn(email, password).then(userData => {
              if (userData?.attributes?.sub) {
                setOpen(false)
                setConfirmationLoading(false)
                setSignUpLoading(false)
                setFormState(InitialData)
                checkUser()
              }
            })
          } else {
            setOpen(false)
            setSignUpLoading(false)
            setConfirmationLoading(false)
            console.log("TRY AGAIN")
          }
        })
      }
    } catch (error) {
      setValid({
        message: "Verification failed. Please try again.",
        status: true
      })
      setConfirmationLoading(false)
      console.log(error)
    }
  }
  const handleLogin = async () => {
    try {
      setSignInLoading(true)
      if (!email || !password) {
        setValid({
          message: "* Marked fields are important. Sign In failed.",
          status: true
        })
        setSignInLoading(false)
      } else {
        await Auth.signIn(email, password).then(userData => {
          if (userData?.attributes?.sub) {
            setFormState(InitialData)
            checkUser()
            setSignInLoading(false)
          }
        })
      }
    } catch (error) {
      setValid({
        message: "Wrong E-mail or Password. Please try again.",
        status: true
      })
      setSignInLoading(false)
    }
  }
  const handlePasswordChange = async () => {
    setCodeSending(true)
    try {
      if (!email) {
        setCodeSending(false)
        setValid({
          message: "Please enter your E-mail.",
          status: true
        })
      } else {
        await Auth.forgotPassword(email)
        setPasswordModal(true)
      }
    } catch (error) {
      setPasswordModal(false)
      setValid({
        message: "Password update failed. Please try again.",
        status: true
      })
      setCodeSending(false)
      console.log(error)
    }
  }
  const handlePasswordModal = useCallback(() => {
    setPasswordModal(passwordModal => !passwordModal)
    setCodeSending(false)
  }, [passwordModal])

  const handlePasswordSubmit = async () => {
    setCodeSending(false)
    try {
      if (!email || !authCode || !password) {
        setCodeSending(false)
        setValid({
          message: "* Marked fields are important. ",
          status: true
        })
      } else {
        await Auth.forgotPasswordSubmit(email, authCode, password).then(res => {
          if (res === "SUCCESS") {
            setPasswordModal(false)
            setFormState(InitialData)
            setUiState("Signin")
          } else {
            setPasswordModal(false)
          }
        })
      }
    } catch (error) {
      setValid({
        message: "Something went wrong. Please try again.",
        status: true
      })
      console.log(error)
    }
  }
  return (
    <UserContext.Provider
      value={{
        formState,
        setFormState,
        handleSignUp,
        open,
        handleModalOverlay,
        handleSignupConfirmation,
        authUser,
        setAuthUser,
        signUpLoading,
        confirmationLoading,
        handleLogin,
        codeSending,
        signInLoading,
        passwordModal,
        handlePasswordChange,
        handlePasswordModal,
        changingPassword,
        handlePasswordSubmit,
        uiState,
        valid
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
export { UserProvider }
