import { MultiJoinProps } from './types'
import 'twin.macro'
import { supabase } from '@shared/helpers'

export const MultiJoin = ({ walletId }: MultiJoinProps) => {
  const onClick = async () => {
    const proofs = await fetchWallet(walletId)
    const proof2 = 'proof2'
    proofs.push(proof2)
    await updateStatus(proofs)
  }

  //fetch backend first
  const fetchWallet = async (walletId: number) => {
    try {
      const { data: uploadData, error: uploadError } = await supabase
        .from('wallets')
        .select()
        .eq('id', walletId)

      if (uploadError) {
        throw uploadError
      }
      console.log(uploadData, uploadError)

      if (uploadData) {
        return uploadData[0].proofs
      }

      //if threshold is enough, you have to call contract
    } catch (error) {
      alert('Error uploading avatar!')
      console.log(error)
    }
  }

  //send initial to backend
  const updateStatus = async (proofs: any) => {
    try {
      //send input to Circom and get Proof from Wasm file

      const { data: uploadData, error: uploadError } = await supabase
        .from('wallets')
        .update({ proofs })
        .eq('id', walletId)
        .select()

      if (uploadError) {
        throw uploadError
      }
      console.log(uploadData, uploadError)

      if (uploadData) {
        const fetchedWalletId = uploadData[0].id
      }

      return uploadData
      //if threshold is enough, you have to call contract
    } catch (error) {
      alert('Error uploading avatar!')
      console.log(error)
    }
  }

  return (
    <>
      <button onClick={onClick}>Sign message</button>
    </>
  )
}
