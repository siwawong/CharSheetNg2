import { CharacterStat } from './models/character-stat'

export var CHARACTERSTATS: { [id: string] : CharacterStat[] } = {
    'brahl': [
        {id: 'r0c6', name: 'Health', value: 242, maximum: 300, type: 'MDC'},
        {id: 'dr60', name: 'Attacks', value: 6, maximum: 6, type: 'Action'},
        {id: 'xn7t', name: 'PPE', value: 65, maximum: 235, type: 'PPE'},
        {id: 'icr8', name: 'Experience', value: 12000, maximum: 0, type: 'XP'},
        {id: 'lo5m', name: 'Savings', value: 4803951, maximum: 0, type: 'Credit'},
        {id: 'nn93', name: 'Belofski', value: 50, maximum: 50, type: 'Ammo'},
        {id: 'b0vq', name: 'Dragon Fire', value: 5, maximum: 5, type: 'Ammo'}
    ],
    'daren': [
        {id: '845j', name: 'Health', value: 29, maximum: 90, type: 'MDC'}
    ],
    'erin': [
        {id: '5zt0', name: 'PPE', value: 160, maximum: 272, type: 'PPE'},
        {id: '58a0', name: 'Battery', value: 500, maximum: 500, type: 'PPE'},
        {id: 'fhia', name: 'ISP', value: 191, maximum: 191, type: 'ISP'},
        {id: 'h203', name: 'Attacks', value: 3, maximum: 6, type: 'Attacks'},
        {id: '2x1f', name: 'Lightning Strikes', value: 37, maximum: 40, type: 'Charge'},
        {id: 'x7wq', name: 'Experience', value: 29005, maximum: 0, type: 'XP'},
        {id: 'bizf', name: 'Savings', value: 155300, maximum: 0, type: 'Credit'},
        {id: 'i758', name: 'Spell Armor', value: 80, maximum: 80, type: 'MDC'},
        {id: 'ggtt', name: 'Barrier',value:  8, maximum: 60, type: 'MDC'}
    ],
    'thom': [
        {id: '9g5r', name: 'MDC', value: 213, maximum: 213, type: '!'},
        {id: 'edqu', name: 'ISP', value: 172, maximum: 172, type: '?'},
        {id: 'vst8', name: 'E Clip', value: 29, maximum: 30, type: '*'},
        {id: 'kmwd', name: 'Current Clip', value: 37, maximum: 40, type: ')'}
    ],
    'onyx': [
        {id: '3d9j', name: 'Rifle 2D4*10+20', value: 0, maximum: 0, type: 'Wronng1'},
        {id: '4lgf', name: 'Tx-46 Rifle 1D4*10+8', value: 0, maximum: 0, type: 'Wrong2'},
        {id: 'n94k', name: 'Pistol 5D6',value:  0, maximum: 0, type: 'Wrong3'},
        {id: 'yvyf', name: 'Force Field', value: 50, maximum: 0, type: 'Wrong4'},
        {id: '2fy1', name: 'Armor', value: 100, maximum: 100, type: 'MDC'},
        {id: 'pgos', name: 'HP', value: 141, maximum: 141, type: 'MDC'}
    ],
    'ura': [
        {id: 'm6nh', name: 'Health', value: 165, maximum: 165, type: 'MDC'},
        {id: 'u598', name: 'PPE', value: 414, maximum: 414, type: 'PPE'},
        {id: 'quuk', name: 'ISP', value: 18, maximum: 18, type: 'ISP'},
        {id: '7kre', name: 'Attacks', value: 5, maximum: 5, type: 'Actions'},
        {id: 'qvl3', name: 'Experience', value: 15000, maximum: 0, type: 'XP'},
        {id: 'cocz', name: 'Savings', value: 15000, maximum: 0, type: 'Credit'},
        {id: 'mjkd', name: 'NE4', value: 11, maximum: 0, type: 'Round'}
    ]
}