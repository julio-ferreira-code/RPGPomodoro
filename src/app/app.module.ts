import { AudioService } from './services/audio.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule}  from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { InicialComponent } from './inicial/inicial.component'
import { TecnicaComponent } from './tecnica/tecnica.component';
import { RankingComponent } from './ranking/ranking.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing/app-rounting.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CadastroComponent } from './cadastro/cadastro.component';
import { baseURL } from './shared/baseURL';
import { UsuarioService } from './services/usuario.service';

@NgModule({
  declarations: [
    AppComponent,
    InicialComponent,
    TecnicaComponent,
    RankingComponent,
    LoginComponent,
    CadastroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatCardModule,
    MatGridListModule,
    HttpClientModule
  ],
  providers: [
    UsuarioService,
    AudioService,
    { provide: 'baseURL', useValue: baseURL }],
  bootstrap: [AppComponent]
})
export class AppModule { }
