import Link from 'next/link'
import { FC, useState } from 'react'
import { HiOutlineExternalLink } from 'react-icons/hi'
import { NamedAddress, WalletContextValue } from './types'
import type { primary } from '@constants/colors'
import 'twin.macro'
import { useRouter } from 'next/router'
import { Button, Container, Flex, Grid, Progress } from '@chakra-ui/react'
import { SetNameStep } from './SetNameStep'
import { OwnerPolicyStep } from './OwnerPolicyStep'
import { ReviewStep } from './ReviewStep'
import { StatusStep } from './StatusStep'
import { BaseLayout } from '@components/layout/BaseLayout'

export const CreateWallet: FC = () => {
  const [step, setStep] = useState(0)
  const [wallet, setWallet] = useState<WalletContextValue>({
    name: '',
    network: '',
    owners: [
      {
        name: '',
        address: '',
      },
    ],
    threshold: 0,
  })
  const handleInput = (walletInput: WalletContextValue) => {
    console.log(walletInput, 'walletInput')
    setWallet(walletInput)
    setStep(step + 1)
  }

  const StepContent = (step: number) => {
    switch (step) {
      case 0:
        return <SetNameStep handleInput={handleInput} walletData={wallet} step={step} />
      case 1:
        return <OwnerPolicyStep handleInput={handleInput} walletData={wallet} step={step} />
      case 2:
        return <ReviewStep handleInput={handleInput} walletData={wallet} step={step} />
      case 3:
        return <StatusStep />
    }
  }
  return (
    <>
      <Flex gap={3} width="70%" flexDirection="column" justifyContent="center">
        <Progress colorScheme="green" size="sm" value={step * 25 + 25} />
        {StepContent(step)}
      </Flex>
    </>
  )
}
