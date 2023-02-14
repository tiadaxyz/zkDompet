import Image from 'next/image'
import Link from 'next/link'
import githubIcon from 'public/icons/github.svg'
import vercelIcon from 'public/icons/vercel.svg'
import { FC } from 'react'
import 'twin.macro'

export const StatusStep: FC = () => {
  const title = 'ETHathon'
  const desc = 'EVM-based Smart Contract & DApp Development Boilerplate'
  const githubHref = 'https://github.com/scio-labs/ethathon'
  const deployHref = 'https://github.com/scio-labs/ethathon#deployment'

  return (
    <>
      <div tw="flex flex-col items-center text-center font-mono">Status Step</div>
    </>
  )
}
