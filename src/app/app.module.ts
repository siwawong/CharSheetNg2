import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app.routes.module';

// store import
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
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
    CharlistComponent,
    CharsheetComponent,
    AddstatComponent,
    StatComponent,
    AddCharacterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    HttpModule
  ],
  providers: [
    AppRoutingModule,
    HttpService,
    // CharacterListService,
    // CharacterStatsService,
    // LoginService
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
