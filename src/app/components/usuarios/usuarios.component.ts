import { Component } from '@angular/core';
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
  constructor(private usuarioService:UsuarioService) { }

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

  // editUsuario(id:any){
  //   console.log(id);
    
  // }

  // deleteUsuario(id:any){
  //   console.log(id);
    
  // }

}
