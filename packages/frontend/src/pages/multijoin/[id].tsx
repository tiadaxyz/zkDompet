import { CreateWallet } from '@components/create'
import { HomeTopBar } from '@components/home/HomeTopBar'
import { CenterBody } from '@components/layout/CenterBody'
import { MultiJoin } from '@components/multijoin'

import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import 'twin.macro'

const MultiJoinPage: NextPage = () => {
  const router = useRouter()
  const walletId = router.query.id ? +router.query.id : 0

  return (
    <>
      <Head>
        <title>Multi Join</title>
      </Head>
      {/* Top Bar */}
      <HomeTopBar />

      <CenterBody tw="mt-20 mb-10 px-5">
        {/* Title */}

        {/* Rainbowkit Connect Button */}
        <MultiJoin walletId={walletId} />
      </CenterBody>
    </>
  )
}

export default MultiJoinPage
