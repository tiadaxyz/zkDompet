import { useState } from 'react'
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi'
import 'twin.macro'
import { SignMessageProps, StatusStepProps } from '../types'
import { Flex, HStack, Input, Text } from '@chakra-ui/react'
import { inputsToInput, supabase } from '@shared/helpers'
import { hashCircuit, mainCircuit } from '@shared/zkproof'

export const StatusStep = ({ handleInput, walletData, step }: StatusStepProps) => {
  const { data, isError, isLoading, signMessage } = useSignMessage({
    message: '',
  })
  const { address } = useAccount()
  const [privateKey, setPrivateKey] = useState<string>('')
  const proofs: string[] = []
  const status = 0
  const threshold = walletData.threshold

  //main function logic
  const handleClick = async () => {
    // get Signature and PrivateKey
    //
    const { signitureR, signitureS, ownerPrivKey } = inputsToInput(data, privateKey)
    // get hashed address
    const { wasmFile, zkeyFile, verificationKey } = hashCircuit()
    const hashEthAddress = getHashAddress(address, wasmFile, zkeyFile)
    // make one input
    const inputJson = {
      signitureR,
      signitureS,
      transactionCallData: 'wtf',
      hashEthAddress,
      ownerPrivKey,
    }

    // call main circom
    const { wasmFile_m, zkeyFile_m, verificationKey_m } = mainCircuit()
    // get final proof
    const res = generateProof(inputJson, wasmFile_m, zkeyFile_m)
    // put them in server
    const uploadData = serverLogic(res)
    // if threshold is 1, change status to 1 and call smartcontract
  }

  // 1. ecdsa-sign -> signitureR, signiture S
  // const getSignature = async (data: any) => {
  //  const signature = await ethereum.request({ method: 'eth_sign', params: [accounts[0], messageHash] });
  // console.log(signature);
  //   return { proof, publicSignals }
  // }

  // 2. poseidon hash circuit -> hash(address)
  const getHashAddress = async (_proofInput: any, _wasm: string, _zkey: string) => {
    const { proof, publicSignals } = await window.snarkjs.groth16.fullProve(
      _proofInput,
      _wasm,
      _zkey,
    )
    return { proof, publicSignals }
  }

  // 3. main circuit : {signitureR, signiture S, transactionCallData, hash(address), privatekey} -> final_proof
  const generateProof = async (_proofInput: any, _wasm: string, _zkey: string) => {
    const { proof, publicSignals } = await window.snarkjs.groth16.fullProve(
      _proofInput,
      _wasm,
      _zkey,
    )
    return { proof, publicSignals }
  }

  const verifyProof = async (_verificationkey: string, signals: string, proof: string) => {
    const vkey = await fetch(_verificationkey).then(function (res) {
      return res.json()
    })

    const res = await window.snarkjs.groth16.verify(vkey, signals, proof)
    return res
  }

  const [walletId, setWalletId] = useState(0)

  console.log(data, data?.length)
  console.log(inputsToInput(data, privateKey))
  // create signiture and get hash address

  const serverLogic = async (proof: any) => {
    proofs.push(proof)
    const uploadData = await uploadStatus(proofs)
    return uploadData
  }

  //send input to Circom and get Proof from Wasm file

  //send initial to backend
  const uploadStatus = async (proofs: any) => {
    try {
      const { data: uploadData, error: uploadError } = await supabase
        .from('wallets')
        .insert({ status, proofs, threshold })
        .select()

      if (uploadError) {
        throw uploadError
      }
      console.log(uploadData, uploadError)

      if (uploadData) {
        const fetchedWalletId = uploadData[0].id
        setWalletId(fetchedWalletId)
      }

      return uploadData
      //if threshold is enough, you have to call contract
    } catch (error) {
      alert('Error uploading avatar!')
      console.log(error)
    }
  }

  const hadlePrivateKey = (e: any) => {
    setPrivateKey(e.target.value)
  }
  return (
    <>
      <h1 className="text-3xl font-bold underline text-[red]">Hello world!</h1>
      <Input
        value={privateKey}
        variant="filled"
        type="text"
        placeholder="Type your private key, we will not store it"
        onChange={hadlePrivateKey}
      />
      <button onClick={handleClick}>Submit</button>
    </>
  )
}
