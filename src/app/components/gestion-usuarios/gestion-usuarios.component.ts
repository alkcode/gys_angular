import { HttpClient} from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  perfiles = [

    {nombre: 'Guardias', valor: '1'},
    {nombre: 'Suplencias', valor: '2'},
    {nombre: 'Presupuesto', valor: '3'},
  ];


  constructor(private fb:FormBuilder,
              private gestionUsuarioService:GestionUsuariosService,
              private validators: ValidatorService
    ){}
  
  ngOnInit(){

    this.formulario();
    this.llenarSelect();

  }

  formulario(){
  
    this.formUsuario = this.fb.group({
      clave: ['', [Validators.required, Validators.minLength(4)]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      contrasena2: ['', [Validators.required]],
      empleado:['', {
        validators:[Validators.required, Validators.minLength(6)],
        // asyncValidators: [
        //   this.empleadoCheck(this.gestionUsuarioService)
        // ],
        // updateOn: 'blur'
      }],
      perfil: [null, [Validators.required]]
    },{
      validators: this.validators.validarPassword('contrasena', 'contrasena2')
    });
  }

  llenarSelect(){
    this.gestionUsuarioService.getLlenarSelect()
    .subscribe(data => {
      // console.log(data);
      this.listaPerfiles = data;
      console.log(this.listaPerfiles);
      
    }, error => console.log(error));
  }

  cambiarContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  cambiarContrasena2() {
    this.mostrarContrasena2 = !this.mostrarContrasena2;
  }
  
  test(){
    console.log(this.formUsuario.value.perfil.idPerfil);
  }

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

  // get f(){
  //   return this.formUsuario.controls
  // }

  campoNoValido( campo: string ) {
    return this.formUsuario.get(campo)?.invalid
            && this.formUsuario.get(campo)?.touched;
  }


  // validarPassword(controlName:string, matchingControlName:string){
  //   return (formGroup:FormGroup)=>{
  //     const control = formGroup.controls[controlName];
  //     const matchingControl = formGroup.controls[matchingControlName];

  //     if(matchingControl.errors && !matchingControl.errors['validarPassword']){
  //       return;
  //     }

  //     if(control.value !== matchingControl.value){
  //       matchingControl.setErrors({validarPassword:true});
  //     }else{
  //       matchingControl.setErrors(null);
  //     }
  //   }
  // }

  

}