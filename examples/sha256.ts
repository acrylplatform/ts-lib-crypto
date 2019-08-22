import { sha256 } from '@acryl/ts-lib-crypto'

const bytesArray = [117, 110, 99, 108, 101]
const bytesUint = Uint8Array.from([117, 110, 99, 108, 101])
const bytesBase58 = 'EFRr9cp'

sha256(bytesArray)
sha256(bytesUint)
sha256(bytesBase58)
// => Uint8Array [ 49, 7, 234, 3, 1, 162, 120, 148, 162, 18, 190, 81, 199, 107, 124, 91, 148, 168, 112, 11, 106, 206, 0, 36, 252, 2, 60, 241, 230, 133, 85, 141 ]