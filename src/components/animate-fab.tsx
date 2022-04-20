import React from "react"
import { View } from "moti"
import { makeStyledComponent } from "../utils/styled"
import { Fab, Icon, useColorModeValue } from "native-base"
import { Feather } from "@expo/vector-icons"

const StyledView = makeStyledComponent(View)

interface Props {
  onSaveDesc: () => void
  editMode: boolean
}
const AnimatedFab = (props: Props) => {
  const { onSaveDesc, editMode } = props
  return (
    <StyledView
      from={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46
      }}
      animate={{
        opacity: 1,
        scale: 1,
        marginBottom: 0
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46
      }}
    >
      <Fab
        position="absolute"
        zIndex={20}
        renderInPortal={editMode}
        size="sm"
        icon={<Icon color="white" as={<Feather name="check" />} size="sm" />}
        bottom={20}
        colorScheme={useColorModeValue("blue", "darkBlue")}
        bg={useColorModeValue("blue.500", "blue.400")}
        onPress={onSaveDesc}
      />
    </StyledView>
  )
}

export default AnimatedFab
