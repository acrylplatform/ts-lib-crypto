import { blake2b } from '@acryl/ts-lib-crypto'

const bytesArray = [117, 110, 99, 108, 101]
const bytesUint = Uint8Array.from([117, 110, 99, 108, 101])
const bytesBase58 = 'EFRr9cp'

blake2b(bytesArray)
blake2b(bytesUint)
blake2b(bytesBase58)
// => Uint8Array [ 122, 38, 241, 102, 100, 244, 136, 193, 182, 216, 40, 209, 223, 115, 125, 100, 77, 23, 86, 139, 154, 86, 87, 11, 106, 207, 185, 65, 75, 94, 194, 110 ]