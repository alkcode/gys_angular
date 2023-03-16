import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Perfil } from '../interfaces/perfiles';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private readonly url = environment.api;

  constructor(private http:HttpClient) { }

  getPerfiles():Observable<Perfil[]>{
    const perfiles$ =  this.http.get<Perfil[]>(`${this.url}perfiles`);
    return perfiles$;
  }

  getPerfil(id:Number){
    const perfil$ = this.http.get<Perfil>(`${this.url}perfiles/${id}`)
    return perfil$;
  }

  getLlenarSelect():Observable<any>  {
    let headers = new HttpHeaders().set('access-control-allow-origin',"http://192.167.165.55:8081");
      const llenarSelect$= this.http.get<any>(`${this.url}opciones`)
      return llenarSelect$;
  }

  savePerfil(perfil:Perfil):Observable<Perfil>{
    return this.http.post<Perfil>(`${this.url}perfiles`,perfil);
  }

  editPerfil(id:Number, perfil:Perfil){
    return this.http.put<Perfil>(`${this.url}perfiles/${id}`,perfil)
  }

  deletePerfil(id:Number){
    return this.http.delete(`${this.url}perfiles/${id}`);
  }

}
