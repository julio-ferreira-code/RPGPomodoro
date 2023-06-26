import { Routes } from "@angular/router";
import { CadastroComponent } from "../cadastro/cadastro.component";
import { InicialComponent } from "../inicial/inicial.component";
import { LoginComponent } from "../login/login.component";
import { RankingComponent } from "../ranking/ranking.component";
import { TecnicaComponent} from "../tecnica/tecnica.component";

export const routes: Routes = [
  {path: 'inicial', component: InicialComponent},
  {path: 'login',component: LoginComponent},
  {path: 'ranking', component: RankingComponent},
  {path: 'tecnica', component: TecnicaComponent},
  {path: 'cadastro', component: CadastroComponent},
  {path:'', redirectTo: '/login', pathMatch:'full'}
];
