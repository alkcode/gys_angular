import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Perfil, PerfilClass } from 'src/app/interfaces/perfiles';
import { GestionGuardiasService } from 'src/app/services/gestion-guardias.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent {
  perfil: Perfil = new PerfilClass;
  opcionesForm: any[] = [];

// Inicializamos el formulario
  formOpciones: FormGroup = new FormGroup({});

  actLectura: boolean = false;
  actActualizacion: boolean = false;
  actCreacion: boolean = false;
  actEliminacion: boolean = false;

  valorLectura: number = -1;
  valorActualizacion: number = -2;
  valorCreacion: number = -4;
  valorEliminacion: number = -8;

  totalIDNivelAcceso = 0;
  
  constructor(private fb:FormBuilder,
              private gestionGuardiasService:GestionGuardiasService
              ){}

  ngOnInit(){

    this.gestionGuardiasService.mostrarPerfiles(1)
        .subscribe(data =>{
          this.perfil = data;   //Todos los datos
          this.opcionesForm = this.perfil.opciones; //Las opciones
          console.log(this.perfil);
          console.log(this.opcionesForm[0].descripcion);
          console.log(this.opcionesForm[1].descripcion);
          
          this.crearFormularioOpciones(this.perfil);
          
          this.opcionesForm.forEach((element, index)=>{

            const opc= this.fb.group({
              // opciones: new FormControl(this.opcionesForm[index].descripcion)
              idOpcion:  this.fb.control(this.opcionesForm[index].idOpcion),
              descripcion: this.fb.control(this.opcionesForm[index].descripcion),
              componente: this.fb.control(this.opcionesForm[index].componente),
              idNivelAcceso:  this.fb.control(this.totalIDNivelAcceso),
              // idNivelAcceso:  this.fb.control(this.opcionesForm[index].idNivelAcceso),
              lectura: this.fb.control(false),
              creacion: this.fb.control(false),
              actualizacion: this.fb.control(false),
              eliminacion: this.fb.control(false),
              // permisos: this.fb.array([
              //   this.fb.group({
              //     lectura:[false],
              //     creacion:[false],
              //     actualizacion:[false],
              //     eliminacion:[false]
              //   })
              // ])
            });

            this.opcionesArray.push(opc);

          });
          
        })

  }

  // Creacion del formluario
  crearFormularioOpciones(data:any){
 
    this.formOpciones = this.fb.group({
      descripcion:[data.descripcion, [Validators.required, Validators.minLength(4)]],
      idPerfil:[data.idPerfil,[Validators.required]],
      opciones: this.fb.array([])
    })

    
  }

  get opcionesArray(): FormArray {
    return this.formOpciones.get('opciones') as FormArray;
  }

  // get opcionesArray(): FormArray {
  //   return <FormArray>this.formOpciones.get('opciones') as FormArray;
  // }


  permisoLectura() {
    this.actLectura = !this.actLectura;
    this.valorLectura = this.valorLectura * (-1);

  }

  permisoActualizacion() {
    this.actActualizacion = !this.actActualizacion;
    if (this.actActualizacion == true) {
      this.valorActualizacion = this.valorActualizacion * (-1);
    }
  }

  permisoCreacion() {
    this.actCreacion = !this.actCreacion;
    if (this.actCreacion == true) {
      this.valorCreacion = this.valorCreacion * (-1);
    }
  }

  permisoEliminacion() {
    this.actEliminacion = !this.actEliminacion;
    if (this.actEliminacion == true) {
      this.valorEliminacion = this.valorEliminacion * (-1);
    }
  }

  enviarDatos(){
    console.log('Formulario:',this.formOpciones.value);
    
  }
}
