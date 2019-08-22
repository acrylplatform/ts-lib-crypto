import { address, publicKey, privateKey, keyPair } from '@acryl/ts-lib-crypto'

const seed = 'secret seed'

address(seed) // 3EFYsxjA3Nr3kJgsjXPUVgvwvHMEiDUkBgD

publicKey(seed) // Fjyw5xkkJn97q8v2CRYFwwjjUfTUngu7B4vPr2aeYUuj

privateKey(seed) // G5vK6wVrqoUdcM2v7q716KUbe1xNnkEmUxQnPKEySpjd

keyPair(seed) // { publicKey: 'Fjyw5xkkJn97q8v2CRYFwwjjUfTUngu7B4vPr2aeYUuj', privateKey: 'G5vK6wVrqoUdcM2v7q716KUbe1xNnkEmUxQnPKEySpjd' }
