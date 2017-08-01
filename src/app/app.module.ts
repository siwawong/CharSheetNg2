import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// store import
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { routes } from './routes';
import { reducers } from './reducers';
import { effects } from './effects';

import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { CreateUserComponent } from './user/create/create.component';
import { CharlistComponent } from './charlist/charlist.component';
import { CharsheetComponent } from './charsheet/charsheet.component';
import { AddstatComponent } from './addstat/addstat.component';
import { StatComponent } from './stat/stat.component';
import { AddCharacterComponent } from './add-character/add-character.component'

// import { CharacterListService } from './services/character-list.service';
// import { CharacterStatsService } from './services/character-stats.service';
// import { LoginService} from './services/login.service';
import { HttpService } from './services/http.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    CharlistComponent,
    CharsheetComponent,
    AddstatComponent,
    StatComponent,
    AddCharacterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    StoreModule.forRoot({routerReducer: reducers}),
    EffectsModule.forRoot(effects),
    RouterModule.forRoot(routes),
    StoreRouterConnectingModule,
    HttpModule
  ],
  providers: [
    HttpService,
    // CharacterListService,
    // CharacterStatsService,
    // LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
