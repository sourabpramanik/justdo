import React from 'react'
import {Button, HStack, Text} from 'native-base'

interface Props{
    bg: string
    children: React.ReactNode
    isLoading: boolean
    loadingText: string
    borderRadius: string
    leftIcon: React.ReactNode
    loadingBg: string
}
const CustomButton=(props: Props)=>{
    const {bg, children, isLoading, loadingText, borderRadius, leftIcon, loadingBg} = props
    return(
        <HStack 
        alignItems="flex-start"
        justifyContent="center" 
        flexDirection="column"        
        w="full" 
        mt="15px"
        px={4} 
        py={2}>
            <Button 
            bg={bg}
            borderRadius={borderRadius}
            w="full"
            py={3}
            size="lg"
            leftIcon={leftIcon}
            isLoading={isLoading}
                _loading={{
                bg: loadingBg,
                _text: {
                    color: "muted.100",
                },
                }}
                _spinner={{
                color: "white",
                }}
                isLoadingText={loadingText} 
                {...props}
            >
                <Text fontSize="lg" color="white">{children}</Text>
            </Button>
        </HStack>        
    )
}
export default CustomButton