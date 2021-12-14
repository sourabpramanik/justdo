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
        title="About this app"
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
              source={require('../assets/profile.png')}
              borderRadius="full"
              resizeMode="cover"
              w={120}
              h={120}
              alt="author"
            />
          </Box>
          <Text fontSize="md" w="full">
            Viron is To Do app Created by Sourab Pramanik working as Full-Stack freelancer.
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
          {/* <Text fontSize="md" w="full">
            Are you looking for a Markdown note-taking app? Check out my app
            called Inkdrop!
          </Text>
          <LinkButton
            colorScheme="purple"
            size="lg"
            borderRadius="full"
            href="https://www.inkdrop.app/"
            leftIcon={
              <Icon as={Feather} name="external-link" size="sm" opacity={0.5} />
            }
          >
            https://www.inkdrop.app/
          </LinkButton> */}
        </VStack>
      </ScrollView>
    </AnimatedColorBox>      
    )
}

export default AboutScreen