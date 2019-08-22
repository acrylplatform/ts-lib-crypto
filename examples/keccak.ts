import { keccak } from '@acryl/ts-lib-crypto'

const bytesArray = [117, 110, 99, 108, 101]
const bytesUint = Uint8Array.from([117, 110, 99, 108, 101])
const bytesBase58 = 'EFRr9cp'

keccak(bytesArray)
keccak(bytesUint)
keccak(bytesBase58)
// => Uint8Array [ 68, 157, 118, 188, 157, 237, 99, 78, 103, 42, 49, 205, 100, 63, 64, 230, 255, 158, 205, 7, 64, 216, 86, 193, 117, 174, 161, 81, 99, 13, 80, 156 ]