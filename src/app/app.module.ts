import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InicialComponent } from './inicial/inicial.component'
import { TecnicaComponent } from './tecnica/tecnica.component';
import { RankingComponent } from './ranking/ranking.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing/app-rounting.module';

@NgModule({
  declarations: [
    AppComponent,
    InicialComponent,
    TecnicaComponent,
    RankingComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
