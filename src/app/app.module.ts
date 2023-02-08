import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataTablesModule } from "angular-datatables";
import { BolsaTrabajoComponent } from './components/bolsa-trabajo/bolsa-trabajo.component';
import { HeaderComponent } from './shared/header/header.component';
import { MenuComponent } from './shared/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroBolsaTrabajoComponent } from './components/registro-bolsa-trabajo/registro-bolsa-trabajo.component';


@NgModule({
  declarations: [
    AppComponent,
    BolsaTrabajoComponent,
    HeaderComponent,
    MenuComponent,
    HomeComponent,
    LoginComponent,
    RegistroBolsaTrabajoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  exports:[
    HeaderComponent,
    MenuComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
