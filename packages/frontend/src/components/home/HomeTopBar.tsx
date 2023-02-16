import Link from 'next/link'
import { FC } from 'react'
import { HiOutlineExternalLink } from 'react-icons/hi'
import 'twin.macro'

export const HomeTopBar: FC = () => {
  const title = 'ETH KL Mini Hack'
  const desc = 'ZK Dompet v0'
  const href = 'https://github.com/lepak0/zkDompet'

  return (
    <>
      <Link
        href={href}
        tw="absolute top-0 left-0 right-0 z-10 flex items-center justify-center whitespace-pre-wrap bg-gray-900 py-2 px-2 text-center font-semibold text-sm text-white/75 hover:text-white"
      >
        <div tw="font-bold">{title}</div>
        <div tw="hidden sm:inline"> – {desc}</div>
        <HiOutlineExternalLink tw="ml-1.5" />
      </Link>
    </>
  )
}
