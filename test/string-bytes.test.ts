import { stringToBytes, bytesToString } from '../src/conversions/string-bytes'

test('Correctly encode and decode utf-8 strings', () => {
  const latinStr = 'acrylplatform'
  const ruStr = 'платформа акрил'
  const emStr = '🏂По снегу'

  expect(bytesToString(stringToBytes(latinStr))).toEqual(latinStr)
  expect(bytesToString(stringToBytes(ruStr))).toEqual(ruStr)
  expect(bytesToString(stringToBytes(emStr))).toEqual(emStr)

})

