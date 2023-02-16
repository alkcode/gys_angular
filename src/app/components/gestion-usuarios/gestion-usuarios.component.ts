import { HttpClient} from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { GestionUsuariosService } from 'src/app/services/gestion-usuarios.service';
import { validarPassword } from 'src/app/validators/confirmarPassword';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent {

  formUsuario: FormGroup = new FormGroup({});
  clave='';
  contasena='';
  contasena2='';
  nombre='';
  
  mostrarContrasena: boolean = false;
  mostrarContrasena2: boolean = false;

  listaPerfiles: any[] = [];

  perfiles = [

    {nombre: 'Guardias', valor: '1'},
    {nombre: 'Suplencias', valor: '2'},
    {nombre: 'Presupuesto', valor: '3'},
  ];


  constructor(private gestionUsuarioService:GestionUsuariosService){}
  
  ngOnInit(){
    // this.formUsuario = new FormGroup({
    //   clave: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //   contrasena: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //   contrasena2: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //   empleado: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //   // perfil: new FormControl(this.perfiles[0])
    //   perfil: new FormControl(null, [Validators.required])
    // });
    this.formulario();
    this.llenarSelect();

  }

  formulario(){
    this.formUsuario = new FormGroup({
      clave: new FormControl('', [Validators.required, Validators.minLength(4)]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(6)]),
      contrasena2: new FormControl('', [Validators.required, Validators.minLength(6)]),
      empleado: new FormControl('', [Validators.required, Validators.minLength(6)]),
      perfil: new FormControl(null, [Validators.required])
    },[validarPassword('contrasena', 'contrasena2')]);
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
  

  // validarDatos(){
  //   const body = this.formUsuario.value;
  //   console.log(body);
  // }

  getControl(name:any): AbstractControl | null {
    return this.formUsuario.get(name);
  }

  test(){
    console.log(this.formUsuario.value.perfil.idPerfil);
  }

}
