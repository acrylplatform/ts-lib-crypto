﻿# ts-lib-crypto

The acryl protocol is a set of rules named consensus by which nodes reach an agreement on the network, and format which nodes use to communicate with each other. It based on several well described hash and crypto algorithms and has predefined set of entries to operate on network. This library contains all algorithm implementations like signature verification and protocol entries like address used in acryl protocol. Also it contains utility methods and format converters to help 3rd party developers.

## Agenda
- **[Installation](#installation)**
- **[Import styles](#import-styles)**
- **[Inputs](#inputs)**
- **[Outputs](#outputs)**
 - **[Seed generation](#seed-generation)**
	 - [randomSeed](#randomseed)
	 - [seedWordsList](#seedwordslist)
 - **[Keys and address](#keys-and-address)**
	 - [publicKey](#publickey)
	 - [privateKey](#privatekey)
	 - [keyPair](#keypair)
	 - [address](#address)
 - **[Signatures](#signatures)**
	 - [signBytes](#signbytes)
	 - [verifySignature](#verifySignature)
- **[Hashing](#hashing)**
	 - [blake2b](#blake2b)
	 - [keccak](#keccak)
	 - [sha256](#sha256)
 - **[Random](#random)**
	 - [randomBytes](#randomBytes)
	 - [random](#random)
 - **[Base encoding\decoding](#base-encodingdecoding)**
	 - [base16](#base-encodingdecoding)
	 - [base58](#base-encodingdecoding)
	 - [base64](#base-encodingdecoding)
 - **[Messaging](#messaging)**
	 - [sharedKey](#sharedKey)
	 - [messageEncrypt](#messageEncrypt)
	 - [messageDecrypt](#messageDecrypt)
 - **[Encryption](#encryption)**
	 - [aesEncrypt](#aesEncrypt)
	 - [aesDecrypt](#aesDecrypt)
- **[Seed encryption](#Seed-encryption)**
 - **[Utils](#utils)**
	 - [split](#split)
	 - [concat](#concat)
	 - [stringToBytes](#stringtobytes)
	 - [bytesToString](#bytestostring)
- **[Constants](#constants)**
- **[Interface](#interface)**
- **[More examples](#more-examples)**
## Installation
```
npm install @acryl/ts-lib-crypto
```
## Import styles
The is several ways of doing things when using **ts-lib-crypto**.
You can import functions strait-forward:
```ts
import { address } from  '@acryl/ts-lib-crypto'
address('my secret seed') // 3ETFsZEgwWZKshGbP67BPv9gy9zo2QybR5o
```
Or you can use a crypto constructor function:
```ts
import { crypto } from  '@acryl/ts-lib-crypto'
const { address } = crypto()
address('my secret seed') // 3ETFsZEgwWZKshGbP67BPv9gy9zo2QybR5o
```
The second approach gives you more flexibility, using this approach you are able to embed the **seed** and use all seed-dependant functions without **seed** parameter:
```ts
import { crypto } from  '@acryl/ts-lib-crypto'
const { address } = crypto({seed: 'my secret seed'})
address() // 3ETFsZEgwWZKshGbP67BPv9gy9zo2QybR5o
```

## Inputs 
**ts-lib-crypto** is even more flexible. Any function argument that represents binary data or seed could be passed in several ways. Let's take a look on the following example:
```ts
import { address } from  '@acryl/ts-lib-crypto'
const  seedString  =  'uncle push human bus echo drastic garden joke sand warfare sentence fossil title color combine'
const  seedBytesAsArray  = [117, 110, 99, 108, 101, 32, 112, 117, 115, 104, 32, 104, 117, 109, 97, 110, 32, 98, 117, 115, 32, 101, 99, 104, 111, 32, 100, 114, 97, 115, 116, 105, 99, 32, 103, 97, 114, 100, 101, 110, 32, 106, 111, 107, 101, 32, 115, 97, 110, 100, 32, 119, 97, 114, 102, 97, 114, 101, 32, 115, 101, 110, 116, 101, 110, 99, 101, 32, 102, 111, 115, 115, 105, 108, 32, 116, 105, 116, 108, 101, 32, 99, 111, 108, 111, 114, 32, 99, 111, 109, 98, 105, 110, 101]
const  seedBytesAsUintArray  =  Uint8Array.from(seedBytesAsArray)
address(seedString) // 3EHt9NerduyUBYP4qnf3FtnuNUeNfw22Lo9
address(seedBytesAsArray) // 3EHt9NerduyUBYP4qnf3FtnuNUeNfw22Lo9
address(seedBytesAsUintArray) // 3EHt9NerduyUBYP4qnf3FtnuNUeNfw22Lo9
```
As you can see **seed** parameter is treated the same way for **number[]** or **Uint8Array**.
When you pass binary data is could be represented as  **number[]** or **Uint8Array** or even **base58**:
```ts
import { address, randomSeed, sha256 } from '@acryl/ts-lib-crypto'
const seed = randomSeed() // uncle push human bus echo drastic garden joke sand warfare sentence fossil title color combine
const addressBase58 = address(seed) // 3EHt9NerduyUBYP4qnf3FtnuNUeNfw22Lo9
sha256(addressBase58) // Uint8Array [ 6, 139, 119, 185, 194, 139, 93, 170, 127, 39, 2, 117, 59, 54, 95, 218, 194, 229, 43, 222, 195, 19, 69, 186, 33, 48, 133, 134, 56, 205, 87, 76 ]
```
Here we got **sha256** hash from address bytes represented as **base58** *(3EHt9NerduyUBYP4qnf3FtnuNUeNfw22Lo9)*. 
Be aware that **sha256** value is not based on "*3EHt9NerduyUBYP4qnf3FtnuNUeNfw22Lo9*" string itself, this value was treated as a **binary data** and **base58Decode** was applied.

## Outputs
As you've noticed from the previous section *address()* output is **base58** string like:
```ts
// 3PAP3wkgbGjdd1FuBLn9ajXvo6edBMCa115
```
 By default functions from the following list output **base58** string as a result,
 no matter what import-style you choose:
```
keyPair
publicKey
privateKey
address
sharedKey
signBytes
```

If you prefer **binary** output, you can alter this behaviour and make those functions to return **UInt8Array** instead.

When using inline import style:
```ts
// You can use [/bytes] module when importing functions to set output to UInt8Array
import { address } from  '@acryl/ts-lib-crypto/bytes'
address('uncle push human bus echo drastic garden joke sand warfare sentence fossil title color combine')
// => Uint8Array [ 1, 65, 81, 11, 84, 156, 131, 61, 5, 74, 107, 139, 210, 126, 45, 77, 131, 33, 228, 210, 166, 164, 176, 121, 140, 24 ]
```
When using crypto constructor function:
```ts
import { crypto } from  '@acryl/ts-lib-crypto'
const { address } = crypto({ output: 'Bytes' })
address('uncle push human bus echo drastic garden joke sand warfare sentence fossil title color combine')
// => Uint8Array [ 1, 65, 81, 11, 84, 156, 131, 61, 5, 74, 107, 139, 210, 126, 45, 77, 131, 33, 228, 210, 166, 164, 176, 121, 140, 24 ]
```

## Seed generation

The seed is a set of words or bytes that private and public keys are generated from. The usual Acryl seed looks like:
```
uncle push human bus echo drastic garden joke sand warfare sentence fossil title color combine
```
There are couple ways to generate seed: 
```ts
const handWrittenSeedString = 'uncle push human bus echo drastic garden joke sand warfare sentence fossil title color combine'
const handWrittenSeedBytes = [117, 110, 99, 108, 101, 32, 112, 117, 115, 104, 32, 104, 117, 109, 97, 110, 32, 98, 117, 115, 32, 101, 99, 104, 111, 32, 100, 114, 97, 115, 116, 105, 99, 32, 103, 97, 114, 100, 101, 110, 32, 106, 111, 107, 101, 32, 115, 97, 110, 100, 32, 119, 97, 114, 102, 97, 114, 101, 32, 115, 101, 110, 116, 101, 110, 99, 101, 32, 102, 111, 115, 115, 105, 108, 32, 116, 105, 116, 108, 101, 32, 99, 111, 108, 111, 114, 32, 99, 111, 109, 98, 105, 110, 101]
```
Or if you need seed with nonce:
```ts
import { seedWithNonce, randomSeed, address } from '@acryl/ts-lib-crypto'

const nonce = 1
const seedphrase = randomSeed() // uncle push human bus echo drastic garden joke sand warfare sentence fossil title color combine
const seed = seedWithNonce(seedphrase, nonce)

//Now you can use seed as usual
address(seed)
```
Seed could be any **string** or **number[]** or **Uint8Array** or **ISeedWithNonce**.

There is also a way to generate seed-phrase using **ts-lib-crypto** described in the next section.

### randomSeed
```ts
import { randomSeed } from '@acryl/ts-lib-crypto'

randomSeed() //uncle push human bus echo drastic garden joke sand warfare sentence fossil title color combine
```
You can also specify seed-phrase size:
```ts
randomSeed(3) //uncle push human
```
The default seed size is 15 words.

### seedWordsList
If you want to get all the valid seed words that official acryl-client generates seed-phrase from, use **seedWordsList** the 2048 word array.
```ts
import { seedWordsList } from '@acryl/ts-lib-crypto'
console.log(seedWordsList) // [ 'abandon','ability','able', ... 2045 more items ]
```
## Keys and address

### publicKey
You could get public key either from raw seed-phrase or seed with nonce:
```ts
import { publicKey, seedWithNonce } from '@acryl/ts-lib-crypto'
const seed = 'uncle push human bus echo drastic garden joke sand warfare sentence fossil title color combine'
publicKey(seed) // 4KxUVD9NtyRJjU3BCvPgJSttoJX7cb3DMdDTNucLN121
publicKey(seedWithNonce(seed, 0)) // 4KxUVD9NtyRJjU3BCvPgJSttoJX7cb3DMdDTNucLN121
```
Or even from private key, it's usefull in some cases:
```ts
import { publicKey, privateKey, seedWithNonce } from '@acryl/ts-lib-crypto'
const seed = 'uncle push human bus echo drastic garden joke sand warfare sentence fossil title color combine'
const pk = privateKey(seed)
publicKey({ privateKey: pk }) // 4KxUVD9NtyRJjU3BCvPgJSttoJX7cb3DMdDTNucLN121
```

### privateKey
Same with private key:
```ts
import { privateKey, seedWithNonce } from '@acryl/ts-lib-crypto'
const  seed = 'uncle push human bus echo drastic garden joke sand warfare sentence fossil title color combine'
privateKey(seed) // 6zFSymZAoaua3gtJPbAUwM584tRETdKYdEG9BeEnZaGW
privateKey(seedWithNonce(seed, 99)) // 2dZ72j6j8hptaMGgyKAa8EhW59hWRZcjdB7ovWHsYvQK
```
### keyPair
You could also obtain a keyPair:
```ts
import { keyPair } from '@acryl/ts-lib-crypto'
const  seed = 'uncle push human bus echo drastic garden joke sand warfare sentence fossil title color combine'
keyPair(seed)
// => { 
//      publicKey:  '4KxUVD9NtyRJjU3BCvPgJSttoJX7cb3DMdDTNucLN121',
//      privateKey: '6zFSymZAoaua3gtJPbAUwM584tRETdKYdEG9BeEnZaGW'
//    }
```
### address
You can create an address for *Mainnet*:
```ts
import { address } from '@acryl/ts-lib-crypto'
const  seed = 'uncle push human bus echo drastic garden joke sand warfare sentence fossil title color combine'
address(seed) // 3EHt9NerduyUBYP4qnf3FtnuNUeNfw22Lo9
```
or *Testnet*:
```ts
address(seed, 'K') // 3JKGBDjqX1n6wiiTi2rNSk3dEmgx6z8jDP9
```
alternatively You could use **TEST_NET_CHAIN_ID** constant instead of **K** literal like this:
```ts
import { address, TEST_NET_CHAIN_ID } from '@acryl/ts-lib-crypto'
const  seed = 'uncle push human bus echo drastic garden joke sand warfare sentence fossil title color combine'
address(seed, TEST_NET_CHAIN_ID) // 3JKGBDjqX1n6wiiTi2rNSk3dEmgx6z8jDP9
```
There are several more useful constants, you can check them in [\[constants\]](/#constants) section.
## Signatures
#### signBytes
To sign arbitrary bytes or usually transaction bytes you should use the **signBytes** function.
Here is sign with seed example:
```ts
import { signBytes } from '@acryl/ts-lib-crypto'
const bytes = [117, 110, 99, 108, 101]
const seed = 'uncle push human bus echo drastic garden joke sand warfare sentence fossil title color combine'
signBytes(seed, bytes) // 3JSskcaZVTuGzNSnWtMMRV2Zja3J1RJ8d1ff6CxqXocMaZdgooKnMHVtBmngt226ZXEyAQ4hxfphjZroArPSZKGC
```
Also you can use private key to sign bytes:
```ts
import { signBytes, privateKey } from '@acryl/ts-lib-crypto'
const bytes = [117, 110, 99, 108, 101]
const seed = 'uncle push human bus echo drastic garden joke sand warfare sentence fossil title color combine'
const key = privateKey(seed)
signBytes({ privateKey: key }, bytes) // B4ViRpS6wZ73hhTtP4hhrfV46rR3uoUn7jgsH5yfkKMpbJUxMmu48jf3QSdibRkQBN7Tkx9jReKDq1Rmp9acxPG
```
Remember that you can use **base58** strings when it's about binary data, so you can represent bytes as **base58** too:
```ts
signBytes({ privateKey:  key }, 'Fk1sjwdPSwZ4bPwvpCGPH6')
```
You can learn more about it in the [outputs](#outputs) section.
#### verifySignature
Verifying signature is a way to proof what particular bytes was signed with a particular private key or seed which correspond to public key that we are checking against:
```ts
import { signBytes, verifySignature, keyPair } from '@acryl/ts-lib-crypto'
//Signature roundtrip
const bytes = [117, 110, 99, 108, 101]
const seed = 'uncle push human bus echo drastic garden joke sand warfare sentence fossil title color combine'
const keys = keyPair(seed)
const signature = signBytes(keys, bytes)
verifySignature(keys.publicKey, bytes, signature) // true
```
## Hashing
There are three hashing algorithms available in **ts-lib-crypto**.
#### blake2b
```ts
import { blake2b } from '@acryl/ts-lib-crypto'
const bytesArray = [117, 110, 99, 108, 101]
const bytesUint = Uint8Array.from([117, 110, 99, 108, 101])
const bytesBase58 = 'EFRr9cp'
blake2b(bytesArray)
blake2b(bytesUint)
blake2b(bytesBase58)
// => Uint8Array [ 122, 38, 241, 102, 100, 244, 136, 193, 182, 216, 40, 209, 223, 115, 125, 100, 77, 23, 86, 139, 154, 86, 87, 11, 106, 207, 185, 65, 75, 94, 194, 110 ]
```
#### keccak
```ts
import { keccak } from '@acryl/ts-lib-crypto'
const bytesArray = [117, 110, 99, 108, 101]
const bytesUint = Uint8Array.from([117, 110, 99, 108, 101])
const bytesBase58 = 'EFRr9cp'
keccak(bytesArray)
keccak(bytesUint)
keccak(bytesBase58)
// => Uint8Array [ 68, 157, 118, 188, 157, 237, 99, 78, 103, 42, 49, 205, 100, 63, 64, 230, 255, 158, 205, 7, 64, 216, 86, 193, 117, 174, 161, 81, 99, 13, 80, 156 ]
```
#### sha256
```ts
import { sha256 } from '@acryl/ts-lib-crypto'
const bytesArray = [117, 110, 99, 108, 101]
const bytesUint = Uint8Array.from([117, 110, 99, 108, 101])
const bytesBase58 = 'EFRr9cp'
sha256(bytesArray)
sha256(bytesUint)
sha256(bytesBase58)
// => Uint8Array [ 49, 7, 234, 3, 1, 162, 120, 148, 162, 18, 190, 81, 199, 107, 124, 91, 148, 168, 112, 11, 106, 206, 0, 36, 252, 2, 60, 241, 230, 133, 85, 141 ]
```
## Random
There is several ways to get random values in **ts-lib-crypto**.
To get an **Uint8Array** of random values simply use:
#### randomBytes
```ts
import { randomBytes } from '@acryl/ts-lib-crypto'
randomBytes(3) // Uint8Array [ 109, 155, 152 ]             
```
If you want more control over the values format you could use:
#### random
```ts
import { random } from '@acryl/ts-lib-crypto'

const length = 3     
random(length, 'Array8')       // [ 19, 172, 130 ]   
random(length, 'Array16')      // [ 61736, 48261, 38395 ] 
random(length, 'Array32')      // [ 406628961, 307686833, 2604847943 ]       
random(length, 'Buffer')       // <Buffer db ff fb>       
random(length, 'Uint8Array')   // Uint8Array [ 137, 85, 212 ]   
random(length, 'Uint16Array')  // Uint16Array [ 35881, 51653, 55967 ]  
random(length, 'Uint32Array')  // Uint32Array [ 698646076, 2957331816, 2073997581 ]    
```
## Base encoding\decoding


```ts
import { base16Encode, base16Decode, base58Encode, base58Decode, base64Encode, base64Decode, randomBytes } from '@acryl/ts-lib-crypto'

const bytes = randomBytes(32)

// Base16 same as Hex
const base16String = base16Encode(bytes) // 2059ec5d9ed640b75722ec6a2ff76890e523ea4624887549db761d678ba8f899
const bytesFromBase16 = base16Decode(base16String)

// Base58
const base58String = base58Encode(bytes) // 3BHaM9Q5HhUobQ5oZAqjdkE9HRpmqMx4XLq3GXTMD5tU
const bytesFromBase58 = base58Decode(base58String)

// Base64
const base64String = base64Encode(bytes) // IFnsXZ7WQLdXIuxqL/dokOUj6kYkiHVJ23YdZ4uo+Jk=
const bytesFromBase64 = base64Decode(base64String)
```
## Messaging
These methods implement acryl messaging protocol 
- sharedKey 
- messageDecrypt
- messageEncrypt
```typescript
import { sharedKey, messageEncrypt, messageDecrypt, keyPair } from '@acryl/ts-lib-crypto'

const bobKeyPair = keyPair('Bob')
const aliceKeyPair = keyPair('Alice')
const msg = 'hello world'

// Alice derives shared key and encrypts message
const sharedKeyA = sharedKey(aliceKeyPair.privateKey, bobKeyPair.publicKey, 'acryl') 
const encrypted = messageEncrypt(sharedKeyA, msg)

// Bob decrypts message derives shared key and decrypts message
const sharedKeyB = sharedKey(aliceKeyPair.privateKey, bobKeyPair.publicKey, 'acryl') 
const decrypted = messageDecrypt(sharedKeyB, encrypted)
```
## Encryption
This is low level functionality where you have to generate key and iv yourself 
#### aesEncrypt
Encrypt bytes using AES algorithm. 
```typescript
import { aesEncrypt, randomBytes } from '@acryl/ts-lib-crypto'

const data = Uint8Arraty.from([1,2,3])
const mode =  'CBC' // Possible modes are 'CBC' | 'CFB' | 'CTR' | 'OFB' | 'ECB' | 'GCM'

const key = randomBytes(32)
const iv = randomBytes(32)

const encrypted = aesEncrypt(data, key, mode, iv)

```
#### aesDecrypt
Decrypt bytes using AES algorithm
```typescript
const decrypted = aesDecrypt(encrypted, key, mode, iv)
```

## Seed encryption
These functions implements seed encryption protocol used in DexClient and WavesKeeper
```typescript
import { encryptSeed, decryptSeed } from '@acryl/ts-lib-crypto'

const seed = 'some secret seed phrase i use'
const encrypted = encryptSeed(seed, 'secure password')
const decrypted = decryptSeed(encryptSeed, 'secure password')

```
## Utils
Utility functions designed to help 3rd party developers working with js binary types like Uint8Array and Buffer.
#### split
You can use split for splitting bytes to sub arrays.
```ts
import { split, randomBytes } from '@acryl/ts-lib-crypto'
const bytes = randomBytes(2 + 3 + 4 + 10)
split(bytes, 2, 3, 4)
// [ 
//   Uint8Array [195, 206],
//   Uint8Array [ 10, 208, 171 ],
//   Uint8Array [ 36, 18, 254, 205 ],
//   Uint8Array [ 244, 232, 55, 11, 113, 47, 80, 194, 170, 216 ]
// ]
```
Alternatively, you can use array deconstruction syntax:
```ts
const [a, b, c, rest] = split(bytes, 2, 3, 4)
// a = Uint8Array [195, 206],
// b = Uint8Array [ 10, 208, 171 ],
// c = Uint8Array [ 36, 18, 254, 205 ],
// rest = Uint8Array [ 244, 232, 55, 11, 113, 47, 80, 194, 170, 216 ]
```
#### concat
Concat is the opposite and pretty self-explanatory:
```ts
import { concat, randomBytes } from '@acryl/ts-lib-crypto'
const bytesA = randomBytes(2)
const bytesB = randomBytes(2)
concat(bytesA, bytesB) // Uint8Array [ 36, 18, 254, 205 ]
```
#### stringToBytes
```ts
import { stringToBytes } from '@acryl/ts-lib-crypto'
stringToBytes('Acryl!') // Uint8Array [ 65, 99, 114, 121, 108, 33 ]
```
#### bytesToString
```ts
import { bytesToString } from '@acryl/ts-lib-crypto'
bytesToString([ 65, 99, 114, 121, 108, 33 ]) // Acryl!
```
## Constants
There is several useful constants declared at **ts-lib-crypto**:
```ts
const PUBLIC_KEY_LENGTH = 32
const PRIVATE_KEY_LENGTH = 32
const SIGNATURE_LENGTH = 64
const ADDRESS_LENGTH = 26

const MAIN_NET_CHAIN_ID = 65 // A
const TEST_NET_CHAIN_ID = 75 // K
```
## Interface 
The full **IAcrylCrypto** interface can be found on the [project`s github](https://github.com/acrylplatform/ts-lib-crypto) in [interface.ts](https://github.com/acrylplatform/ts-lib-crypto/blob/master/src/crypto/interface.ts).
```ts
  //Seeds, keys and addresses
  seedWithNonce: (seed: TSeed, nonce: number) => INonceSeed
  keyPair: (seed: TSeed) => TKeyPair<TBytesOrBase58>
  publicKey: (seed: TSeed) => TBytesOrBase58
  privateKey: (seed: TSeed) => TBytesOrBase58
  address: (seedOrPublicKey: TSeed | TPublicKey<TBinaryIn>, chainId?: TChainId) => TBytesOrBase58

  //Signature
  signBytes: (seedOrPrivateKey: TSeed | TPrivateKey<TBinaryIn>, bytes: TBinaryIn, random?: TBinaryIn) => TDesiredOut
  //Hashing 
  blake2b: (input: TBinaryIn) => TBytes
  keccak: (input: TBinaryIn) => TBytes
  sha256: (input: TBinaryIn) => TBytes

  //Base encoding\decoding
  base64Encode: (input: TBinaryIn) => TBase64
  base64Decode: (input: TBase64) => TBytes //throws (invalid input)
  base58Encode: (input: TBinaryIn) => TBase58
  base58Decode: (input: TBase58) => TBytes //throws (invalid input)
  base16Encode: (input: TBinaryIn) => TBase16
  base16Decode: (input: TBase16) => TBytes //throws (invalid input)

  //Utils
  stringToBytes: (input: string) => TBytes
  bytesToString: (input: TBinaryIn) => string
  split: (binary: TBinaryIn, ...sizes: number[]) => TBytes[]
  concat: (...binaries: TBinaryIn[]) => TBytes

  //Random
  random<T extends keyof TRandomTypesMap>(count: number, type: T): TRandomTypesMap[T]
  randomBytes: (size: number) => TBytes
  randomSeed: (wordsCount?: number) => string

  //Verification
  verifySignature: (publicKey: TBinaryIn, bytes: TBinaryIn, signature: TBinaryIn) => boolean
  verifyPublicKey: (publicKey: TBinaryIn) => boolean
  verifyAddress: (address: TBinaryIn, optional?: { chainId?: TChainId, publicKey?: TBinaryIn }) => boolean

  //Messaging
  sharedKey: (privateKeyFrom: TBinaryIn, publicKeyTo: TBinaryIn, prefix: TRawStringIn) => TBytesOrBase58
  messageDecrypt: (sharedKey: TBinaryIn, encryptedMessage: TBinaryIn) => string
  messageEncrypt: (sharedKey: TBinaryIn, message: TRawStringIn) => TBytes

  //Encryption
  aesEncrypt: (data: TRawStringIn, secret: TBinaryIn, mode?: AESMode, iv?: TBinaryIn) => TBytes
  aesDecrypt: (encryptedData: TBinaryIn, secret: TBinaryIn, mode?: AESMode, iv?: TBinaryIn) => TBytes
```
## More examples
Every example used in this document and many more can be found on the [project`s github](https://github.com/acrylplatform/ts-lib-crypto) inside [examples](https://github.com/acrylplatform/ts-lib-crypto/tree/master/examples) folder.


