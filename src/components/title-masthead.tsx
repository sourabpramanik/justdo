import React from 'react'
import {VStack, Heading, Center, Text} from 'native-base'

interface Props{
    title: string
    subtitle: string
}

const TitleMastHead = (props: Props) =>{

    return(
        <VStack h="300px" pb={5} bg="blue.500">
            <Center>
                <Heading color="white" pt={20} size="4xl">
                    {props.title}
                </Heading>
                <Text color="white" my="5" fontSize="xl">
                    {props.subtitle}
                </Text>
            </Center>
        </VStack>   
    )
}
export default TitleMastHead;