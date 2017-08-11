import { Routes } from '@angular/router';

// import { AddstatComponent } from './addstat/addstat.component';
// import { AddCharacterComponent} from './add-character/add-character.component';
import { CharlistComponent } from './charlist/charlist.component';
import { CharsheetComponent } from './charsheet/charsheet.component';
import { LoginComponent } from './user/login/login.component';
import { CreateUserComponent } from './user/create/create.component';

export const routes: Routes = [
    { path: '',                     component: LoginComponent },
    { path: 'Create',               component: CreateUserComponent },
    // { path: 'addStat',              component: AddstatComponent },
    // { path: 'addCharacter',         component: AddCharacterComponent },
    { path: ':user',                component: CharlistComponent },
    { path: ':user/:name',          component: CharsheetComponent }
    // { path: ':user/:name/add-stat', component: AddstatComponent }
];
