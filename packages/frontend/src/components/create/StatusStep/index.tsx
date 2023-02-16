import { useState } from 'react'
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi'
import 'twin.macro'
import { SignMessageProps, StatusStepProps } from '../types'
import { Flex, HStack, Input, Text } from '@chakra-ui/react'
import { generateProof, getInputJsonForCircuit, hexToDecimal, supabase } from '@shared/helpers'
import { hashCircuit, mainCircuit } from '@shared/zkproof'

export const StatusStep = ({ handleInput, walletData, step }: StatusStepProps) => {
  const Title = 'Follow the step for ZK'
  const { data, isError, isLoading, signMessage } = useSignMessage({
    message: '',
  })
  const { address } = useAccount()
  const [privateKey, setPrivateKey] = useState<string>('')
  const [msg, seMsg] = useState<string>('')
  const proofs: string[] = []
  const status = 0
  const threshold = walletData.threshold

  const uploadServer = async (proofs: any) => {
    try {
      //send input to Circom and get Proof from Wasm file

      const { data: uploadData, error: uploadError } = await supabase
        .from('wallets')
        .insert({ proofs, threshold, status })
        .select()

      if (uploadError) {
        throw uploadError
      }
      console.log(uploadData, uploadError)

      if (uploadData) {
        const fetchedWalletId = uploadData[0].id
      }

      return uploadData
      //if threshold is enough, you have to call contract
    } catch (error) {
      alert('Error uploading avatar!')
      console.log(error)
    }
  }

  //main function logic
  const handleClick = async () => {
    const { proof, publicSignals } = await getInputJsonForCircuit(privateKey, msg)
    console.log(proof, publicSignals)
    // put them in server
    // const uploadData = res
    // if (threshold == 1) {
    // }

    // if threshold is 1, change status to 1 and call smartcontract
  }

  const handlePrivateKey = (e: any) => {
    setPrivateKey(e.target.value)
  }

  const handleMessage = (e: any) => {
    seMsg(e.target.value)
  }

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
        value={privateKey}
        variant="filled"
        type="text"
        placeholder="Type your private key, we will not store it"
        onChange={handlePrivateKey}
      />

      <Input
        value={msg}
        variant="filled"
        type="text"
        placeholder="Message"
        onChange={handleMessage}
      />
      <button onClick={handleClick}>Submit</button>
    </>
  )
}
