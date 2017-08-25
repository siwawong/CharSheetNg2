import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

const STORAGE = {
    USERKEY: 'UserState',
    AUTHKEY: 'AuthState',
    CHARACTERSKEY: 'CharState',
    STATSKEY: 'StatsState',
    PAGEKEY: 'PageState'
};

@Injectable()
export class StorageService {

    constructor(private storage: Storage) { }

    setAuthState(auth: string) {
        return this.setItem(STORAGE.AUTHKEY, auth);
    }

    getAuthState() {
        return this.getItem(STORAGE.AUTHKEY);
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
}