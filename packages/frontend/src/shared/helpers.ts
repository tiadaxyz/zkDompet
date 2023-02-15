import { createClient } from '@supabase/supabase-js'
import { env } from './environment'

export const numberRange = (start: number, end: number) => {
  return new Array(end - start).fill(null).map((d, i) => i + start)
}

export const hexToDecimal = (hex: string) => parseInt(hex, 16)

export const inputsToInput = (sigiture: any, privateKey: string) => {
  const len = sigiture?.length
  const slice1 = sigiture?.slice(2, len / 2) || ''
  const signitureR = []
  for (let i = 0; i < 4; i++) {
    signitureR.push(hexToDecimal(slice1.slice(16 * i, 16 * (i + 1))))
  }
  const slice2 = sigiture?.slice(len / 2, len) || ''
  const signitureS = []
  for (let i = 0; i < 4; i++) {
    if (i == 0 || i == 1) {
      signitureS.push(hexToDecimal(slice2.slice(16 * i, 16 * (i + 1))))
    } else if (i == 2) {
      signitureS.push(hexToDecimal(slice2.slice(16 * i, 16 * (i + 1) + 1)))
    } else if (i == 3) {
      signitureS.push(hexToDecimal(slice2.slice(16 * i + 1, 16 * (i + 1) + 2)))
    }
  }
  const ownerPrivKey = []
  for (let i = 0; i < 4; i++) {
    ownerPrivKey.push(hexToDecimal(privateKey.slice(16 * i, 16 * (i + 1))))
  }

  return {
    signitureR,
    signitureS,
    ownerPrivKey,
  }
}

export const supabase = createClient(env.supabaseUrl, env.supabaseAnonKey)
