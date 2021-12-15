import React from 'react'
import {HStack, Modal, Text, FormControl} from 'native-base'
import InputField from './input-field'
import CustomButton from './custom-button'

const AnimatedModal =(props)=>{
    const {formState, setFormState, open, handleModalOverlay, handleSignupConfirmation, confirmationLoading} = props

    return(
        <Modal isOpen={open} size="xl" onClose={handleModalOverlay}>
            <Modal.Content maxWidth="450">
                <Modal.CloseButton color="white"/>
                <Modal.Header  bg="blue.500">
                    <Text fontSize={20} color="white" bold >Confirm Your Email</Text>
                </Modal.Header>
                <Modal.Body>
                    <FormControl>
                        <FormControl.Label>
                            <Text fontSize={16} color="blue.500" bold>Enter the confirmation code recieved in your email.</Text>
                        </FormControl.Label>
                        <InputField
                        placeholder="######"
                        type="password"
                        value={formState.authCode}
                        onChangeText={(value) => setFormState({ ...formState, authCode: value })} 
                        />
                        <HStack>
                            <CustomButton
                            bg="blue.500"
                            isLoading={confirmationLoading}
                            loadingText="Please wait a moment"
                            loadingBg="blue.600:alpha.70"
                            borderRadius="10"
                            onPress={handleSignupConfirmation}
                            >
                                Confirm Email
                            </CustomButton>                    
                        </HStack>
                    </FormControl>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    )
}

export default AnimatedModal