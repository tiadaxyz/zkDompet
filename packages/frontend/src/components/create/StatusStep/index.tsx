import { useState } from 'react'
import 'twin.macro'
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

  const { isOpen, onOpen, onClose } = useDisclosure()

  //main function logic
  const handleClick = async () => {
    onOpen()
    const { proof, publicSignals } = await getInputJsonForCircuit(privateKey, msg)
    console.log(proof, publicSignals)
    // put them in server
    // const resId = await uploadServer([{ proof, publicSignals }], walletData)
    // setWalletId(resId)
    if (walletData.threshold == 1) {
      const calldata = await window.snarkjs.groth16.exportSolidityCallData(proof, publicSignals)
      console.log('call smart contract', calldata)
    }
    setIsSuccess(true)
    //   router.push('/wallet/' + resId)
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
