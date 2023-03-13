import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly url = environment.api;

  constructor(private http:HttpClient) { }

  getUsuarios$():Observable<Usuario[]>{
    const usuarios$ = this.http.get<Usuario[]>(`${this.url}usuarios?conPerfiles=false`)
    return usuarios$;
    // return this.http.get<Usuario[]>(`${this.url}usuarios?conPerfiles=false`)
  }

  getUsuario(id:Number):Observable<Usuario>{
    // return this.http.get<Usuario>(`${this.url}usuarios/${id}`);
    const usuario$ = this.http.get<Usuario>(`${this.url}usuarios/${id}?conPerfiles=true`);
    // const usuario$ = this.http.get<Usuario>(`${this.url}permisos_usuario/${id}`);
    return usuario$;
  }

  saveUsuario(usuario:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(`${this.url}usuarios`, usuario);
  }

  updateUsuario(id:Number,usuario:Usuario):Observable<Usuario>{
    return this.http.put<Usuario>(`${this.url}usuarios/${id}`, usuario);
  }

  deleteUsuario(id:Number,usuario:Usuario):Observable<Usuario>{
    return this.http.delete<Usuario>(`${this.url}usuarios/${id}`);
  }

}
// git commit -m "prueba de forms y observables"