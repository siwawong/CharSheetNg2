import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// store import
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers } from './store/reducers';
import { effects } from './store/effects';

import { StorageService } from './services/storage.service';
import { HttpService } from './services/http.service';

import { AppComponent } from './app.component';
import { AppMenuComponent } from '../components/app-menu/app-menu';

import { LoginUserPageModule } from '../pages/login-user/login-user.module';
import { CreateUserPageModule } from '../pages/create-user/create-user.module';
import { CharacterListPageModule } from '../pages/character-list/character-list.module';
import { CreateCharacterPageModule } from '../pages/create-character/create-character.module';
import { CharacterSheetPageModule } from '../pages/character-sheet/character-sheet.module';
import { CreateStatPageModule } from '../pages/create-stat/create-stat.module';

@NgModule({
  declarations: [
    AppComponent,
    AppMenuComponent
  ],
  entryComponents: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(AppComponent),
    IonicStorageModule.forRoot({
      name: 'charSheetIonicDB'
      // driverOrder: ['sqlite', 'indexeddb', 'localstorage']
    }),
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    EffectsModule.forRoot(effects),
    HttpModule,
    LoginUserPageModule,
    CreateUserPageModule,
    CharacterListPageModule,
    CreateCharacterPageModule,
    CharacterSheetPageModule,
    CreateStatPageModule
  ],
  providers: [
    StorageService,
    HttpService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  bootstrap: [IonicApp]
})
export class AppModule {

}
