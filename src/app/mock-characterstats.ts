import { CharacterStat } from './CharacterStat'

export const CHARACTERSTATS: { [id: string] : CharacterStat[] } = {
    'brahl': [
        new CharacterStat('r0c6', 'Health', 242, 300, 'MDC'),
        new CharacterStat('dr60', 'Attacks', 6, 6, 'Action'),
        new CharacterStat('xn7t', 'PPE', 65, 235, 'PPE'),
        new CharacterStat('icr8', 'Experience', 12000, 0, 'XP'),
        new CharacterStat('lo5m', 'Savings', 4803951, 0, 'Credit'),
        new CharacterStat('nn93', 'Belofski', 50, 50, 'Ammo'),
        new CharacterStat('b0vq', 'Dragon Fire', 5, 5, 'Ammo')
    ],
    'daren': [
        new CharacterStat('845j', 'Health', 29, 90, 'MDC')
    ],
    'erin': [
        new CharacterStat('5zt0', 'PPE', 160, 272, 'PPE'),
        new CharacterStat('58a0', 'Battery', 500, 500, 'PPE'),
        new CharacterStat('fhia', 'ISP', 191, 191, 'ISP'),
        new CharacterStat('h203', 'Attacks', 3, 6, 'Attacks'),
        new CharacterStat('2x1f', 'Lightning Strikes', 37, 40, 'Charge'),
        new CharacterStat('x7wq', 'Experience', 29005, 0, 'XP'),
        new CharacterStat('bizf', 'Savings', 155300, 0, 'Credit'),
        new CharacterStat('i758', 'Spell Armor', 80, 80, 'MDC'),
        new CharacterStat('ggtt', 'Barrier', 8, 60, 'MDC')
    ],
    'thom': [
        new CharacterStat('9g5r', 'MDC', 213, 213, '!'),
        new CharacterStat('edqu', 'ISP', 172, 172, '?'),
        new CharacterStat('vst8', 'E Clip', 29, 30, '*'),
        new CharacterStat('kmwd', 'Current Clip', 37, 40, ')')
    ],
    'onyx': [
        new CharacterStat('3d9j', 'Rifle 2D4*10+20', 0, 0, 'Wronng1'),
        new CharacterStat('4lgf', 'Tx-46 Rifle 1D4*10+8', 0, 0, 'Wrong2'),
        new CharacterStat('n94k', 'Pistol 5D6', 0, 0, 'Wrong3'),
        new CharacterStat('yvyf', 'Force Field', 50, 0, 'Wrong4'),
        new CharacterStat('2fy1', 'Armor', 100, 100, 'MDC'),
        new CharacterStat('pgos', 'HP', 141, 141, 'MDC')
    ],
    'ura': [
        new CharacterStat('m6nh', 'Health', 165, 165, 'MDC'),
        new CharacterStat('u598', 'PPE', 414, 414, 'PPE'),
        new CharacterStat('quuk', 'ISP', 18, 18, 'ISP'),
        new CharacterStat('7kre', 'Attacks', 5, 5, 'Actions'),
        new CharacterStat('qvl3', 'Experience', 15000, 0, 'XP'),
        new CharacterStat('cocz', 'Savings', 15000, 0, 'Credit'),
        new CharacterStat('mjkd', 'NE4', 11, 0, 'Round')
    ]
}