import React from "react"
import { ImageSourcePropType } from "react-native"
import { HStack } from "native-base"
import NavBar from "./navbar"

interface Props {
  title: string
  image: ImageSourcePropType
  children: React.ReactNode
}

const Masthead = ({ title, image, children }: Props) => {
  return (
    <HStack h="200px" w="full">
      <NavBar />
    </HStack>
  )
}
export default Masthead
