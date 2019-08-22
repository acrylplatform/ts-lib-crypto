// You can use /bytes module when importing functions to set output to UInt8Array
// The flollowing functions will return UInt8Array:

// signBytes
// keyPair
// publicKey
// privateKey
// address
// blake2b
// keccak
// sha256
// sharedKey

import { address } from '@acryl/ts-lib-crypto/bytes'

const seed = 'uncle push human bus echo drastic garden joke sand warfare sentence fossil title color combine'

address(seed) // Uint8Array [ 1, 65, 81, 11, 84, 156, 131, 61, 5, 74, 107, 139, 210, 126, 45, 77, 131, 33, 228, 210, 166, 164, 176, 121, 140, 24 ]
