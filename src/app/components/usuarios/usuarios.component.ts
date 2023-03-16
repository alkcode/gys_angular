import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  usuarios:Usuario[] = [];
  constructor(private usuarioService:UsuarioService,
              private router: Router) { }

  ngOnInit(){
    this.mostrarUsuarios();
  }

  mostrarUsuarios(){
    this.usuarioService.getUsuarios$()
        .subscribe((data : Usuario[])=>{
          this.usuarios = data
          
          console.log(data)
        },error=>{
      console.log(error);
    });
  }


  deleteUsuario(id:any){
    console.log(id);
    this.usuarioService.deleteUsuario(id)
        .subscribe(res=>{
          console.log(res);
          this.mostrarUsuarios();
        }, err=>{
          console.log(err);
        });
  }

}
