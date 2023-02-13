import { Button, Input, Select } from '@chakra-ui/react'
import Link from 'next/link'
import { FC, useState } from 'react'
import { HiOutlineExternalLink } from 'react-icons/hi'
import 'twin.macro'
import { SetNameStepProps, WalletContextValue } from '../types'

export const SetNameStep = ({ handleInput, walletData }: SetNameStepProps) => {
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
      <div>SetNameStep</div>
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
