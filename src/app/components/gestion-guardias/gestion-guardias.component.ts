import { Component, Input } from '@angular/core';
import { Perfil, PerfilClass } from '../../interfaces/perfiles';
import { GestionGuardiasService } from 'src/app/services/gestion-guardias.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  valorLectura:number=-1;
  valorActualizacion:number=-2;
  valorCreacion:number=-4;
  valorEliminacion:number=8;

  permisosData = [
    { val: 1, name: 'Lectura' },
    { id: 2, name: 'Actualización' },
    { id: 4, name: 'Creación' },
    { id: 8, name: 'Eliminacion' }
  ];

  // Inicializar formGroup para el formulario
  formPerfil: FormGroup = new FormGroup({});


  constructor(private gestionGuardiaService:GestionGuardiasService, 
    private fb: FormBuilder) {
    this.formularioPerfil();
   }

  ngOnInit(){
    
    console.log(this.usuario);
    
    this.mostrarPerfiles(this.usuario.idPerfil);
    // this.formularioPerfil();
  
  }

  mostrarPerfiles(opcion:any){
    this.gestionGuardiaService.mostrarPerfiles$(opcion)
        .subscribe(data=>{
          this.perfil = data;
          console.log(this.perfil);
          console.log(this.perfil.opciones);
          console.log(this.perfil.descripcion);

        },error=>{
          console.log(error);
        });
    console.log('Hola');

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
    this.valorLectura=this.valorLectura * (-1);

  }

  permisoActualizacion(){
    this.actActualizacion = !this.actActualizacion;
    if(this.actActualizacion==true){
      this.valorActualizacion=this.valorActualizacion * (-1);
    }
  }

  permisoCreacion(){
    this.actCreacion = !this.actCreacion;
    if(this.actCreacion==true){
      this.valorCreacion=this.valorCreacion * (-1);
    }
  }

  permisoEliminacion(){
    this.actEliminacion = !this.actEliminacion;
    if(this.actEliminacion==true){
      this.valorEliminacion= this.valorEliminacion * (-1);
    }
  }
}
