import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formularioLogin: FormGroup = new FormGroup({});
  usuario='';
  password='';

  // usuarioLogin= new Usuario("","");

  constructor() { }

  ngOnInit(){
    this.formularioLogin = new FormGroup({
      usuario: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  formularioEnviado(){
    const body = this.formularioLogin.value;
    console.log(body);
  }
  
}
