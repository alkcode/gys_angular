import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router, TitleStrategy} from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Empleado, EmpleadoClass } from 'src/app/interfaces/empleado';
import { Opcion } from 'src/app/interfaces/opcion';
import { Perfil, PerfilClass } from 'src/app/interfaces/perfiles';
import { Usuario, UsuarioClass } from 'src/app/interfaces/usuario';
import { GestionUsuariosService } from 'src/app/services/gestion-usuarios.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ValidatorService } from 'src/app/validators/validator.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit{

  formEditUsuario: FormGroup = new FormGroup({});

  usuarioEdit: Usuario = new UsuarioClass;
  perfil: Perfil = new PerfilClass;
  opciones: Opcion[] = [];
  empleado: Empleado = new EmpleadoClass; 

  listaPerfiles: any[] = [];

  mostrarContrasena: boolean = false;
  mostrarContrasena2: boolean = false;
  
  private valorLectura: number = 1;
  private valorCreacion: number = 2;
  private valorActualizacion: number = 4;
  private valorEliminacion: number = 8;

  totalIDNivelAcceso:number = 0;


  usuario: Usuario | undefined;
  constructor(private fb:FormBuilder,
              private usuarioService:UsuarioService,
              private gestionUsuarioService:GestionUsuariosService,
              private activatedRoute:ActivatedRoute,
              private validators: ValidatorService,
              private router:Router
  ){}
  
  ngOnInit(): void {   

    const id = this.activatedRoute.snapshot.params["id"];
    // console.log(id);
    
    // this.formulario();
    this.callDataUsuario(id)
    this.llenarSelect();

  }

// Llamada y llenado de los datos del formulario
callDataUsuario(id:number){

  this.formulario();

  this.usuarioService.getUsuario(id)
      .subscribe(res =>{
        
        this.usuarioEdit = res;

        this.formEditUsuario.controls['idUsuario'].setValue(this.usuarioEdit.idUsuario)
        this.formEditUsuario.controls['clave'].setValue(this.usuarioEdit.clave)
        this.formEditUsuario.controls['password'].setValue(this.usuarioEdit.password)
        this.formEditUsuario.controls['contrasena2'].setValue(this.usuarioEdit.password)
        this.formEditUsuario.controls['empleado'].setValue(this.usuarioEdit.empleado)
        

        this.usuarioEdit.perfiles?.forEach((perfil,index)=>{
          this.perfil = perfil;
          console.log('Prueba',typeof(this.perfil));
          
          const per = this.fb.group({
            idPerfil: this.fb.control(this.perfil.idPerfil, [Validators.required]),
            descripcion: this.fb.control(this.perfil.descripcion, [Validators.required]),
            opciones: this.fb.array([

            ])

          });

          this.perfilesArray.push(per);

          const opcionesArray = this.perfilesArray.at(index).get('opciones') as FormArray;
          // console.log(opcionesArray);

          this.perfil.opciones.forEach((opcion, index)=>{
          
            const opc= this.fb.group({

              idOpcion:  this.fb.control(this.perfil.opciones[index].idOpcion),
              descripcion: this.fb.control(this.perfil.opciones[index].descripcion),
              componente: this.fb.control(this.perfil.opciones[index].componente),
              idNivelAcceso: this.fb.control(this.perfil.opciones[index].idNivelAcceso),
              lectura: this.fb.control(false),
              creacion: this.fb.control(false),
              actualizacion: this.fb.control(false),
              eliminacion: this.fb.control(false),
    
            });
  
            opcionesArray.push(opc);
          
          });

        })

      },err=>{
        console.log(err);
        
      })
}

get perfilesArray(): FormArray {
  // console.log('-------------->',(this.formEditUsuario.get('perfiles') as FormArray));
  return this.formEditUsuario.get('perfiles') as FormArray;
}

// Crear formulario
  formulario(){
    this.formEditUsuario = this.fb.group({
      idUsuario: this.fb.control('',[Validators.required]),
      clave: this.fb.control('', [Validators.required, Validators.minLength(4)]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
      contrasena2: this.fb.control('', [Validators.required, Validators.minLength(6)]),
      empleado: this.fb.group({
        id_sociedad: this.fb.control('',[Validators.required]),
        id_empleado: this.fb.control('', {
          validators:[Validators.required, Validators.minLength(6)],
          asyncValidators: [
            this.empleadoCheck(this.gestionUsuarioService)
          ],
          updateOn: 'blur'
        }),
        nombre: this.fb.control('',[Validators.required]), //['',[Validators.required]],
        apellido_1: this.fb.control('',[Validators.required]),
        apellido_2: this.fb.control('',[Validators.required]),
        id_legal: this.fb.control('',[Validators.required])
      }),

      perfiles: this.fb.array([])

    },{
      validators: this.validators.validarPassword('password', 'contrasena2')
    });
    
    
  }

   // Se llena el Select de las opciones de perfil
   llenarSelect(){
    this.gestionUsuarioService.getLlenarSelect()
    .subscribe(data => {
      this.listaPerfiles = data;
      // console.log(this.listaPerfiles);
      
    }, error => console.log(error));
  }

   // Funciones para mostrarla contraseña
   cambiarContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  cambiarContrasena2() {
    this.mostrarContrasena2 = !this.mostrarContrasena2;
  }

  campoNoValido( campo: string ) {
    return this.formEditUsuario.get(campo)?.invalid
            && this.formEditUsuario.get(campo)?.touched;
  }

    // Funcion para validar si el empleado(id_empleado) existe el la DB
    empleadoCheck(api:any):AsyncValidatorFn{
      console.log(api);
      
      return (control:AbstractControl)=>{
      
        return api.getValidarEmpleado(control.value)
        
        .pipe(
          tap({
            // next:x => console.log(x),
            next:x => console.log('Validado'),
          }),
          map(({result})=>(result) ? {empleadoCheck:true} : null)
        )
      }
  
    }

    enviar(){
      console.log(this.formEditUsuario.value);
      
      
      
    }
  }