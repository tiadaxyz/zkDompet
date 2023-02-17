import { useState } from 'react'
import 'twin.macro'
import { useSigner } from 'wagmi'
import { StatusStepProps } from '../types'
import {
  Button,
  Flex,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { getInputJsonForCircuit, uploadServer } from '@shared/helpers'
import { useRouter } from 'next/router'
import { useContract } from 'wagmi'
import { env } from '@shared/environment'
import multisigABI from '@shared/abi/multisigwallet.json'
import forwarderABI from '@shared/abi/forwarder.json'
import { ethers } from 'ethers'
import { signMetaTxRequest } from '@shared/smartContracts'
import { stringify } from 'querystring'
import { autotaskJob } from '@pages/api/autotask'

export const StatusStep = ({ handleInput, walletData, step }: StatusStepProps) => {
  const Title = 'Follow the step for ZK'
  // const { data, isError, isLoading, signMessage } = useSignMessage({
  //   message: '',
  // })
  // const { address } = useAccount()
  const router = useRouter()
  const [privateKey, setPrivateKey] = useState<string>('')
  const [walletId, setWalletId] = useState<number>(0)
  const [msg, seMsg] = useState<string>('')
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  // const { data: signer, isError, isLoading } = useSigner()
  // const multiWalletContract = useContract({
  //   address: env.contract.multiwallet,
  //   abi: multisigABI,
  // })

  // const forwarderContract = useContract({
  //   address: env.contract.forwarder,
  //   abi: forwarderABI,
  // })

  const { isOpen, onOpen, onClose } = useDisclosure()

  //main function logic
  const handleClick = async () => {
    onOpen()
    const { proof, publicSignals, input } = await getInputJsonForCircuit(privateKey, msg)
    console.log(proof, publicSignals, input)
    // put them in server
    const resId = await uploadServer([{ proof, publicSignals, input }], walletData)
    setWalletId(resId)
    if (walletData.threshold == 1) {
      const calldata = await window.snarkjs.groth16.exportSolidityCallData(proof, publicSignals)
      console.log('call smart contract', calldata)

      //contract
      const multiSigInterface = new ethers.utils.Interface(multisigABI)
      const fromSigner = new ethers.Wallet(privateKey)
      const from = fromSigner.address
      const forwarderInstance = new ethers.Contract(
        env.contract.forwarder,
        forwarderABI,
        fromSigner,
      )
      const multiSigWalletAddress = new ethers.Contract(
        env.contract.multisig,
        multisigABI,
        fromSigner,
      ).address
      const data = multiSigInterface.encodeFunctionData('executeTransaction', [
        calldata, //
        // 1, //_txIndexxzzz
        1,
      ])
      console.log(data, 'what is data')
      console.log(
        multiSigInterface,
        fromSigner,
        from,
        forwarderInstance,
        multiSigWalletAddress,
        env.contract.multisig,
        env.contract.forwarder,
        'check everything',
      )
      const result = await signMetaTxRequest(privateKey, forwarderInstance, {
        to: multiSigWalletAddress,
        from,
        data,
      })
      console.log(`Signature: `, result.signature)
      console.log(`Request: `, JSON.stringify(result.request))
      const runResponse = await autotaskJob(JSON.stringify(result.request))
      console.log(runResponse)
    }

    setIsSuccess(true)
    router.push('/wallet/' + resId)
  }

  const handlePrivateKey = (e: any) => {
    setPrivateKey(e.target.value)
  }

  const handleMessage = (e: any) => {
    seMsg(e.target.value)
  }

  return (
    <>
      <HStack>
        <Flex
          alignItems="center"
          justifyContent="center"
          borderRadius="full"
          background="white"
          width="25px"
          color="black"
          as="b"
        >
          {step + 1}
        </Flex>
        <Text as="b">{Title}</Text>
      </HStack>

      <Input
        value={privateKey}
        variant="filled"
        type="text"
        placeholder="Type your private key, we will not store it"
        onChange={handlePrivateKey}
      />

      <Input
        value={msg}
        variant="filled"
        type="text"
        placeholder="Message"
        onChange={handleMessage}
      />
      <VStack>
        <Button onClick={handleClick}>Submit</Button>
        {walletId !== 0 && (
          <Button onClick={() => router.push('/multijoin/' + walletId)}>
            Send This link To other members
          </Button>
        )}
      </VStack>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>

          <ModalBody pb={6}>
            <Text>
              {isSuccess ? 'Done!' : 'Generating Proofs... Do not close the tab until finish'}
            </Text>
          </ModalBody>
          {isSuccess && (
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                OK
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
