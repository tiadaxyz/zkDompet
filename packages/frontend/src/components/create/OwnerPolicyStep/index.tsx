import { useState } from 'react'
import 'twin.macro'
import { OwnerPolicyProps, WalletContextValue } from '../types'
import { Box, Button, HStack, Input, Select } from '@chakra-ui/react'
import { numberRange } from '@shared/helpers'

export const OwnerPolicyStep = ({ handleInput, walletData }: OwnerPolicyProps) => {
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
    const idx = tempOwners.length + 1
    const newOwner = {
      id: idx,
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
      <div>Owner Policy Step</div>
      <Box>
        {tempOwners.map((owner) => {
          const id = tempOwners.indexOf(owner)
          return (
            <HStack key={id}>
              <Input
                value={owner.name}
                variant="filled"
                type="text"
                placeholder="Owner"
                onChange={(e) => handleOwnerName(e, id)}
              />
              <Input
                value={owner.address}
                variant="filled"
                type="text"
                placeholder="Owner address or ENS"
                onChange={(e) => handleOwnerAddress(e, id)}
              />
              {id !== 0 && <Button onClick={() => delOwner(id)}>del</Button>}
            </HStack>
          )
        })}
        <Button onClick={addOwner}>Add new owner</Button>
      </Box>
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
      <Button onClick={(e) => handleInput(walletInput)}>Next</Button>
    </>
  )
}
