import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router, TitleStrategy} from '@angular/router';
import { map, tap } from 'rxjs/operators';
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

  listaPerfiles: any[] = [];

  mostrarContrasena: boolean = false;
  mostrarContrasena2: boolean = false;

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
    
    this.formulario();
    this.callDataUsuario(id)
    this.llenarSelect();

  }

// Llamada y llenado de los datos del formulario
callDataUsuario(id:number){
  this.usuarioService.getUsuario(id)
      .subscribe(res =>{
        
        this.usuarioEdit = res;

        this.usuarioEdit.perfiles?.forEach((perfil,index)=>{
          this.perfil = perfil;
        })


        // this.opciones = this.perfil?.opciones;

        console.log('Este es el perfil',this.perfil.opciones);
        
        // console.log('Estos son los perfiles',this.usuarioEdit.perfiles);
        // console.log('VER',this.usuarioEdit);

        this.formEditUsuario.controls['clave'].setValue(this.usuarioEdit.clave)
        this.formEditUsuario.controls['contrasena'].setValue(this.usuarioEdit.password)
        this.formEditUsuario.controls['contrasena2'].setValue(this.usuarioEdit.password)
        this.formEditUsuario.controls['empleado'].setValue(this.usuarioEdit.empleado?.id_empleado)
        this.formEditUsuario.controls['perfil'].setValue(this.perfil?.idPerfil)

        this.perfil.opciones.forEach((opc, index)=>{
          // console.log(opc.componente+' '+opc.descripcion);
          
        })
        

      },err=>{
        console.log(err);
        
      })
}

// Crear formulario
  formulario(){
    this.formEditUsuario = this.fb.group({
      clave: ['', [Validators.required, Validators.minLength(4)]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      contrasena2: ['', [Validators.required, Validators.minLength(6)]],
      empleado:['', {
        validators:[Validators.required, Validators.minLength(6)],
        asyncValidators: [
          this.empleadoCheck(this.gestionUsuarioService)
        ],
        updateOn: 'blur'
      }],
      perfil: [null, [Validators.required]]
    },{
      validators: this.validators.validarPassword('contrasena', 'contrasena2')
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
  }