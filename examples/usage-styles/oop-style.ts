import { crypto, randomSeed } from '@acryl/ts-lib-crypto'

const seed = randomSeed()

const c = crypto({ seed, output: 'Bytes' })

c.address() // => UInt8Array

c.publicKey()

c.privateKey()

c.keyPair()