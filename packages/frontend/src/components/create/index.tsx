import Link from 'next/link'
import { FC, useState } from 'react'
import { HiOutlineExternalLink } from 'react-icons/hi'
import { NamedAddress } from './types'
import type { primary } from '@constants/colors'
import 'twin.macro'
import { useRouter } from 'next/router'
import { Button, Container, Grid } from '@chakra-ui/react'
import { SetNameStep } from './SetNameStep/indesx'
import { OwnerPolicyStep } from './OwnerPolicyStep'
import { ReviewStep } from './ReviewStep'
import { StatusStep } from './StatusStep'
import { BaseLayout } from '@components/layout/BaseLayout'

export const CreateWallet: FC = () => {
  const [step, setStep] = useState(0)

  const onClick = () => {
    setStep(step + 1)
  }

  const StepContent = (step: number) => {
    switch (step) {
      case 0:
        return <SetNameStep />
      case 1:
        return <OwnerPolicyStep />
      case 2:
        return <ReviewStep />
      case 3:
        return <StatusStep />
    }
  }
  return (
    <div>
      <BaseLayout>{StepContent(step)}</BaseLayout>
      <Button onClick={onClick}>Next</Button>
    </div>
  )
}
