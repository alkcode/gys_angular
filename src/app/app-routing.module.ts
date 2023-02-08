import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BolsaTrabajoComponent } from './components/bolsa-trabajo/bolsa-trabajo.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroBolsaTrabajoComponent } from './components/registro-bolsa-trabajo/registro-bolsa-trabajo.component';

const routes: Routes = [
  {path:'auth', component:LoginComponent},
  {path: '', component:BolsaTrabajoComponent},
  {path:'home',component:HomeComponent},
  {path:'bolsa-trabajo', component:RegistroBolsaTrabajoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
