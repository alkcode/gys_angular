import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Perfiles } from '../../interfaces/perfiles';
import { GestionGuardiasService } from 'src/app/services/gestion-guardias.service';
import { Observable, of } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-guardias',
  templateUrl: './gestion-guardias.component.html',
  styleUrls: ['./gestion-guardias.component.css']
})
export class GestionGuardiasComponent{

  @Input() clave='';
  @Input() contrasena='';
  @Input() contrasena2='';
  @Input() nombre='';
  @Input() perfil!: string;
  @Input() idPerfil!: string;

  // Activador de los permisos
  actLectura: boolean = false;
  actActualizacion: boolean = false;
  actCreacion: boolean = false;
  actEliminacion: boolean = false;

  valorLectura:number=0;
  valorActualizacion:number=0;
  valorCreacion:number=0;
  valorEliminacion:number=0;


  perfiles: Perfiles[]=[];
  // perfiles: Perfiles = {} as Perfiles;

  formPerfil: FormGroup = new FormGroup({});

  // listaPerfiles$: Observable<Perfiles> = of({} as Perfiles);

  constructor(private gestionGuardiaService:GestionGuardiasService) {
    this.idPerfil;
    this.perfil;
   }

  ngOnInit(){
    this.mostrarPerfiles(this.idPerfil);
    this.formularioPerfil();
  }

  mostrarPerfiles(opcion:string){
    this.gestionGuardiaService.mostrarPerfiles$(opcion)
        .subscribe(data=>{
          // console.log(data);
          // this.perfiles = data;
          this.perfiles = data;
          console.log(this.perfiles);
          console.log(this.perfiles[1]['descripcion']);
          console.log(this.perfiles[0].descripcion);
          


        },error=>{
          console.log(error);
        });
    console.log('Hola');
    // this.listaPerfiles$ = this.gestionGuardiaService.mostrarPerfiles$(opcion);

  }

  formularioPerfil(){
    this.formPerfil= new FormGroup({
      lectura: new FormControl(true),
      actualizacion: new FormControl(false),
      creacion: new FormControl(false),
      eliminacion: new FormControl(false)
    });
  }

  permisoLectura(){
    this.actLectura = !this.actLectura;
    if(this.actLectura==true){
      this.valorLectura=1;
    }
  }

  permisoActualizacion(){
    this.actActualizacion = !this.actActualizacion;
    if(this.actActualizacion==true){
      this.valorActualizacion=2;
    }
  }

  permisoCreacion(){
    this.actCreacion = !this.actCreacion;
    if(this.actCreacion==true){
      this.valorCreacion=4;
    }
  }

  permisoEliminacion(){
    this.actEliminacion = !this.actEliminacion;
    if(this.actEliminacion==true){
      this.valorCreacion=8;
    }
  }
}
