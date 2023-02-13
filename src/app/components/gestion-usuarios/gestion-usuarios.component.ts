import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  perfiles = [

    {nombre: 'Guardias', valor: '1'},
    {nombre: 'Suplencias', valor: '2'},
    {nombre: 'Presupuesto', valor: '3'},
  ];

  ngOnInit(){
    this.formUsuario = new FormGroup({
      clave: new FormControl('', [Validators.required, Validators.minLength(6)]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(6)]),
      contrasena2: new FormControl('', [Validators.required, Validators.minLength(6)]),
      empleado: new FormControl('', [Validators.required, Validators.minLength(6)]),
      // perfil: new FormControl(this.perfiles[0])
      perfil: new FormControl(null, [Validators.required])
    });

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

}
