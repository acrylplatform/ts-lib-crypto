import { signBytes } from '@acryl/ts-lib-crypto'

const bytes = [117, 110, 99, 108, 101]
const seed = 'uncle push human bus echo drastic garden joke sand warfare sentence fossil title color combine'

signBytes(seed, bytes) // 3JSskcaZVTuGzNSnWtMMRV2Zja3J1RJ8d1ff6CxqXocMaZdgooKnMHVtBmngt226ZXEyAQ4hxfphjZroArPSZKGC