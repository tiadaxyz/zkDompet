import { createClient } from '@supabase/supabase-js'
import { sign, Point, utils } from '@noble/secp256k1'
import { env } from './environment'
import { hashCircuit, mainCircuit } from './zkproof'

export const numberRange = (start: number, end: number) => {
  return new Array(end - start).fill(null).map((d, i) => i + start)
}

export const hexToDecimal = (hex: string) => parseInt(hex, 16)

function bigint_to_array(n: number, k: number, x: bigint) {
  let mod = 1n
  for (let idx = 0; idx < n; idx++) {
    mod = mod * 2n
  }

  const ret: bigint[] = []
  let x_temp: bigint = x
  for (let idx = 0; idx < k; idx++) {
    ret.push(x_temp % mod)
    x_temp = x_temp / mod
  }
  return ret
}

// bigendian
function bigint_to_Uint8Array(x: bigint) {
  const ret: Uint8Array = new Uint8Array(32)
  for (let idx = 31; idx >= 0; idx--) {
    ret[idx] = Number(x % 256n)
    x = x / 256n
  }
  return ret
}

// bigendian
function Uint8Array_to_bigint(x: Uint8Array) {
  let ret = 0n
  for (let idx = 0; idx < x.length; idx++) {
    ret = ret * 256n
    ret = ret + BigInt(x[idx])
  }
  return ret
}

export const getInputJsonForCircuit = async (privateKey: string, msg: string) => {
  const decPrivateKey = hexToDecimal(privateKey)
  const privBigInt = BigInt(decPrivateKey)
  const msgUnit8Array = new TextEncoder().encode(msg)

  const pubkey: Point = Point.fromPrivateKey(privBigInt)
  const msghash: Uint8Array = await utils.sha256(msgUnit8Array)
  const msghash_bigint: bigint = Uint8Array_to_bigint(msghash)
  const pub0 = pubkey.x
  const pub1 = pubkey.y

  // in compact format: r (big-endian), 32-bytes + s (big-endian), 32-bytes
  const sig: Uint8Array = await sign(msghash, bigint_to_Uint8Array(privBigInt), {
    canonical: true,
    der: false,
  })
  const r: Uint8Array = sig.slice(0, 32)
  const r_bigint: bigint = Uint8Array_to_bigint(r)

  const s: Uint8Array = sig.slice(32, 64)
  const s_bigint: bigint = Uint8Array_to_bigint(s)

  const priv_array: bigint[] = bigint_to_array(64, 4, privBigInt)
  const r_array: bigint[] = bigint_to_array(64, 4, r_bigint)
  const s_array: bigint[] = bigint_to_array(64, 4, s_bigint)
  const msghash_array: bigint[] = bigint_to_array(64, 4, msghash_bigint)
  const pub0_array: bigint[] = bigint_to_array(64, 4, pub0)
  const pub1_array: bigint[] = bigint_to_array(64, 4, pub1)

  console.log('signatureR', r_array)
  console.log('signatureS', s_array)
  console.log('pubKey', [pub0_array, pub1_array])
  console.log('signit', [pub0_array, pub1_array])
  console.log('transactionCallData', msghash_array)

  const response = {
    transactionCallData: msghash_array,
    pubKey: [pub0_array, pub1_array],
    signatureR: r_array,
    signatureS: s_array,
  }

  // get hashed address
  const { wasmFile, zkeyFile, verificationKey } = hashCircuit()
  console.log(wasmFile, zkeyFile, response.pubKey, 'hash generate')
  const { proof, publicSignals } = await generateProof(
    { pubKey: response.pubKey },
    wasmFile,
    zkeyFile,
  )

  const final_response = {
    hashPubKey: publicSignals[0],
    transactionCallData: response.transactionCallData,
    pubKey: response.pubKey,
    signatureR: response.signatureR,
    signatureS: response.signatureS,
  }

  console.log(final_response, 'final_response')

  // call main circom
  const { wasmFile_m, zkeyFile_m, verificationKey_m } = mainCircuit()
  // get final proof
  const res = await generateProof(final_response, wasmFile_m, zkeyFile_m)
  return { proof: res.proof, publicSignals: res.publicSignals }
}

export const generateProof = async (_proofInput: any, _wasm: string, _zkey: string) => {
  const { proof, publicSignals } = await window.snarkjs.groth16.fullProve(_proofInput, _wasm, _zkey)
  return { proof, publicSignals }
}

export const supabase = createClient(env.supabaseUrl, env.supabaseAnonKey)
