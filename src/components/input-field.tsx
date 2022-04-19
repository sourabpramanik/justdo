import React from "react"
import { Input, HStack, FormControl } from "native-base"
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native"
import { View } from "moti"
import { makeStyledComponent } from "../utils/styled"
interface Props {
  labelName: string
  placeholder: string
  fieldType: string
  value: string
  onChange?: () => void
}
const StyledView = makeStyledComponent(View)
const InputField = (props: Props) => {
  const { labelName, value, placeholder, fieldType, onChange } = props
  return (
    <StyledView
      w="full"
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
      <HStack
        alignItems="flex-start"
        justifyContent="center"
        flexDirection="column"
        w="full"
        px={4}
        py={2}
      >
        <FormControl.Label fontSize="lg" color="black">
          {labelName}
        </FormControl.Label>
        <Input w="full" {...props} fontSize="lg" borderRadius={10} px={4} />
      </HStack>
    </StyledView>
  )
}
export default InputField
