## ZK Dompet

# About the project
## Inspiration
This project is inspired by Gnosis Safe where multiple participants or entities can have joint ownership of a single Ethereum wallet. However, the current implementation of Gnosis Safe is not anonymous. The wallet address is linked to the Ethereum address of the participants. Hence, the privacy of the participants is compromised. 

## What it does
ZKDompet basically allows creation of a multi-signature wallet with the following features:
- The wallet address is not linked to owners of the wallet
- The wallet enforces each participant provide a Zero Knowledge Proof (ZKP) of their identity before they can submit a transaction which will be relayed to the multi-signature wallet.

## Deployments
### Mumbai Testnet
Full details of the contracts deployed on Mumbai Testnet can be found here:
- Video demo: https://www.youtube.com/watch?v=NSCPcEv5gEw
- Open Zeppelin Relayer: https://mumbai.polygonscan.com/address/0x446008101d998584837e01c3bbc0d3055e37b189
- factory owner: https://mumbai.polygonscan.com/address/0x264dABD1fbF0da59Cb22E0B4b6146aA26dA669BF
- factory: https://mumbai.polygonscan.com/address/0xAaA2F4E5eEAD0b3adf1beC7a1C64D22719B8dbD8
- multiSig #1: https://mumbai.polygonscan.com/address/0xa611EEE4c541CC8B64644C515203AcE64D5b3186
- MinimalForwarder": https://mumbai.polygonscan.com/address/0xC32D8793ef43238878171fa83e1A975b1ffb5173
### Scroll Prealpha L2
As there is no support for Scroll testnet relayer on OpenZeppelin Defender, we have deployed the MultiSig wallet directly without the relayer on Scroll Testnet L2. We have tested transaction execution on the MultiSig wallet whereby it checks the ZKP of the sender before executing the transaction to the recipient wallet.
- Video demo: https://www.youtube.com/watch?v=4hGZzHYNp60
- multiSig #1: https://l2scan.scroll.io/address/0x1EE9751F853C6D1Ed0D1f9766fc9c2D3441A9B70 
- Transaction executed on MultiSig #1: https://l2scan.scroll.io/tx/0xbeb5e0028393221c26930b4c39423db68d56c627a2dc03efd387d709c6e1c1fe

## How we built it
Overall flow goes:
[Inputs] -> [Circuit] -> [Relay] -> [Contract] -> [Outputs]
1. Circom Circuits 
- `Main.circom`
    - This circuit contains the ECDSA verification within the circuit. It takes in the following public and private inputs.
    - Public Inputs
        - Hash of the public key
        - Transaction call data
    - Private Inputs
        - Signature (r,s)
        - Public Key
    - The circuit compares both the public and private inputs and returns true if they are equal.
    - The circuit also verifies the ECDSA signature using the public key and the transaction call data.
- `Hash.circom`
    - This circuit hashes the public key and returns the result of the hashed public key.

## Challenges we ran into
**[Circuit]
We initially wanted to use spartan-ecdsa library to create a circuit for ECDSA verification. However, we found that the library is not compatible with circom. Hence, we used a Poseidon hash circuit instead. 

Computation of the circuit is very compute intensive on top of requiring a trusted setup. We faced issued generating the wasm, zkey and vkey files due to some javascript overflow errors. We finally resorted to to use a linux laptop to generate the trusted setup for the circuit. Due to lack of documentation, we could not improve the efficiency of the circuit generation process. This is definitely an area of improvement for future iterations of the project.

**[Frontend]
To connect circuit with frontend, we have to generate the right input format in client side. So we used this test.ts file and refer it to make a right input.json in frontend side without any documentation. While doing this re ran into many problems, got helped from Iden3 telegram group chat by asking questions. 

**[Relay]
Openzeppelin Defender Relayer is used to relay meta-transactions to build a gasless experience. This also helps to anonymize the user’s address from being shown in the onchain transaction history. 
Openzeppelin Autotask is used to run meta-transaction code snippets with downstream integration with the Relayer. This lessens the burden of having bloated client libraries on the client side.
 
## Accomplishments that we're proud of
We are proud that we managed to go from ideation to a fully functional MVP in a short period of time. We are also proud that we managed to build a fully functional Zero Knowledge Proof circuit which can be used in a meaningful manner to provide privacy to the users especially in the context of multi-signature wallets. 

## What we learned
Circom is a very powerful tool to build Zero Knowledge Proof circuits. However, it is still very new and there is a lack of documentation.

## What's next for ZK Dompet
We aspire to make this project a fully functional product and apply grants (e.g. Ethereum Foundation). We also plan to make this circuit and codebase fully open source to benefit the community.

## Future Improvements
Some of the improvements we plan to make are:
- Aggregating multiple proofs for multiple parties
- A more secure way of storing user metadata without compromising much on the user experience

## Built with
Tech Stack includes:
- Circom for the Zero Knowledge Proof circuit
- Solidity
- Openzeppelin Defender for the Relayer and Autotask
- Openzeppelin SDK for the smart contracts
- NextJs

## Project Media

Image gallery
JPG, PNG or GIF format, 5 MB max file size. For best results, use a 3:2 ratio.


 
Video demo link
This video will be embedded at the top of your project page. Read more about uploading videos.

* GitHub Link with README.md file
