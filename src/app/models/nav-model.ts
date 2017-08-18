import { CharacterListPage } from '../../pages/character-list/character-list';
import { CharacterSheetPage } from '../../pages/character-sheet/character-sheet';
import { CreateCharacterPage } from '../../pages/create-character/create-character';
import { CreateStatPage } from '../../pages/create-stat/create-stat';
import { CreateUserPage } from '../../pages/create-user/create-user';
import { LoginUserPage } from '../../pages/login-user/login-user';

export const PAGES = {
    'login': LoginUserPage,
    'createUser': CreateUserPage,
    'charList': CharacterListPage,
    'createChar': CreateCharacterPage,
    'charSheet': CharacterSheetPage,
    'createStat': CreateStatPage
};