import React from 'react'
import {Input, HStack, FormControl} from 'native-base'
import {View} from 'moti'
import {makeStyledComponent} from '../utils/styled'
interface Props{
    name: string
    placeholder: string
    fieldType: string
    onInputChange?: () => void    
}
const StyledView = makeStyledComponent(View)
const InputField = (props: Props)=>{
    const {name, placeholder,fieldType, onInputChange} = props
    return(
        
        <StyledView 
        w="full" 
        from={{
            opacity:0,
            scale:0.5,
            marginBottom: -46
        }}
        animate={{
            opacity:1,
            scale:1,
            marginBottom: 0
        }}
        exit={{
            opacity:0,
            scale:0.5,
            marginBottom: -46
        }}
        >
            <HStack 
            alignItems="flex-start"
            justifyContent="center" 
            flexDirection="column"        
            w="full" 
            px={4} 
            py={2}>
                <FormControl.Label fontSize="lg">{name}</FormControl.Label>
                <Input
        
                w="full"
                type={fieldType}
                placeholder={placeholder}
                onChange={onInputChange}
                fontSize="lg"
                borderRadius={10}
                px={4}            
                />
                
            </HStack>
        </StyledView>                
    )
}
export default InputField