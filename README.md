This projct was built with the [ETHathon boilerplate](https://github.com/scio-labs/ethathon). Set-up procedures and other information can be found there.

* About the project
Be sure to write what inspired you, what you learned, how you built your project, and the challenges you faced. Format your story in Markdown.
## Inspiration


## What it does


## How we built it
Circuit side, 1) Main.circom 2) Hash.circom
in main.circom this circuit contains the ECDSA verification inside the circuit. so the flow is that there will be a public input which is the hashPubkey and transaction call data. The private input would be signature(r,s) and pubKey. so the process would be doing ECDSA verification → hash the pubkey from the private input → compare both public input hashPubKey with the private input hashed pubkey → if its true then it will continue or else it will fail to generate → lastly checking the result of the ECDSA if its incorrect then it will fail if its correct then it will pass through all the checking. 
the hash.circom contain a circuit that hashes the pubkey and return the result of the hashed pubkey.


## Challenges we ran into
**[Circuit]
We need to create hashPubKey. And the hashing method is Poseidon hash. So wanted to create this as a frontend side using spartan-ecdsa ( new ecdsa library that we found ). But the input and output structure is different from what we need so we changed to use hash.circom in frontend instead. 
Because our main logic needs heavy trusted setup, it caused lots of time to generate it. Actually first time to compile the circom, we failed because of laptop's computing power itself - it cause javascript overflow problem. Solution we found is, we used a linux laptop and customize the computing ability while generating the wasm, zkey, vkey. It worked though, still need to make it more efficient.
The thing we need to use as zkey is not first one, final zkey. but there is no documentation for that. So we made a open issue for that.
**[Frontend]
To connect circuit with frontend, we have to generate the right input format in client side. So we used this test.ts file and refer it to make a right input.json in frontend side without any documentation. While doing this re ran into many problems, got helped from Iden3 telegram group chat by asking questions. 

**[Relay]
Openzeppelin Defender Relayer is used to relay meta-transactions to build a gasless experience. This also helps to anonymize the user’s address from being shown in the onchain transaction history. 
Openzeppelin Autotask is used to run meta-transaction code snippets with downstream integration with the Relayer. This lessens the burden of having bloated client libraries on the client side.
 
## Accomplishments that we're proud of
While doing circuit and frontend connection

## What we learned

## What's next for ZK Dompet
We will apply for an EF grant, and want to make this circuit and contract full code as an open source. 
We have more issues that should be done. like, aggregating multiple proofs for multiple parties, better way to store and match as a frontend side ( like not using user’s private key ) 

## Built with
What languages, frameworks, platforms, cloud services, databases, APIs, or other technologies did you use?
"Try it out" links
Add links where people can try your project or see your code.

## Project Media

Image gallery
JPG, PNG or GIF format, 5 MB max file size. For best results, use a 3:2 ratio.


 
Video demo link
This video will be embedded at the top of your project page. Read more about uploading videos.

* GitHub Link with README.md file
