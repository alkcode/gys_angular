import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BolsaTrabajoComponent } from './components/bolsa-trabajo/bolsa-trabajo.component';
import { CheckComponent } from './components/check/check.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { GestionUsuariosComponent } from './components/gestion-usuarios/gestion-usuarios.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OpcionesComponent } from './components/opciones/opciones.component';
import { PerfilesComponent } from './components/perfiles/perfiles.component';
import { RegistroBolsaTrabajoComponent } from './components/registro-bolsa-trabajo/registro-bolsa-trabajo.component';
import { RegistroGuardiasComponent } from './components/registro-guardias/registro-guardias.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

const routes: Routes = [
  {path:'auth', component:LoginComponent},
  {path: '', component:BolsaTrabajoComponent},
  {path:'home',component:HomeComponent},
  {path:'bolsa-trabajo', component:RegistroBolsaTrabajoComponent},
  {path:'registro-guardia', component:RegistroGuardiasComponent},
  {path:'gestion-usuarios',component:GestionUsuariosComponent},
  {path:'usuarios', component:UsuariosComponent},
  {path:'check', component:CheckComponent},
  {path:'modificar-usuario/:id', component:EditarUsuarioComponent},
  {path:'crear-opcion', component:OpcionesComponent},
  {path:'crear-perfil', component:PerfilesComponent},
  {path:'**', redirectTo:'auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
