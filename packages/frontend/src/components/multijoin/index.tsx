import { MultiJoinProps } from './types'
import 'twin.macro'
import { fetchWallet, getInputJsonForCircuit, supabase, updateStatus } from '@shared/helpers'
import { Flex, HStack, Input, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { WalletContextValue } from '@components/create/types'

export const MultiJoin = ({ walletId }: MultiJoinProps) => {
  const Title = 'Sign for make a multi-sig wallet'
  const [msg, seMsg] = useState<string>('')
  const [privateKey, setPrivateKey] = useState<string>('')
  const [walletData, setWalletData] = useState({})

  const onClick = async () => {
    const { proof, publicSignals } = await getInputJsonForCircuit(privateKey, msg)
    console.log(proof, publicSignals)
    // put them in server
    const originalProofs = []
    originalProofs.push(proof)
    const resId = await updateStatus(originalProofs, walletId)

    // if (walletData.threshold == originalProofs.length) {
    //   console.log('call smart contract', resId)
    // }
  }

  // useEffect(async () => {
  //   // pre fetch data from server
  //   const uploadData = await fetchWallet(walletId)
  //   setWalletData(uploadData)
  // }, [])
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
          +
        </Flex>
        <Text as="b">{Title}</Text>
      </HStack>
      {/* <VStack>
        <Flex gap={4} alignItems="flex-start" width="100%">
          <Text as="b">Network</Text>
          <Text>{walletData.network}</Text>
        </Flex>
        <Flex gap={4} alignItems="flex-start" width="100%">
          <Text as="b">Name</Text>
          <Text>{walletData.name}</Text>
        </Flex>
        <Flex gap={4} alignItems="flex-start" width="100%">
          <Text as="b">Owners</Text>
          <Text>
            {walletData.owners.map((owner) => (
              <Text key={owner.address}>{owner.address}</Text>
            ))}
          </Text>
        </Flex>
        <Flex gap={4} alignItems="flex-start" width="100%">
          <Text as="b">Threshold</Text>
          <Text>
            {walletData.threshold} out of {walletData.owners.length} owner(s)
          </Text>
        </Flex>
      </VStack> */}

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
      <button onClick={onClick}>Make Proof</button>
    </>
  )
}
