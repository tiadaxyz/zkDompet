import { CreateWallet } from '@components/create'
import { HomeTopBar } from '@components/home/HomeTopBar'
import { CenterBody } from '@components/layout/CenterBody'
import { WalletComponent } from '@components/wallet'

import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import 'twin.macro'

const WalletPage: NextPage = () => {
  const router = useRouter()
  const walletId = router.query.id ? +router.query.id : 0

  return (
    <>
      <Head>
        <title>Wallet number {walletId}</title>
      </Head>
      {/* Top Bar */}
      <HomeTopBar />

      <CenterBody tw="mt-20 mb-10 px-5">
        {/* Title */}

        {/* Rainbowkit Connect Button */}
        <WalletComponent walletId={walletId} />
      </CenterBody>
    </>
  )
}

export default WalletPage
