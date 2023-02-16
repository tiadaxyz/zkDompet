import { WalletProps } from './types'
import 'twin.macro'
import { fetchWallet, getInputJsonForCircuit, supabase, updateStatus } from '@shared/helpers'
import { Button, Flex, HStack, Input, Select, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { WalletContextValue } from '@components/create/types'

export const WalletComponent = ({ walletId }: WalletProps) => {
  const Title = 'This is your wallet'
  const [msg, seMsg] = useState<string>('')
  const [privateKey, setPrivateKey] = useState<string>('')
  const [walletData, setWalletData] = useState({})
  const [value, setValue] = useState(0)
  const [method, setMethod] = useState('DEPOSIT')
  const [addressTo, setAddressTo] = useState('')
  const [proofData, setProofData] = useState({})

  const onClick = async () => {
    const { proof, publicSignals } = await getInputJsonForCircuit(privateKey, msg)
    console.log(proof, publicSignals)
    const calldata = await window.snarkjs.groth16.exportSolidityCallData(proof, publicSignals)
    console.log('call smart contract', calldata)

    // if (walletData.threshold == originalProofs.length) {
    //   console.log('call smart contract', resId)
    // }
  }
  // const getWalletData = async () => {
  //   const uploadData = await fetchWallet(walletId)
  //   setWalletData({pr})
  // }

  // useEffect(() => {
  //   // pre fetch data from server
  //   getWalletData()
  // }, [])

  const handleAddressTo = (e: any) => {
    setAddressTo(e.target.value)
  }
  const handleMethod = (e: any) => {
    setMethod(e.target.value)
  }

  const handleValue = (e: any) => {
    setValue(e.target.value)
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
          +
        </Flex>
        <Text as="b">{Title}</Text>
      </HStack>
      <HStack>
        <Input
          value={method}
          variant="filled"
          type="number"
          placeholder="Type your value"
          onChange={handleValue}
        />
        <VStack display="flex" alignItems="start">
          <Text as="b">Transaction Type</Text>
          <Select
            variant="filled"
            placeholder="select method"
            onChange={handleMethod}
            value={method}
          >
            {['DEPOSIT', 'TRANSFER', 'WITHDRAW'].map((element) => (
              <option value={element} key={element}>
                {element}
              </option>
            ))}
          </Select>
        </VStack>
        {method === 'TRANSFER' && (
          <Input
            value={addressTo}
            variant="filled"
            type="string"
            placeholder="Type your address"
            onChange={handleAddressTo}
          />
        )}
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

      {/* <Input
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
      /> */}
      <Button onClick={onClick}>Make Proof</Button>
    </>
  )
}
