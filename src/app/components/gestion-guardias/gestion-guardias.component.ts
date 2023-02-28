import { Component, Input } from '@angular/core';
import { Perfil, PerfilClass } from '../../interfaces/perfiles';
import { GestionGuardiasService } from 'src/app/services/gestion-guardias.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GestionUsuariosService } from 'src/app/services/gestion-usuarios.service';
import { Empleado, EmpleadoClass } from 'src/app/interfaces/empleado';
import { Usuario, UsuarioClass } from 'src/app/interfaces/usuario';
import { Opcion } from 'src/app/interfaces/opcion';
// import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-guardias',
  templateUrl: './gestion-guardias.component.html',
  styleUrls: ['./gestion-guardias.component.css']
})
export class GestionGuardiasComponent {

  @Input() usuario: any | undefined;
 
  perfil: Perfil = new PerfilClass;
  empleado: Empleado =  new EmpleadoClass;
  usuarioData: Usuario = new UsuarioClass;

  opcionesAux:any[]=[];

  opcionesForm: any[] = [];

  private valorLectura: number = 1;
  private valorActualizacion: number = 2;
  private valorCreacion: number = 4;
  private valorEliminacion: number = 8;

  totalIDNivelAcceso:number = 0;


  // Inicializar formGroup para el formulario
  formOpciones: FormGroup = new FormGroup({});

  constructor(private gestionGuardiaService: GestionGuardiasService,
              private gestionUsuarioService: GestionUsuariosService,
              private fb: FormBuilder) {
    // this.formularioPerfil();
  }

  ngOnInit() {
    // console.log('Hola',typeof(this.usuario.empleado));
    console.log('Hola:',this.usuario);
    this.getEmpleadoData(this.usuario.empleado);
    
    this.mostrarPerfiles(this.usuario.perfil.idPerfil);

  }

  mostrarPerfiles(opcion: any) {
    this.gestionGuardiaService.mostrarPerfiles(opcion)
    .subscribe(data =>{
      this.perfil = data;   //Todos los datos
      this.opcionesForm = this.perfil.opciones; //Las opciones
      console.log('Datos del perfil:',this.perfil);
      // console.log(this.opcionesForm[0].descripcion);
      // console.log(this.opcionesForm[1].descripcion);
      
      this.crearFormularioOpciones(this.perfil);
      
      this.opcionesForm.forEach((element, index)=>{

        const opc= this.fb.group({
          idOpcion:  this.fb.control(this.opcionesForm[index].idOpcion),
          descripcion: this.fb.control(this.opcionesForm[index].descripcion),
          componente: this.fb.control(this.opcionesForm[index].componente),
          idNivelAcceso:  this.fb.control(this.totalIDNivelAcceso),
          // idNivelAcceso:  this.fb.control(this.opcionesForm[index].idNivelAcceso),
          lectura: this.fb.control(false),
          creacion: this.fb.control(false),
          actualizacion: this.fb.control(false),
          eliminacion: this.fb.control(false),

        });

        this.opcionesArray.push(opc);

      });
      
    })

  }


  getEmpleadoData(idEmpleado:number){
    this.gestionUsuarioService.getValidarEmpleado(idEmpleado)
      .subscribe(data=>{
        this.empleado = data;
        console.log(this.empleado);
        
      },error=>{
        console.log(error);
        
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

  permisoLectura(i:number) {
    console.log(i);
    let permisoLectura = this.formOpciones.get('opciones')?.value[i].lectura;
    // console.log('Su permiso esta:',permisoLectura);
    permisoLectura = !permisoLectura;
  
    if(permisoLectura){
      let b = this.formOpciones.get('opciones')?.value[i].idNivelAcceso;
      let desc = this.formOpciones.get('opciones')?.value[i].descripcion;
      console.log(b+' '+desc);
      b = b + this.valorLectura;
      (this.formOpciones.get('opciones') as FormArray).at(i).get('idNivelAcceso')?.patchValue(b);
    } else {
      let b = this.formOpciones.get('opciones')?.value[i].idNivelAcceso;
      b = b - this.valorLectura;
      (this.formOpciones.get('opciones') as FormArray).at(i).get('idNivelAcceso')?.patchValue(b);
    }
  }

  permisoActualizacion(i:number) {
    console.log(i);
    let permisoActualizacion = this.formOpciones.get('opciones')?.value[i].actualizacion;
    // console.log('Su permiso esta:',permisoActualizacion);
    permisoActualizacion = !permisoActualizacion;
  
    if(permisoActualizacion){
      let b = this.formOpciones.get('opciones')?.value[i].idNivelAcceso;
      let desc = this.formOpciones.get('opciones')?.value[i].descripcion;
      console.log(b+' '+desc);
      b = b + this.valorActualizacion;
      (this.formOpciones.get('opciones') as FormArray).at(i).get('idNivelAcceso')?.patchValue(b);
    } else {
      let b = this.formOpciones.get('opciones')?.value[i].idNivelAcceso;
      b = b - this.valorActualizacion;
      (this.formOpciones.get('opciones') as FormArray).at(i).get('idNivelAcceso')?.patchValue(b);
    }
    // }
  }

  permisoCreacion(i:number) {

    console.log(i);
    let permisoCreacion = this.formOpciones.get('opciones')?.value[i].creacion;
    // console.log('Su permiso esta:',permisoCreacion);
    permisoCreacion = !permisoCreacion;
  
    if(permisoCreacion){
      let b = this.formOpciones.get('opciones')?.value[i].idNivelAcceso;
      let desc = this.formOpciones.get('opciones')?.value[i].descripcion;
      console.log(b+' '+desc);
      b = b + this.valorCreacion;
      (this.formOpciones.get('opciones') as FormArray).at(i).get('idNivelAcceso')?.patchValue(b);
    } else {
      let b = this.formOpciones.get('opciones')?.value[i].idNivelAcceso;
      b = b - this.valorCreacion;
      (this.formOpciones.get('opciones') as FormArray).at(i).get('idNivelAcceso')?.patchValue(b);
    }
  }

  permisoEliminacion(i:number) {

    console.log(i);
    let permisoEliminacion = this.formOpciones.get('opciones')?.value[i].eliminacion;
    // console.log('Su permiso esta:',permisoEliminacion);
    permisoEliminacion = !permisoEliminacion;
  
    if(permisoEliminacion){
      let b = this.formOpciones.get('opciones')?.value[i].idNivelAcceso;
      let desc = this.formOpciones.get('opciones')?.value[i].descripcion;
      console.log(b+' '+desc);
      b = b + this.valorEliminacion;
      (this.formOpciones.get('opciones') as FormArray).at(i).get('idNivelAcceso')?.patchValue(b);
    } else {
      let b = this.formOpciones.get('opciones')?.value[i].idNivelAcceso;
      b = b - this.valorEliminacion;
      (this.formOpciones.get('opciones') as FormArray).at(i).get('idNivelAcceso')?.patchValue(b);
    }
  }

  enviarDatos(){
    console.log('Formulario:',this.formOpciones.value.opciones);

    // console.log('Opciones de perfil:',this.opciones);
    
    // alert('Fromulario:' + JSON.stringify(this.formOpciones.value.opciones))
    let usuario: Usuario;
    usuario={
      clave:this.usuario.clave,
      password:this.usuario.contrasena,
      empleado: this.empleado,
      perfiles:[
        {
          idPerfil: this.usuario.perfil.idPerfil,
          descripcion: this.perfil.descripcion,
          opciones: this.formOpciones.value.opciones
        }
      ]
      // Falta el apartado de usuarios[]
    };

    console.log(JSON.stringify(usuario));
    // console.log(usuario);
    
  }

}
