import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

import { UserState } from '../store/reducers/user-reducer';
import { StatState } from '../store/reducers/stat-reducer';
import { CharacterState } from '../store/reducers/character-reducer';


const STORAGE = {
    USERKEY: 'UserState',
    CHARACTERSKEY: 'CharState',
    STATSKEY: 'StatState',
    NAVKEY: 'NavState'
};

const STORAGE_V2 = {
    USERSTATE: {
        authToken: 'user.auth',
        id: 'user.id',
        name: 'user.name',
        email: 'user.email'
    },
    CHARACTERSTATE: {
        ids: 'character.ids', // -> [ ids ] 
        entities: 'character.entities', // -> charId
        selectedCharId: 'character.selectedId'
    },
    STATSTATE: {
        ids: 'stats.ids', // -> [ ids ] -> last 7 of associatedCharId + shortId
        stats: 'stat.stats', // -> statId
        selectedIndex: 'stat.selected'
    },
    NAVSTATE: {
        root: 'nav.root',
        stack: 'nav.stack'
    }
};

@Injectable()
export class StorageService {

    constructor(private storage: Storage) { }

    getDriver() {
        return this.storage.driver;
    }

    setUserState(user: UserState) {
        return this.setItem(STORAGE.USERKEY, user);
    }

    getUserState() {
        return this.getItem(STORAGE.USERKEY);
    }

    removeUserState() {
        return this.removeItem(STORAGE.USERKEY);
    }

    setNavState(root: string, stack: string) {
        return this.setItem(STORAGE.NAVKEY, {root, stack});
    }

    getNavState() {
        return this.getItem(STORAGE.NAVKEY);
    }

    removeNavState() {
        return this.removeItem(STORAGE.NAVKEY);
    }

    setStatState(stats: StatState) {
        return this.setItem(STORAGE.STATSKEY, stats);
    }

    getStatState() {
        return this.getItem(STORAGE.STATSKEY);
    }

    removeStatState() {
        return this.removeItem(STORAGE.STATSKEY);
    }

    setCharacterState(chars: CharacterState) {
        return this.setItem(STORAGE.CHARACTERSKEY, chars);
    }

    getCharacterState() {
        return this.getItem(STORAGE.CHARACTERSKEY);
    }

    removeCharacterState() {
        return this.removeItem(STORAGE.CHARACTERSKEY);
    }

    private getItem(KEY: string) {
        this.storage.get(KEY).then((value) => {
            console.log(value);          
            return value;
        }).catch((error) => {
            console.log(error);          
            return error;
        })
    }

    private setItem(KEY: string, data: any) {
        this.storage.set(KEY, data).then((value) => {
            console.log(value);          
            return value;
        }).catch((error) => {
            console.log(error);          
            return error;
        })
    }

    private removeItem(KEY: string) {
        this.storage.remove(KEY).then(() => {
            console.log('DONE');
        }).catch((error) => {
            console.log(error);
            return error;
        });
    }
}