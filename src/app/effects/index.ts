import { AuthEffects } from './auth';
import { UserEffects } from './user';
import { CharacterEffects } from './character';
import { StatEffects } from './character-stat.effects';

export const effects = [
    AuthEffects,
    UserEffects,
    CharacterEffects,
    StatEffects
];
// effects.push(AuthEffects);
// effects.push(UserEffects);
// effects.push(CharacterEffects);
