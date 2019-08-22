import { signBytes, privateKey } from '@acryl/ts-lib-crypto'

const bytes = 'Fk1sjwdPSwZ4bPwvpCGPH6'
const seed = 'uncle push human bus echo drastic garden joke sand warfare sentence fossil title color combine'
const key = privateKey(seed)

signBytes({ privateKey: key }, bytes) // B4ViRpS6wZ73hhTtP4hhrfV46rR3uoUn7jgsH5yfkKMpbJUxMmu48jf3QSdibRkQBN7Tkx9jReKDq1Rmp9acxPG