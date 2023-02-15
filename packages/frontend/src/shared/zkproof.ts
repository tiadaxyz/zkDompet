export const mainCircuit = () => {
  const wasmFile_m = './zkproof/ecdsa-sign/ecdsa-sign.wasm'
  const zkeyFile_m = './zkproof/ecdsa-sign/sign_0000.zkey'
  const verificationKey_m = './zkproof/ecdsa-sign/verification_key.json'

  return { wasmFile_m, zkeyFile_m, verificationKey_m }
}

export const hashCircuit = () => {
  const wasmFile = './zkproof/ecdsa-sign/ecdsa-sign.wasm'
  const zkeyFile = './zkproof/ecdsa-sign/sign_0000.zkey'
  const verificationKey = './zkproof/ecdsa-sign/verification_key.json'

  return { wasmFile, zkeyFile, verificationKey }
}
