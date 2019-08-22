import { address, randomSeed, sha256 } from '@acryl/ts-lib-crypto'

const seed = randomSeed() // uncle push human bus echo drastic garden joke sand warfare sentence fossil title color combine
const addressBase58 = address(seed) // 3EHt9NerduyUBYP4qnf3FtnuNUeNfw22Lo9
sha256(addressBase58) // Uint8Array [ 6, 139, 119, 185, 194, 139, 93, 170, 127, 39, 2, 117, 59, 54, 95, 218, 194, 229, 43, 222, 195, 19, 69, 186, 33, 48, 133, 134, 56, 205, 87, 76 ]
