import Image from 'next/image'
import Link from 'next/link'
import githubIcon from 'public/icons/github.svg'
import vercelIcon from 'public/icons/vercel.svg'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { FC, useEffect } from 'react'
import 'twin.macro'
import { useRouter } from 'next/router'

export const NewWallet: FC = () => {
  const { isConnected } = useAccount()
  const router = useRouter()
  const title = 'ZK Dompet'
  const desc = 'Welcome to the ZK Dompet'
  const githubHref = 'https://github.com/scio-labs/ethathon'
  const deployHref = 'https://github.com/scio-labs/ethathon#deployment'

  const onClick = () => {
    router.push('/create')
  }

  return (
    <>
      <div tw="flex flex-col items-center text-center font-mono">
        <h1>{title}</h1>
        <p>{desc}</p>
        <ConnectButton />
        <button onClick={onClick}>Create ZK Dumpet</button>
      </div>
    </>
  )
}
