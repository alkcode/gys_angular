import { getLocaleMonthNames } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Perfil } from 'src/app/interfaces/perfiles';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-mostrar-perfiles',
  templateUrl: './mostrar-perfiles.component.html',
  styleUrls: ['./mostrar-perfiles.component.css']
})
export class MostrarPerfilesComponent {

  listPerfiles: Perfil[] = [];

  constructor(private perfilService: PerfilService,
              private http:HttpClient){}

  ngOnInit(){
    console.log('Hola');
    this.mostrarPerfiles();
    
  }

  mostrarPerfiles(){
    this.perfilService.getPerfiles()
        .subscribe((res:Perfil[])=>{
          this.listPerfiles = res;
        },err=>{
          console.log(err);
          
        });
  }

  borrarPerfil(id:any){

  }

}
