import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

import { UserState } from '../store/reducers/user-reducer';

import { Character } from '../models/character-model';
import { CharacterStat } from '../models/stat-model';

// Likely Need more unique names?
const STORAGE = {
    USERKEY: 'UserState',
    CHARACTERSKEY: 'CharMetaState',
    STATSKEY: 'StatMetaState',
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

    remUserState() {
        return this.removeItem(STORAGE.USERKEY);
    }

    setCharMetaState(ids: string[], selectedId: string) {
        return this.setItem(STORAGE.CHARACTERSKEY, {ids, selectedId});
    }

    getCharMetaState() {
        return this.getItem(STORAGE.CHARACTERSKEY);
    }

    remCharMetaState() {
        return this.removeItem(STORAGE.CHARACTERSKEY);
    }

    addChar(ids: string[], selected: string, char: Character) {
        this.setCharMetaState(ids, selected);
        this.setItem(char.id, char);
        return char;
    }

    setChar(char: Character) {
        this.setItem(char.id, char);
    }

    remChar(ids: string[], selected: string, charId: string) {
        this.setCharMetaState(ids, selected);
        this.removeItem(charId);
    }

    setChars(chars: Character[]) {
        chars.map((char) => {
            this.setItem(char.id, char);
        });
    }

    getChars() {
        // let newChars: Character[];
        return this.getCharMetaState().then((meta) => {
            let promises = meta.ids.map((id) => {
                return this.getItem(id).then((char) => {
                    // newChars.push(char);
                    return char;
                });
            });
            return Promise.all(promises).then((chars) => {
                return {chars: chars, selected: meta.selectedId};
            });
        });
    }

    remChars() {
        this.getCharMetaState().then((meta) => {
            meta.ids.map((id) => {
                this.removeItem(id);
            });
        });
        this.remCharMetaState();
    }

    setStatMetaState(ids: string[], selectedId: string) {
        return this.setItem(STORAGE.STATSKEY, {ids, selectedId});
    }

    getStatMetaState() {
        return this.getItem(STORAGE.STATSKEY);
    }

    remStatState() {
        return this.removeItem(STORAGE.STATSKEY);
    }

    addStat(ids: string[], selected: string, stat: CharacterStat) {
        this.setStatMetaState(ids, selected);
        this.setItem(stat.id, stat);
    }

    setStat(stat: CharacterStat) {
        this.setItem(stat.id, stat);
    }

    remStat(ids: string[], selected: string, statId: string) {
        this.setStatMetaState(ids, selected);
        this.removeItem(statId);
    }

    setStats(stats: CharacterStat[]) {
        stats.map((stat) => {
            this.setItem(stat.id, stat);
        });
    }

    getStats(ids: string[]) {
        // let newStats: CharacterStat[];
        let promises = ids.map((id) => {
            return this.getItem(id).then((stat) => {
                return stat;
            });
        });
        return Promise.all(promises).then((results) => {
            return results;
        });
    }

    remStats() {
        this.getStatMetaState().then((meta) => {
            meta.ids.map((id) => {
                this.removeItem(id);
            });
        });
        this.remStatState();
    }

    private getItem(KEY: string) {
        return this.storage.get(KEY).then((value) => {
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
            // return value;
        }).catch((error) => {
            console.log(error);          
            // return error;
        })
    }

    private removeItem(KEY: string) {
        this.storage.remove(KEY).then(() => {
            console.log('DONE');
        }).catch((error) => {
            console.log(error);
            // return error;
        });
    }
}