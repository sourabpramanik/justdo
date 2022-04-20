import React from "react"
import { useToast, Center, Button } from "native-base"

const CustomToast = () => {
  const toast = useToast()
  return (
    <Center>
      <Button
        onPress={() => {
          toast.show({
            render: () => {
              return (
                <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                  Hello! Have a nice day
                </Box>
              )
            }
          })
        }}
      >
        Custom Toast
      </Button>
    </Center>
  )
}

export default CustomToast
