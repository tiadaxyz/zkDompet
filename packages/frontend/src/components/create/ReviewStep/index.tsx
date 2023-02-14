import Image from 'next/image'
import Link from 'next/link'
import githubIcon from 'public/icons/github.svg'
import vercelIcon from 'public/icons/vercel.svg'
import { FC, useState } from 'react'
import 'twin.macro'
import { ReviewStepProps, WalletContextValue } from '../types'
import { Button, Flex, HStack, Text, VStack } from '@chakra-ui/react'

export const ReviewStep = ({ handleInput, walletData, step }: ReviewStepProps) => {
  const Title = 'Review'
  const [walletInput, setWalletInput] = useState<WalletContextValue>({
    name: walletData.name,
    network: walletData.network,
    owners: walletData.owners,
    threshold: walletData.threshold,
  })
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
      <VStack>
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
      </VStack>
      <VStack>
        <HStack>
          <Text as="b">Est. network fee</Text>
          <Text>??</Text>
        </HStack>
      </VStack>

      <Button onClick={() => handleInput(walletInput)}>Next</Button>
    </>
  )
}
