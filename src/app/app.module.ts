import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// store import
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// import { StoreRouterConnectingModule } from '@ngrx/router-store';

// import { routes } from './routes';
import { reducers } from './store/reducers';
import { effects } from './store/effects';

import { AppComponent } from './app.component';
// import { LoginComponent } from './user/login/login.component';
// import { CreateUserComponent } from './user/create/create.component';
// import { CharlistComponent } from './charlist/charlist.component';
// import { CharsheetComponent } from './charsheet/charsheet.component';


import { LoginUserPage } from '../pages/login-user/login-user';
import { CreateUserPage } from '../pages/create-user/create-user';
import { CharacterListPage } from '../pages/character-list/character-list';
import { CreateCharacterPage } from '../pages/create-character/create-character';
import { CharacterSheetPage } from '../pages/character-sheet/character-sheet';
import { CreateStatPage } from '../pages/create-stat/create-stat';

import { HttpService } from './services/http.service';

@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    // CreateUserComponent,
    // CharlistComponent,
    // CharsheetComponent,
    LoginUserPage,
    CreateUserPage,
    CharacterListPage,
    CreateCharacterPage,
    CharacterSheetPage,
    CreateStatPage
  ],
  entryComponents: [
    AppComponent,
    LoginUserPage,
    CreateUserPage,
    CharacterListPage,
    CreateCharacterPage,
    CharacterSheetPage,
    CreateStatPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(AppComponent),
    ReactiveFormsModule,
    // RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers),
    // StoreRouterConnectingModule,
    EffectsModule.forRoot(effects),
    HttpModule
  ],
  providers: [
    HttpService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  bootstrap: [IonicApp]
})
export class AppModule {

}
