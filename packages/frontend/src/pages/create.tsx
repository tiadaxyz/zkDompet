import { CreateWallet } from '@components/create'
import { HomeTopBar } from '@components/home/HomeTopBar'
import { CenterBody } from '@components/layout/CenterBody'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import Head from 'next/head'
import 'twin.macro'

const CreatePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Wallet</title>
      </Head>
      {/* Top Bar */}
      <HomeTopBar />

      <CenterBody tw="mt-20 mb-10 px-5">
        {/* Title */}

        {/* Rainbowkit Connect Button */}
        <CreateWallet />
      </CenterBody>
    </>
  )
}

export default CreatePage
