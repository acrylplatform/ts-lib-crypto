import { crypto } from '@acryl/ts-lib-crypto'

const { randomSeed, address, publicKey, privateKey, keyPair } = crypto()

const seed = randomSeed() // uncle push human bus echo drastic garden joke sand warfare sentence fossil title color combine

address(seed) // 3EHt9NerduyUBYP4qnf3FtnuNUeNfw22Lo9

publicKey(seed) // 4KxUVD9NtyRJjU3BCvPgJSttoJX7cb3DMdDTNucLN121

privateKey(seed) // 6zFSymZAoaua3gtJPbAUwM584tRETdKYdEG9BeEnZaGW

keyPair(seed) // { publicKey: '6zFSymZAoaua3gtJPbAUwM584tRETdKYdEG9BeEnZaGW', privateKey: '4KxUVD9NtyRJjU3BCvPgJSttoJX7cb3DMdDTNucLN121' }
