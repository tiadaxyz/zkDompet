import type { BigNumber, Wallet } from 'ethers'

export type NamedAddress = {
  name: string
  address: string
  ens?: string
}

// TODO: Split this type up for create and add safe since NamedAddress only makes sense when adding a safe
export type SafeFormData = NamedAddress & {
  threshold: number
  owners: NamedAddress[]
}

export type PendingSafeTx = {
  data: string
  from: string
  nonce: number
  to: string
  value: BigNumber
  startBlock: number
}

export type PendingSafeData = SafeFormData & {
  txHash?: string
  tx?: PendingSafeTx
  safeAddress?: string
  saltNonce: number
}

export type PendingSafeByChain = Record<string, PendingSafeData | undefined>

export interface Owner {
  name: string
  address: string
}

export interface WalletContextValue {
  name: string
  network: string
  owners: Owner[]
  threshold: number
}

export interface WalletDB {
  id: number
  created_at: Date
  proofs: string[]
  threshold: number
  status: number
}
export interface SetNameStepProps {
  handleInput: (...arg: any[]) => void
  walletData: WalletContextValue
  step: number
}

export interface OwnerPolicyProps {
  handleInput: (...arg: any[]) => void
  walletData: WalletContextValue
  step: number
}

export interface ReviewStepProps {
  handleInput: (...arg: any[]) => void
  walletData: WalletContextValue
  step: number
}

export interface StatusStepProps {
  handleInput: (...arg: any[]) => void
  walletData: WalletContextValue
  step: number
}

export interface SignMessageProps {
  password: string
  privateKey: string
  walletData: WalletContextValue
}
