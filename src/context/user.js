import React, {useState, useEffect, useCallback} from 'react';
import {Auth} from 'aws-amplify'

const UserContext = React.createContext();

const InitialData = {
    name:'',
    email:'',
    password:'',
    authCode:'',
}

const UserProvider = (props)=>{
    
    const {children} = props
    const [formState, setFormState] = useState(InitialData)
    const {name, email, password, authCode} = formState
    const [open, setOpen] = useState(false)
    const [authUser, setAuthUser] = useState(null)
    const [signUpLoading, setSignUpLoading] = useState(false)
    const [signInLoading, setSignInLoading] = useState(false)
    const [codeSending, setCodeSending] = useState(false)
    const [changingPassword, setChangingPassword] = useState(false)
    const [passwordModal, setPasswordModal] = useState(false)
    const [confirmationLoading, setConfirmationLoading] = useState(false)
    const [uiState, setUiState] = useState(null)
    const checkUser =async()=>{
        await Auth.currentAuthenticatedUser().then(res=>{
            if (res?.attributes?.sub) {
                setAuthUser(res)
            }
            else{
                console.log("TRY AGAIN");
            }
        })
    } 
    const handleModalOverlay = useCallback(()=>{
        setOpen(open => !open)
    },[open])
    const handleSignUp = async()=>{
        setSignUpLoading(true)
        setOpen(true)
        try {
            await Auth.signUp({name, username: email, password, attributes: { name }})                                    
        } catch (error) {
            setSignUpLoading(false)
            console.log(error);
        }
    }
    const handleSignupConfirmation = async()=>{
        try {
            setConfirmationLoading(true)
            await Auth.confirmSignUp(email, authCode).then(res=> {
                if(res==="SUCCESS"){
                    Auth.signIn(email, password).then(userData=>{
                        if(userData?.attributes?.sub){
                            setOpen(false)
                            setConfirmationLoading(false)  
                            setSignUpLoading(false)                          
                            setFormState(InitialData)
                            checkUser()                            
                        }                        
                    })                    
                }
                else{
                    setOpen(false)                            
                    setSignUpLoading(false)
                    setConfirmationLoading(false)
                    console.log("TRY AGAIN")
                }
            })
        } catch (error) {
            setConfirmationLoading(false)
            console.log(error);
        }
    }
    const handleLogin = async()=>{
        try {
            setSignInLoading(true)
            await Auth.signIn(email, password).then(userData=>{
                if(userData?.attributes?.sub){                     
                    setFormState(InitialData)
                    checkUser() 
                    setSignInLoading(false)                           
                }                        
            })
        } catch (error) {
            setSignInLoading(false)
            console.log(error)
        }
        
    }
    const handlePasswordChange=async()=>{
        setCodeSending(true)
        try {
            await Auth.forgotPassword(email)
            setPasswordModal(true)
        } catch (error) {            
            setPasswordModal(false)
            setCodeSending(false)
            console.log(error);
        }
    }
    const handlePasswordModal = useCallback(()=>{
        setPasswordModal(passwordModal => !passwordModal)
        setCodeSending(false)
    },[passwordModal])
    const handlePasswordSubmit= async()=>{
        setCodeSending(false)
        try {
            await Auth.forgotPasswordSubmit(email, authCode, password).then(res =>{
                if(res==="SUCCESS"){
                    setPasswordModal(false)
                    setFormState(InitialData)   
                    setUiState('Signin')                 
                }                
                else{
                    setPasswordModal(false)
                }                
            })
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <UserContext.Provider value={{
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
            uiState
            }}>
            {children}
        </UserContext.Provider>
    ) 
}

export default UserContext;
export {UserProvider}