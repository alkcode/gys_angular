import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario='';
  password='';

  usuarioLogin= new Usuario("","");

  constructor() { }

  ngOnInit(){}

  formularioEnviado(){
    console.log(this.usuarioLogin);
  }
  
}
