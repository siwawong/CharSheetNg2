import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CharlistComponent } from './charlist/charlist.component';
import { CharsheetComponent } from './charsheet/charsheet.component';
import { AddstatComponent } from './addstat/addstat.component';
import { StatComponent } from './stat/stat.component';

import { routing, APP_ROUTER_PROVIDERS } from './app.routes';
import { CharacterListService } from './character-list.service';
import { CharacterStatsService } from './character-stats.service';
import { LoginService} from './login.service';
import { HttpService } from './http.service'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CharlistComponent,
    CharsheetComponent,
    AddstatComponent,
    StatComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    HttpModule
  ],
  providers: [
    APP_ROUTER_PROVIDERS,
    HttpService,
    CharacterListService,
    CharacterStatsService,
    LoginService
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
