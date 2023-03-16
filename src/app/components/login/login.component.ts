import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
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
  pass='';

  errorSession: boolean = false

  // usuarioLogin= new Usuario("","");

  constructor(private fb: FormBuilder,private authService:AuthService, private router:Router) { }

  ngOnInit(){
    // this.formularioLogin = new FormGroup({
    //   usuario: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //   password: new FormControl('', [Validators.required, Validators.minLength(6)])
    // })
    this.formLogin();

  }

  formularioEnviado(){
    // const body = this.formularioLogin.value;
    // console.log(body);

    // console.log(this.formularioLogin.value);
    
  }

  formLogin(){
    // this.formularioLogin = new FormGroup({
    //   usuario: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //   password: new FormControl('', [Validators.required, Validators.minLength(6)])
    // })

    this.formularioLogin = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  validarLogin(){

    // console.log('Usuario',this.formularioLogin.value.usuario);
    this.usuario = this.formularioLogin.value.usuario;
    this.pass =  this.formularioLogin.value.password;

    console.log(this.usuario, this.pass);
    
    
    // const {usuario,password} = this.formularioLogin.value;
    this.authService.enviarCredenciales(this.usuario,this.pass)
      .subscribe((res : User)=>{  

        console.log(res);
        console.log(res.clave, this.usuario);
        console.log(res.password, this.pass);

        if(res!==null){

          if(res.clave == this.usuario && res.password == this.pass){
            console.log(res.password);
            console.log("Sesión iniciada correctamente");
            this.router.navigate(['/home'])
  
          }else{
            console.log('Usuario y/o contraseña incorrectos');
          }
        }
        
      },error=>{
        console.log("Error al iniciar sesión");
      })
  }
  
}
