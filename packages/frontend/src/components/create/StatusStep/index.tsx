import { useState } from 'react'
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi'
import 'twin.macro'
import { SignMessageaProps, StatusStepProps } from '../types'
import { Flex, HStack, Input, Text } from '@chakra-ui/react'
import { inputsToInput } from '@shared/helpers'

export const SignMessage = ({ password, privateKey }: SignMessageaProps) => {
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: password,
  })

  console.log(data, data?.length)
  console.log(inputsToInput(data, privateKey))

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
  const [privateKey, setPrivateKey] = useState<string>('')

  const handlePassword = (e: any) => {
    setPassword(e.target.value)
  }

  const hadlePrivateKey = (e: any) => {
    setPrivateKey(e.target.value)
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

        <Input
          value={privateKey}
          variant="filled"
          type="text"
          placeholder="Type your private key, we will not store it"
          onChange={hadlePrivateKey}
        />
        {/* Account content goes here */}
        <SignMessage password={password} privateKey={privateKey} />
      </>
    )
  }

  return <div>{/* Connect wallet content goes here */}</div>
}
