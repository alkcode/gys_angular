import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataTablesModule } from "angular-datatables";
import { BolsaTrabajoComponent } from './components/bolsa-trabajo/bolsa-trabajo.component';
import { HeaderComponent } from './shared/header/header.component';
import { MenuComponent } from './shared/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroBolsaTrabajoComponent } from './components/registro-bolsa-trabajo/registro-bolsa-trabajo.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistroGuardiasComponent } from './components/registro-guardias/registro-guardias.component';
import { GestionUsuariosComponent } from './components/gestion-usuarios/gestion-usuarios.component';
import { GestionGuardiasComponent } from './components/gestion-guardias/gestion-guardias.component';
import { ObjToArrayPipe } from './pipe/obj-to-array.pipe';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
// import { CheckboxComponent } from './components/checkbox/checkbox.component';


@NgModule({
  declarations: [
    AppComponent,
    BolsaTrabajoComponent,
    HeaderComponent,
    MenuComponent,
    HomeComponent,
    LoginComponent,
    RegistroBolsaTrabajoComponent,
    RegistroGuardiasComponent,
    GestionUsuariosComponent,
    GestionGuardiasComponent,
    ObjToArrayPipe,
    UsuariosComponent,
    EditarUsuarioComponent,
    // CheckboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    NgbModule,
    CommonModule
  ],
  exports:[
    HeaderComponent,
    MenuComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
