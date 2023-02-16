import { Component, Input } from '@angular/core';
import { Perfil, PerfilClass, Usuario } from '../../interfaces/perfiles';
import { GestionGuardiasService } from 'src/app/services/gestion-guardias.service';
import { Observable, of } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
// import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-guardias',
  templateUrl: './gestion-guardias.component.html',
  styleUrls: ['./gestion-guardias.component.css']
})
export class GestionGuardiasComponent{

  @Input() usuario: any | undefined ;

  // perfil: Perfil = []; 
  perfil: Perfil = new PerfilClass;

  // Activador de los permisos
  actLectura: boolean = false;
  actActualizacion: boolean = false;
  actCreacion: boolean = false;
  actEliminacion: boolean = false;

  valorLectura:number=0;
  valorActualizacion:number=0;
  valorCreacion:number=0;
  valorEliminacion:number=0;

  // Inicializar formGroup para el formulario
  formPerfil: FormGroup = new FormGroup({});


  constructor(private gestionGuardiaService:GestionGuardiasService) {
   }

  ngOnInit(){
    
    console.log(this.usuario);
    
    this.mostrarPerfiles(this.usuario.idPerfil);
    this.formularioPerfil();
  
  }

  mostrarPerfiles(opcion:any){
    this.gestionGuardiaService.mostrarPerfiles$(opcion)
        .subscribe(data=>{
          // console.log(data);
          // this.perfiles = data;
          this.perfil = data;
          console.log(this.perfil);
          console.log(this.perfil.opciones);
          console.log(this.perfil.descripcion);
          


        },error=>{
          console.log(error);
        });
    console.log('Hola');
    // this.listaPerfiles$ = this.gestionGuardiaService.mostrarPerfiles$(opcion);

  }
// Formaulario
  formularioPerfil(){
    this.formPerfil= new FormGroup({
      lectura: new FormControl(false),
      actualizacion: new FormControl(false),
      creacion: new FormControl(false),
      eliminacion: new FormControl(false)
    });
  }
// Checkbox para asignarle permisos por opcion
  permisoLectura(){
    this.actLectura = !this.actLectura;
    if(this.actLectura==true){
      this.valorLectura=1*(-1);
    }
  }

  permisoActualizacion(){
    this.actActualizacion = !this.actActualizacion;
    if(this.actActualizacion==true){
      this.valorActualizacion=2*(-1);
    }
  }

  permisoCreacion(){
    this.actCreacion = !this.actCreacion;
    if(this.actCreacion==true){
      this.valorCreacion=4*(-1);
    }
  }

  permisoEliminacion(){
    this.actEliminacion = !this.actEliminacion;
    if(this.actEliminacion==true){
      this.valorCreacion=8*(-1);
    }
  }
}
