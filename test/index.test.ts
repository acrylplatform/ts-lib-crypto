import { crypto } from '../src/crypto/crypto'
import { MAIN_NET_CHAIN_ID } from '../src/crypto/interface'
import { decryptSeed, encryptSeed } from '../src/crypto/seed-ecryption'
const {seedWithNonce, aesDecrypt, address, concat, split, sharedKey, messageEncrypt, messageDecrypt, randomBytes, bytesToString, stringToBytes, keyPair, publicKey, privateKey, signBytes, verifySignature, verifyAddress, base58Decode, base58Encode, base16Decode, base16Encode, base64Decode, base64Encode} = crypto({output: 'Base58'})

const s = '1f98af466da54014bdc08bfbaaaf3c67'

test('address from seed with nonce', () => {
  const n1 = address(seedWithNonce(s, 1))
  const n2 = address(seedWithNonce(s, 2))
  const n3 = address(seedWithNonce(s, 3))

  expect(n1).toBe('3EVqDcR3yG2upstwoZkimSmxW32GP5hYek3')
  expect(n2).toBe('3EAjwqiobKzWNm4kYMZv2wDYazce2k14vwJ')
  expect(n3).toBe('3EK64x56cFWxNZkYDm4rXb1DLw8dZymemhT')
})

test('address', () =>
  expect(address(s)).toBe('3EUJN96y1qAuDEr4ddL6xPyL1Jyc15ojPaY')
)

test('verify address', () => {
  const a = address(s, MAIN_NET_CHAIN_ID)
  expect(verifyAddress(a)).toBe(true)
  expect(verifyAddress(a, {chainId: MAIN_NET_CHAIN_ID})).toBe(true)
  expect(verifyAddress(a, {publicKey: publicKey(s)})).toBe(true)
})

test('keyPair', () =>
  expect(keyPair(s)).toEqual({
    publicKey: '12wYe4Y5Z5uJXRQw44huYYszidfMfFbwhjyVTparH1wT',
    privateKey: 'AAJPFvUtBgSMWbDQgCJUxzXmYeggKgn8a4LEMGaoWEMj',
  })
)

test('publicKey', () =>
  expect(publicKey(s)).toBe('12wYe4Y5Z5uJXRQw44huYYszidfMfFbwhjyVTparH1wT')
)

test('privateKey', () =>
  expect(privateKey(s)).toBe('AAJPFvUtBgSMWbDQgCJUxzXmYeggKgn8a4LEMGaoWEMj')
)

test('signature roundtrip', () => {
  const bytes = Uint8Array.from([1, 2, 3, 4])
  const sig = signBytes(s, bytes)
  const valid = verifySignature(publicKey(s), bytes, sig)
  const invalid = verifySignature(publicKey(s), Uint8Array.from([4, 3, 2, 1]), sig)
  expect(valid).toBe(true)
  expect(invalid).toBe(false)
})

test('string/bytes roundtrip', () => {
  const initialString = 'acryl'
  const bytes = stringToBytes(initialString)
  expect(bytesToString(bytes)).toBe(initialString)
})

test('base16 roundtrip', () => {
  const base16 = '1f3b047576'
  const result = base16Encode(base16Decode(base16))
  expect(result).toEqual(base16)
})

test('base58 roundtrip', () => {
  const base58 = '5k1XmKDYbpxqAN'
  const result = base58Encode(base58Decode(base58))
  expect(result).toEqual(base58)
})

test('base64 roundtrip', () => {
  const base64 = 'd2F2ZXM='
  const result = base64Encode(base64Decode(base64))
  expect(result).toEqual(base64)
})

test('base58 to base64', () => {
  const acrylBytes = stringToBytes('acryl')
  const base58 = base58Encode(acrylBytes)
  const base64 = base64Encode(base58) //you can use base58 string as an binary input
  expect(base64Decode(base64)).toEqual(acrylBytes)
})

test('output equality', () => {
  const {
    publicKey: publicKeyBytes,
    address: addressBytes,
    signBytes: signBytesBytes,
    keyPair: keyPairBytes,
  } = crypto({output: 'Bytes'})

  const message = [1, 2, 3]
  const random = randomBytes(64)

  expect(base58Encode(publicKeyBytes(s))).toBe(publicKey(s))
  expect(base58Encode(addressBytes(s))).toBe(address(s))
  expect(base58Encode(signBytesBytes(s, message, random))).toBe(signBytes(s, message, random))
  expect(base58Encode(keyPairBytes(s).privateKey)).toBe(keyPair(s).privateKey)
})

test('generate shared key', () => {
  const a = keyPair(s)
  const b = keyPair(s + s)
  const sharedKeyA = sharedKey(a.privateKey, b.publicKey, 'acryl')
  const sharedKeyB = sharedKey(b.privateKey, a.publicKey, 'acryl')
  expect(sharedKeyA).toEqual(sharedKeyB)
})

test('encrypt and decrypt message roundtrip', () => {
  const originalMessage = 'Acryl is awesome! Русский текст! 🦓'
  const prefix = 'acryl'

  const a = keyPair(s)
  const b = keyPair(s + s)
  const sk = sharedKey(a.privateKey, b.publicKey, prefix)
  const encryptedMessage = messageEncrypt(sk, originalMessage)
  const message = messageDecrypt(sk, encryptedMessage)

  expect(message).toEqual(originalMessage)
})

test('concat split roundtrip', () => {
  const a = base58Encode([1, 2, 3, 4])
  const b = [5, 6, 7]
  const c = Uint8Array.from([8, 9])

  const cc = concat(a, b, c)
  const [a2, b2, c2] = split(cc, 4, 3, 2)

  expect(a2).toEqual(Uint8Array.from([1, 2, 3, 4]))
  expect(b2).toEqual(Uint8Array.from(b))
  expect(c2).toEqual(c)
})


test('should decrypt and encrypt seed', () => {
  const pass = '🦋'
  const encrypted = 'U2FsdGVkX1/cD65nXrTMcViAYyCQXMrGi8XAdD8mVqFPwv6RJjKm7qHAf9jL3zgY'
  const decrypted = 'asd asd asd asd asd asd'

  const d = decryptSeed(encrypted, pass)
  const d2 = decryptSeed(encryptSeed(decrypted, pass), pass)
  expect(d).toEqual(decrypted)
  expect(d2).toEqual(decrypted)

})
