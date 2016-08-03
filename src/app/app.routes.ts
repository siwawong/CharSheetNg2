import { provideRouter, RouterConfig } from '@angular/router'

import { AddstatComponent } from "./addstat"
import { CharlistComponent } from "./charlist"
import { CharsheetComponent } from "./charsheet"
import { LoginComponent } from "./login"

export const routes: RouterConfig = [
    { path: "",                  component: LoginComponent },
    { path: ":user",   
      component: CharlistComponent
    //   children: [
    //       {path: ':name', component: CharsheetComponent}
    //   ] 
    },
    {
        path: ":user/:name",
        component: CharsheetComponent
    },
    // { path: "resourceList", component: CharsheetComponent },
    {   path: "addStat", 
        component: AddstatComponent}
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];