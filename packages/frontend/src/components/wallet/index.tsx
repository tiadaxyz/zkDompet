import { WalletProps } from './types'
import 'twin.macro'
import { fetchWallet, getInputJsonForCircuit, supabase, updateStatus } from '@shared/helpers'
import { Button, Flex, HStack, Input, Select, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { WalletContextValue } from '@components/create/types'
import { env } from '@shared/environment'
import multisigABI from '@shared/abi/multisigwallet.json'
import forwarderABI from '@shared/abi/forwarder.json'
import { ethers } from 'ethers'
import { signMetaTxRequest } from '@shared/smartContracts'

export const WalletComponent = ({ data }: any) => {
  const Title = 'This is your wallet'
  const [msg, seMsg] = useState<string>('')
  const [privateKey, setPrivateKey] = useState<string>('')
  const [walletData, setWalletData] = useState({})
  const [value, setValue] = useState(0)
  const [method, setMethod] = useState('DEPOSIT')
  const [addressTo, setAddressTo] = useState('')
  const [proofData, setProofData] = useState({})
  const customHttpProvider = new ethers.providers.JsonRpcProvider(
    'https://matic-mumbai.chainstacklabs.com/',
  )
  console.log(customHttpProvider, 'hihi')
  const onClick = async () => {
    // const {id, created_at, threshold, status, proofs, name} = data
    // const {proof, publicSignals,input} = proofs
    // console.log(proof, publicSignals,input)
    // const calldata = await window.snarkjs.groth16.exportSolidityCallData(proof, publicSignals)
    // console.log('call smart contract', calldata)

    // const calldata = ["0x228f3654f6273b6234ae42836d79584cc05ae1ae63377d1797acc7c57903b348", "0x193919229818442294ac95dea05a14d9fe6af91f58a3e2073739cb52f1470ebd"],[["0x04765d78b91228d1446dc7f7d2c093570e809f0a8f1c53f360bf3582493920ae", "0x2046623975658da296c1d5ce8b1aa9b8939f17c32dc228b61a9e34fcc6470488"],["0x14e1e1b6baf77e1b3589cd4ea7b652040621fb85a92471c58229598ca6023eb9", "0x2fba67d13b54063e8da4b2eb304fb68ab3cf1473d4d135e87e4aae3b3e81a49a"]],["0x2557b2510acf3b78a24b6ad28a2c1d6bffe2e58d94221da7e86d64a354aa5a91", "0x0a4ec364aedcff82c9170cba08ee217cf42627e1ee8028f69f429ad99c1861aa"],["0x0000000000000000000000000000000000000000000000000000000000000001","0x0000000000000000000000000000000000000000000000002ec3b44989cb0093","0x00000000000000000000000000000000000000000000000099be3568dcc507ae","0x000000000000000000000000000000000000000000000000ade10fe38865df44","0x0000000000000000000000000000000000000000000000009b7ecc6eeb83abf9","0x304f7e195262eb4e09a76bf88f3c0e0146c55e8a8c0c37704c38a9bb51a7f9b2"]
    const multiSigInterface = new ethers.utils.Interface(multisigABI)
    const fromSigner = new ethers.Wallet(
      '910cfbc5b7d7504ed10e7e82060726678a38b1e5798e7717ae6c1d198068d10b',
    )
    const from = fromSigner.address
    const forwarderInstance = new ethers.Contract(
      env.contract.forwarder,
      forwarderABI,
      customHttpProvider,
    )
    const multiSigWalletAddress = new ethers.Contract(
      env.contract.multisig,
      multisigABI,
      customHttpProvider,
    ).address
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
    const data = multiSigInterface.encodeFunctionData('executeTransaction', [
      // proof transaction call data
      [
        '0x2f858a529883884b2a751df3f3e59ad973e93e45031859a95b924841ff8a47cd',
        '0x170c243fa23e03642f00b30bfce669275bd154965ce93bd76b58daa1ebf90569',
      ],
      [
        [
          '0x29c23a513200cf1c60e726f7351fb330762078fecceaa38d52a305fa79635360',
          '0x1078e87b7862eb0621157f2410b2f4c6c5dadb34b03e1c9a59a166ab28f86ee6',
        ],
        [
          '0x006e79abb7cbd637f0fff563d6825771fadf3aef4ed2d86fa287e2c5d0b1d77f',
          '0x2dbcf92f9caabe2c19b7d4a67f0f72881e74f921b2142ac5809cac6435735906',
        ],
      ],
      [
        '0x03df054693625be70b38e321d1bb677bccb9c7aa45d9be80cb5e4550638a8b06',
        '0x062fb5f6c67291e07b672fe0dae51c0ce786687a44393adf56520b3038c805cb',
      ],
      [
        '0x0000000000000000000000000000000000000000000000000000000000000001',
        '0x00000000000000000000000000000000000000000000000057f76ebf9af4dcaa',
        '0x00000000000000000000000000000000000000000000000027a829f96d033294',
        '0x0000000000000000000000000000000000000000000000005fc544d55cdee823',
        '0x00000000000000000000000000000000000000000000000027a84712e4b22c41',
        '0x304f7e195262eb4e09a76bf88f3c0e0146c55e8a8c0c37704c38a9bb51a7f9b2',
      ],
      // ownerHashPubKey
      '16081fc7cc32451b2ac9667bfb9815f61e5d8ac07c88db19c913742820939495',
      // normal transaction
      '0xBb0582EaD520EDE2996D62A5e44A3d86e056991B', // to
      120000000000000, // _value
      '0x00', // data
    ])

    console.log(data, 'fk what is data')
    const result = await signMetaTxRequest(
      '910cfbc5b7d7504ed10e7e82060726678a38b1e5798e7717ae6c1d198068d10b',
      forwarderInstance,
      {
        to: multiSigWalletAddress,
        from,
        data,
      },
    )
    console.log(`Signature: `, result.signature)
    console.log(`Request: `, result.request)
    const newReq = {
      data: result.request.data,
      from: result.request.from,
      gasLimit: result.request.gas,
      nonce: result.request.nonce,
      to: result.request.to,
      value: result.request.value,
    }
    console.log(`Request: `, JSON.stringify(newReq))
    const runResponse = await axios.post('https://medi0backend.spicybuilds.xyz/autotask', {
      data: newReq,
    })
    console.log(runResponse)
    // if (walletData.threshold == originalProofs.length) {
    //   console.log('call smart contract', resId)
    // }
  }
  // const getWalletData = async () => {
  //   const uploadData = await fetchWallet(walletId)
  //   setWalletData({pr})
  // }

  // useEffect(() => {
  //   // pre fetch data from server
  //   getWalletData()
  // }, [])

  const handleAddressTo = (e: any) => {
    setAddressTo(e.target.value)
  }
  const handleMethod = (e: any) => {
    setMethod(e.target.value)
  }

  const handleValue = (e: any) => {
    setValue(e.target.value)
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
          +
        </Flex>
        <Text as="b">{Title}</Text>
      </HStack>
      <HStack>
        <Input
          value={method}
          variant="filled"
          type="number"
          placeholder="Type your value"
          onChange={handleValue}
        />
        <VStack display="flex" alignItems="start">
          <Text as="b">Transaction Type</Text>
          <Select
            variant="filled"
            placeholder="select method"
            onChange={handleMethod}
            value={method}
          >
            {['DEPOSIT', 'TRANSFER', 'WITHDRAW'].map((element) => (
              <option value={element} key={element}>
                {element}
              </option>
            ))}
          </Select>
        </VStack>
        {method === 'TRANSFER' && (
          <Input
            value={addressTo}
            variant="filled"
            type="string"
            placeholder="Type your address"
            onChange={handleAddressTo}
          />
        )}
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

      {/* <VStack>
        <Flex gap={4} alignItems="flex-start" width="100%">
          <Text as="b">Network</Text>
          <Text>{walletData.network}</Text>
        </Flex>
        <Flex gap={4} alignItems="flex-start" width="100%">
          <Text as="b">Name</Text>
          <Text>{walletData.name}</Text>
        </Flex>
        <Flex gap={4} alignItems="flex-start" width="100%">
          <Text as="b">Owners</Text>
          <Text>
            {walletData.owners.map((owner) => (
              <Text key={owner.address}>{owner.address}</Text>
            ))}
          </Text>
        </Flex>
        <Flex gap={4} alignItems="flex-start" width="100%">
          <Text as="b">Threshold</Text>
          <Text>
            {walletData.threshold} out of {walletData.owners.length} owner(s)
          </Text>
        </Flex>
      </VStack> */}

      {/* <Input
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
      /> */}
      <Button onClick={onClick}>Make Proof</Button>
    </>
  )
}
