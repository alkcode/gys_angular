import { Component, Input } from '@angular/core';
import { Perfil, PerfilClass } from '../../interfaces/perfiles';
import { GestionGuardiasService } from 'src/app/services/gestion-guardias.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GestionUsuariosService } from 'src/app/services/gestion-usuarios.service';
import { Empleado, EmpleadoClass } from 'src/app/interfaces/empleado';
import { Usuario, UsuarioClass } from 'src/app/interfaces/usuario';
import { Opcion } from 'src/app/interfaces/opcion';
import { UsuarioService } from 'src/app/services/usuario.service';

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

  opciones:Opcion[]=[];

  opcionesForm: any[] = [];

  private valorLectura: number = 1;
  private valorCreacion: number = 2;
  private valorActualizacion: number = 4;
  private valorEliminacion: number = 8;

  totalIDNivelAcceso:number = 0;


  // Inicializar formGroup para el formulario
  formOpciones: FormGroup = new FormGroup({});

  constructor(private gestionGuardiaService: GestionGuardiasService,
              private gestionUsuarioService: GestionUsuariosService,
              private usuarioService:UsuarioService,
              private fb: FormBuilder) {
    // this.formularioPerfil();
  }

  ngOnInit() {
    // console.log('Hola',typeof(this.usuario.empleado));
    console.log('Hola:',this.usuario);
    this.getEmpleadoData(this.usuario.empleado);
    
    this.mostrarPerfiles(this.usuario.perfil);

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

       // let data = this.formEditUsuario.get('perfiles');
        // console.log('Datos de get', data);

        // let data2 = this.formOpciones.controls['opciones'];
        // console.log('Datos de controls', data2);

        let data3 = this.opcionesArray.controls;
        console.log('Controls generico',data3);
        
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

  get opcionesArray(){
    return this.formOpciones.get('opciones') as FormArray;
  }

  permisoLectura(i:number) {
    console.log(i);
    let permisoLectura = this.formOpciones.get('opciones')?.value[i].lectura;
    // console.log('Su permiso esta:',permisoLectura);
    permisoLectura = !permisoLectura;
  
    if(permisoLectura){
      let b = this.formOpciones.get('opciones')?.value[i].idNivelAcceso;
      console.log(b);
      
      let desc = this.formOpciones.get('opciones')?.value[i].descripcion;
      // console.log(b+' '+desc);
      b = b + this.valorLectura;
      console.log('Este es el importante',(this.formOpciones.get('opciones') as FormArray).at(i).get('idNivelAcceso'));
      
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
      // console.log(b+' '+desc);
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
      // console.log(b+' '+desc);
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
      // console.log(b+' '+desc);
      b = b + this.valorEliminacion;
      (this.formOpciones.get('opciones') as FormArray).at(i).get('idNivelAcceso')?.patchValue(b);
    } else {
      let b = this.formOpciones.get('opciones')?.value[i].idNivelAcceso;
      b = b - this.valorEliminacion;
      (this.formOpciones.get('opciones') as FormArray).at(i).get('idNivelAcceso')?.patchValue(b);
    }
  }

  enviarDatos(){

    this.formOpciones.value.opciones.forEach((element:any, index:any)=>{
      console.log(index, typeof(element));
      delete element.lectura;
      delete element.actualizacion;
      delete element.creacion;  
      delete element.eliminacion;
      console.log(element);
      this.opciones.push(element);
    });

    console.log('Arreglo final:',this.opciones);
    

    console.log('Formulario:',this.formOpciones.value.opciones);

    let usuario: Usuario;
    usuario={
      clave:this.usuario.clave,
      password:this.usuario.contrasena,
      empleado: this.empleado,
      perfiles:[
        { 
          idPerfil: this.usuario.perfil.idPerfil,
          descripcion: this.perfil.descripcion,
          opciones: this.opciones
          // opciones: this.formOpciones.value.opciones
        }
      ]
    };

    // this.usuarioService.saveUsuario(usuario)
    //   .subscribe(usu=>{
    //     console.log('Usuario creado:',usu);
        
    //   })
    console.log('JSON Final:',usuario);
    
  }

}
