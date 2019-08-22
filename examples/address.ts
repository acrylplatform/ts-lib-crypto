import { address, TEST_NET_CHAIN_ID } from '@acryl/ts-lib-crypto'

const seed = 'uncle push human bus echo drastic garden joke sand warfare sentence fossil title color combine'
address(seed) // 3EHt9NerduyUBYP4qnf3FtnuNUeNfw22Lo9
address(seed, 'K') // 3JKGBDjqX1n6wiiTi2rNSk3dEmgx6z8jDP9
address(seed, TEST_NET_CHAIN_ID) // 3JKGBDjqX1n6wiiTi2rNSk3dEmgx6z8jDP9
