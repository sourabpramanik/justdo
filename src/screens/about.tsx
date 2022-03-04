import React from 'react';
import {Box, Text, VStack, ScrollView, Icon, useColorModeValue, Image} from 'native-base';
import {Feather} from '@expo/vector-icons'
import AnimatedColorBox from '../components/animate-color-box'
import NavBar from '../components/navbar'
import Masthead from '../components/masthead'
import LinkButton from '../components/link-button'
function AboutScreen() {
    return (
        <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'warmGray.900')}
      w="full"
    >
      <Masthead
        title="About JustDo."
        image={require('../assets/masthead.png')}
      >
        <NavBar />
      </Masthead>
      <ScrollView
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        mt="-20px"
        pt="30px"
        p={4}
      >
        <VStack flex={1} space={4}>
          <Box alignItems="center">
            <Image
              source={require('../assets/justdo-logo.png')}
              borderRadius={10}
              resizeMode="cover"
              w={120}
              h={120}
              alt="author"
            />
          </Box>
          <Text fontSize="md" w="full">
            JustDo is a To-Do App Created by Sourab Pramanik and Jaydeep Rao working as Full-Stack Freelancer and UI-UX Designer Respectively
          </Text>
          {/* <LinkButton
            colorScheme="red"
            size="lg"
            borderRadius="full"
            href="https://www.youtube.com/devaslife"
            leftIcon={
              <Icon as={Feather} name="youtube" size="sm" opacity={0.5} />
            }
          >
            Go to YouTube channel
          </LinkButton> */}
          <LinkButton
            colorScheme={useColorModeValue('blue', 'darkBlue')}
            size="lg"
            borderRadius="full"
            href="https://twitter.com/sourab_pramanik"
            leftIcon={
              <Icon as={Feather} name="twitter" size="sm" opacity={0.5} />
            }
          >
            @sourab_pramanik
          </LinkButton>
          <LinkButton
            colorScheme={useColorModeValue('blue', 'darkBlue')}
            size="lg"
            borderRadius="full"
            href="https://twitter.com/jaydeeprao_"
            leftIcon={
              <Icon as={Feather} name="twitter" size="sm" opacity={0.5} />
            }
          >
            @jaydeeprao_
          </LinkButton>
        </VStack>
      </ScrollView>
    </AnimatedColorBox>      
    )
}

export default AboutScreen
