import { Routes, RouterModule } from '@angular/router'

import { AddstatComponent } from "./addstat"
import { AddCharacterComponent} from './add-character/add-character.component';
import { CharlistComponent } from "./charlist"
import { CharsheetComponent } from "./charsheet"
import { LoginComponent } from "./login"

export const routes: Routes = [
    { path: "",                  component: LoginComponent },
    {   path: "addStat", 
        component: AddstatComponent
    },
    {
        path: "addCharacter",
        component: AddCharacterComponent
    },
    { path: ":user",   
      component: CharlistComponent
    },
    {
        path: ":user/:name",
        component: CharsheetComponent
    },
    {
        path: ":user/:name/add-stat",
        component: AddstatComponent
    }
];

export const APP_ROUTER_PROVIDERS:any = [
    
];

export const routing = RouterModule.forRoot(routes);