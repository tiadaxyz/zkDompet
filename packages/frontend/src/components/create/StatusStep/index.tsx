import { useState } from 'react'
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi'
import 'twin.macro'
import { SignMessageProps, StatusStepProps } from '../types'
import { Flex, HStack, Input, Text } from '@chakra-ui/react'
import { inputsToInput, supabase } from '@shared/helpers'

export const SignMessage = ({ password, privateKey, walletData }: SignMessageProps) => {
  const { data, isError, isLoading, signMessage } = useSignMessage({
    message: password,
  })

  const [walletId, setWalletId] = useState(0)

  console.log(data, data?.length)
  console.log(inputsToInput(data, privateKey))
  // create signiture and get hash address

  //send input to Circom and get Proof from Wasm file
  const proof1 = 'proof1'
  const proofs: string[] = []
  proofs.push(proof1)

  const status = 0
  const threshold = walletData.threshold

  const onClick = async () => {
    const res = await uploadStatus()
  }

  //send initial to backend
  const uploadStatus = async () => {
    try {
      const { data: uploadData, error: uploadError } = await supabase
        .from('wallets')
        .insert({ status, proofs, threshold })
        .select()

      if (uploadError) {
        throw uploadError
      }
      console.log(uploadData, uploadError)

      if (uploadData) {
        const fetchedWalletId = uploadData[0].id
        setWalletId(fetchedWalletId)
      }

      return uploadData
      //if threshold is enough, you have to call contract
    } catch (error) {
      alert('Error uploading avatar!')
      console.log(error)
    }
  }

  return (
    <>
      <button disabled={isLoading} onClick={onClick}>
        Sign message
      </button>
      {walletId !== 0 && <Text>/multijoin/{walletId}</Text>}
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
        <SignMessage password={password} privateKey={privateKey} walletData={walletData} />
      </>
    )
  }

  return <div>{/* Connect wallet content goes here */}</div>
}
