export const mainCircuit = () => {
  const wasmFile_m = './zkproof/ecdsa-verify/ecdsa_verify.wasm'
  const zkeyFile_m = './zkproof/ecdsa-verify/ecdsa_verify.zkey'
  const verificationKey_m = './zkproof/ecdsa-verify/vkey.json'

  return { wasmFile_m, zkeyFile_m, verificationKey_m }
}

export const hashCircuit = () => {
  const wasmFile = './zkproof/hash-circuit/eth_addr.wasm'
  const zkeyFile = './zkproof/hash-circuit/eth_addr.zkey'
  const verificationKey = './zkproof/hash-circuit/vkey.json'

  return { wasmFile, zkeyFile, verificationKey }
}
