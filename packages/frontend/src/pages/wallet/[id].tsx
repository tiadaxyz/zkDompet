import { CreateWallet } from '@components/create'
import { HomeTopBar } from '@components/home/HomeTopBar'
import { CenterBody } from '@components/layout/CenterBody'
import { WalletComponent } from '@components/wallet'
import { fetchWallet } from '@shared/helpers'

import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import 'twin.macro'

const WalletPage: NextPage = () => {
  const router = useRouter()
  const walletId = router.query.id ? +router.query.id : 0
  const [data, setData] = useState({})

  const getData = async () => {
    const res = await fetchWallet(walletId)
    console.log(res, ' fetchWallet ')
    setData(res)
  }

  useEffect(() => {
    getData()
  }, [])

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
        <WalletComponent data={data} />
      </CenterBody>
    </>
  )
}

export default WalletPage
