import { Box, Button, Flex, HStack, Input, Select, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { FC, useState } from 'react'
import { HiOutlineExternalLink } from 'react-icons/hi'
import 'twin.macro'
import { SetNameStepProps, WalletContextValue } from '../types'

export const SetNameStep = ({ handleInput, walletData, step }: SetNameStepProps) => {
  const Title = 'Set Name and select network your ZK Dompet'
  const [walletInput, setWalletInput] = useState<WalletContextValue>({
    name: walletData.name,
    network: walletData.network,
    owners: walletData.owners,
    threshold: walletData.threshold,
  })

  const handleNetwork = (e: any) => {
    const copy = { ...walletInput }
    copy.network = e.target.value
    setWalletInput(copy)
  }

  const handleName = (e: any) => {
    const copy = { ...walletInput }
    copy.name = e.target.value
    setWalletInput(copy)
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
        value={walletInput.name}
        variant="filled"
        type="text"
        placeholder="example-wallet-name"
        onChange={handleName}
      />
      <Select
        variant="filled"
        placeholder="select network"
        onChange={handleNetwork}
        value={walletInput.network}
      >
        <option value="ETH" key={0}>
          Ethereum
        </option>
        <option value="GOERLI" key={1}>
          Goerli
        </option>
      </Select>
      <Button onClick={(e) => handleInput(walletInput)}>Next</Button>
    </>
  )
}
