import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing, APP_ROUTER_PROVIDERS } from './app.routes';
import { CharacterListService } from './character-list.service';
import { CharacterStatsService } from './character-stats.service';
import { LoginService} from './login.service';
import { HttpService } from './http.service'


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
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
