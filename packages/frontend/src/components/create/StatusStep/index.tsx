import { useState } from 'react'
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi'
import 'twin.macro'
import { SignMessageaProps, StatusStepProps } from '../types'
import { Flex, HStack, Input, Text } from '@chakra-ui/react'
import { signitureToInput } from '@shared/helpers'

export const SignMessage = ({ password }: SignMessageaProps) => {
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: password,
  })

  console.log(data, data?.length)
  console.log(signitureToInput(data))

  return (
    <>
      <button disabled={isLoading} onClick={() => signMessage()}>
        Sign message
      </button>
      {isSuccess && <div>Signature: {data}</div>}
      {isError && <div>Error signing message</div>}
    </>
  )
}

export const StatusStep = ({ handleInput, walletData, step }: StatusStepProps) => {
  const Title = 'Connect your wallet'
  const { isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()
  const [password, setPassword] = useState<string>('')

  const handlePassword = (e: any) => {
    setPassword(e.target.value)
  }

  if (isConnected) {
    return (
      <>
        <HStack>
          <Flex
            alignItems="center"
            justifyContent="center"
            borderRadius="full"
            background="white"
            width="25px"
            color="black"
            as="b"
          >
            {step + 1}
          </Flex>
          <Text as="b">{Title}</Text>
        </HStack>

        <Input
          value={password}
          variant="filled"
          type="text"
          placeholder="Remember your password"
          onChange={handlePassword}
        />
        {/* Account content goes here */}
        <SignMessage password={password} />
      </>
    )
  }

  return <div>{/* Connect wallet content goes here */}</div>
}
