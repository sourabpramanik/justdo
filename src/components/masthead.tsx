import React from "react"
import { ImageSourcePropType } from "react-native"
import {
  VStack,
  Text,
  useColorModeValue,
  Flex,
  Box,
  IconButton
} from "native-base"
import { MaterialIcons } from "@expo/vector-icons"

interface Props {
  title: string
  image: ImageSourcePropType
  children: React.ReactNode
}

const Masthead = ({ title, image, children }: Props) => {
  return (
    <VStack
      w="full"
      borderRadius="20"
      p={6}
      bg={useColorModeValue("blue.500", "blue.400")}
    >
      <Flex
        direction="row"
        w="full"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Text color="white" fontSize="4xl" bold letterSpacing="xl">
          Day 43
        </Text>
        <Flex alignItems="flex-end">
          <Text color="white" fontSize="xl" letterSpacing="xl">
            Good Evening,
          </Text>
          <Text color="white" fontSize="3xl" bold letterSpacing="xl">
            Drek
          </Text>
        </Flex>
      </Flex>
      <Text color="white" fontSize="xl" bold letterSpacing="xl" py="6">
        Upcoming event: Conference with team
      </Text>
      <Box w="full" bg="white" py="0.2"></Box>
      <Flex direction="row" alignItems="center" pt="2">
        <Text color="white" fontSize="md" letterSpacing="xl">
          View productivity stats
        </Text>
        <IconButton
          // onPress={handlePressMenuButton}
          _icon={{
            as: MaterialIcons,
            name: "keyboard-arrow-right",
            size: 6,
            color: "white"
          }}
        />
      </Flex>
    </VStack>
  )
}
export default Masthead
