import { Box, HStack, Input, Progress, Select, Text, VStack } from '@chakra-ui/react'
import { FC, PropsWithChildren } from 'react'
import 'twin.macro'

export const BaseLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Progress />
      <Box>{children}</Box>
    </div>
  )
}
