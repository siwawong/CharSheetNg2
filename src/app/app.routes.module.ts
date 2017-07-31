import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddstatComponent } from './addstat/addstat.component';
import { AddCharacterComponent} from './add-character/add-character.component';
import { CharlistComponent } from './charlist/charlist.component';
import { CharsheetComponent } from './charsheet/charsheet.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
    { path: '',                     component: LoginComponent },
    { path: 'addStat',              component: AddstatComponent },
    { path: 'addCharacter',         component: AddCharacterComponent },
    { path: ':user',                component: CharlistComponent },
    { path: ':user/:name',          component: CharsheetComponent },
    { path: ':user/:name/add-stat', component: AddstatComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
