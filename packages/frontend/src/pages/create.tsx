import { HomeTopBar } from '@components/home/HomeTopBar'
import { CenterBody } from '@components/layout/CenterBody'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import 'twin.macro'

const CreatePage: NextPage = () => {
  return (
    <>
      {/* Top Bar */}
      <HomeTopBar />

      <CenterBody tw="mt-20 mb-10 px-5">
        {/* Title */}

        {/* Rainbowkit Connect Button */}
        <ConnectButton />
      </CenterBody>
    </>
  )
}

export default CreatePage
