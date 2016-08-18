import { Routes, RouterModule } from '@angular/router'

import { AddstatComponent } from "./addstat"
import { CharlistComponent } from "./charlist"
import { CharsheetComponent } from "./charsheet"
import { LoginComponent } from "./login"

export const routes: Routes = [
    { path: "",                  component: LoginComponent },
    { path: ":user",   
      component: CharlistComponent
    },
    {
        path: ":user/:name",
        component: CharsheetComponent
    },
    {   path: "addStat", 
        component: AddstatComponent
    }
];

export const APP_ROUTER_PROVIDERS:any = [
    
];

export const routing = RouterModule.forRoot(routes);