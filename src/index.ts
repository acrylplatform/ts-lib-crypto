import { crypto } from './crypto/crypto'
export { seedWordsList } from './crypto/seed-words-list'
export { ChaidId } from './extensions/chain-id'
export { Seed } from './extensions/seed'
export { isPrivateKey, isPublicKey } from './crypto/util'
export { crypto } from './crypto/crypto'
export * from './crypto/interface'

export const {
  signBytes,
  keyPair,
  publicKey,
  privateKey,
  address,
  blake2b,
  keccak,
  sha256,
  sharedKey,
  seedWithNonce,
  base64Encode,
  base64Decode,
  base58Encode,
  base58Decode,
  base16Encode,
  base16Decode,
  stringToBytes,
  bytesToString,
  random,
  randomSeed,
  randomBytes,
  verifySignature,
  verifyPublicKey,
  verifyAddress,
  messageDecrypt,
  messageEncrypt,
  encryptSeed,
  decryptSeed,
  rsaKeyPair,
  rsaKeyPairSync,
  rsaSign,
  rsaVerify,
  aesDecrypt,
  aesEncrypt,
  split,
  concat,
} = crypto({ output: 'Base58' })


