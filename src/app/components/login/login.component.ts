import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formularioLogin: FormGroup = new FormGroup({});
  usuario='';
  password='';

  errorSession: boolean = false

  // usuarioLogin= new Usuario("","");

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(){
    // this.formularioLogin = new FormGroup({
    //   usuario: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //   password: new FormControl('', [Validators.required, Validators.minLength(6)])
    // })
    this.formLogin();

  }

  formularioEnviado(){
    const body = this.formularioLogin.value;
    console.log(body);
  }

  formLogin(){
    this.formularioLogin = new FormGroup({
      usuario: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  ValidarLogin(){
    const {usuario,password} = this.formularioLogin.value;
    this.authService.enviarCredenciales(usuario,password)
      .subscribe(responseOk=>{
        console.log("Sesión iniciada correctamente");
        this.router.navigate(['/home'])
      },error=>{
        console.log("Error al iniciar sesión");
      })
  }
  
}
