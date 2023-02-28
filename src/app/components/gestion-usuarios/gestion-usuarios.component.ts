import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs';
import { GestionUsuariosService } from 'src/app/services/gestion-usuarios.service';
import { ValidatorService } from 'src/app/validators/validator.service';


@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent {

  formUsuario: FormGroup = new FormGroup({});
  // clave='';
  // contasena='';
  // contasena2='';
  // nombre='';
  
  mostrarContrasena: boolean = false;
  mostrarContrasena2: boolean = false;

  listaPerfiles: any[] = [];


  constructor(private fb:FormBuilder,
              private gestionUsuarioService:GestionUsuariosService,
              private validators: ValidatorService
            ){}
  
  ngOnInit(){
    this.formulario();
    this.llenarSelect();
  }

  // Funcion para asignar valores al formulario y sus validaciones
  formulario(){
  
    this.formUsuario = this.fb.group({
      clave: ['jamh', [Validators.required, Validators.minLength(4)]],
      contrasena: ['1111111', [Validators.required, Validators.minLength(6)]],
      contrasena2: ['1111111', [Validators.required, Validators.minLength(6)]],
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

  // get empleado(): FormControl {
  //   return this.formUsuario.get('empleado') as FormControl;
  // }


  // Se llena el Select de las opciones de perfil
  llenarSelect(){
    this.gestionUsuarioService.getLlenarSelect()
    .subscribe(data => {
      // console.log(data);
      this.listaPerfiles = data;
      console.log(this.listaPerfiles);
      
    }, error => console.log(error));
  }

  // Funciones para mostrarla contraseña
  cambiarContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  cambiarContrasena2() {
    this.mostrarContrasena2 = !this.mostrarContrasena2;
  }
  
  test(){
    console.log(this.formUsuario.value.perfil.idPerfil);
  }

  // Funcion para validar si el empleado(id_empleado) existe el la DB
  empleadoCheck(api:any):AsyncValidatorFn{
    console.log(api);
    
    return (control:AbstractControl)=>{
    
      return api.getValidarEmpleado(control.value)
      
      .pipe(
        tap({
          next:x => console.log(x),
        }),
        map(({result})=>(result) ? {empleadoCheck:true} : null)
      )
    }

  }

  campoNoValido( campo: string ) {
    return this.formUsuario.get(campo)?.invalid
            && this.formUsuario.get(campo)?.touched;
  }

}