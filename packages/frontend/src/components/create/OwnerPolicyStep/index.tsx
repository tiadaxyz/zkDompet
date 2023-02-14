import { useState } from 'react'
import 'twin.macro'
import { OwnerPolicyProps, WalletContextValue } from '../types'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react'
import { numberRange } from '@shared/helpers'

export const OwnerPolicyStep = ({ handleInput, walletData, step }: OwnerPolicyProps) => {
  const Title = 'Owners and confirmations'
  const [walletInput, setWalletInput] = useState<WalletContextValue>({
    name: walletData.name,
    network: walletData.network,
    owners: walletData.owners,
    threshold: walletData.threshold,
  })
  const [tempOwners, setTempOwners] = useState([
    {
      name: '',
      address: '',
    },
  ])

  const handleOwnerName = async (e: any, id: number) => {
    const copyOwners = [...tempOwners]
    const copyOwner = { ...tempOwners[id] }
    copyOwner.name = e.target.value
    copyOwners[id] = copyOwner
    setTempOwners(copyOwners)
    const copyWallet = walletInput
    copyWallet.owners = copyOwners
    setWalletInput(copyWallet)
  }

  const handleOwnerAddress = (e: any, id: number) => {
    const copyOwners = [...tempOwners]
    const copyOwner = { ...tempOwners[id] }
    copyOwner.address = e.target.value
    copyOwners[id] = copyOwner
    setTempOwners(copyOwners)
    const copyWallet = walletInput
    copyWallet.owners = copyOwners
    setWalletInput(copyWallet)
  }

  const addOwner = () => {
    const newOwner = {
      name: '',
      address: '',
    }
    setTempOwners((prev) => [...prev, newOwner])
    const copyWallet = walletInput
    copyWallet.owners = [...tempOwners, newOwner]
    setWalletInput(copyWallet)
  }
  const delOwner = (id: number) => {
    const copyOwners = [...tempOwners]
    copyOwners.splice(id - 1, 1)
    console.log(copyOwners)
    setTempOwners(copyOwners)
    const copyWallet = walletInput
    copyWallet.owners = copyOwners
    setWalletInput(copyWallet)
  }
  const handleThreshold = (e: any) => {
    const copy = { ...walletInput }
    copy.threshold = e.target.value
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
      <FormControl gap={3}>
        {tempOwners.map((owner) => {
          const id = tempOwners.indexOf(owner)
          return (
            <HStack key={id}>
              <Flex gap={3}>
                <Flex flexDirection="column" justifyContent="space-between" width="100%">
                  <FormHelperText>Name</FormHelperText>
                  <Input
                    value={owner.name}
                    variant="filled"
                    type="text"
                    placeholder="Owner"
                    onChange={(e) => handleOwnerName(e, id)}
                  />
                </Flex>
                <Flex flexDirection="column" justifyContent="space-between" width="100%">
                  <FormHelperText>Address</FormHelperText>
                  <Input
                    value={owner.address}
                    variant="filled"
                    type="text"
                    placeholder="Owner address or ENS"
                    onChange={(e) => handleOwnerAddress(e, id)}
                  />
                </Flex>
                <Flex justifyContent="center" alignItems="end">
                  {id !== 0 && <Button onClick={() => delOwner(id)}>del</Button>}
                </Flex>
              </Flex>
            </HStack>
          )
        })}
        <Button onClick={addOwner}>Add new owner</Button>
      </FormControl>
      <VStack display="flex" alignItems="start">
        <Text as="b">Threshold</Text>
        <Select
          variant="filled"
          placeholder="select threshold"
          onChange={handleThreshold}
          value={walletInput.threshold}
        >
          {numberRange(0, walletInput.owners.length).map((element) => (
            <option value={element + 1} key={element + 1}>
              {element + 1}
            </option>
          ))}
        </Select>
      </VStack>

      <Button onClick={() => handleInput(walletInput)}>Next</Button>
    </>
  )
}
