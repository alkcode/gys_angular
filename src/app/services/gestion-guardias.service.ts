import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Perfil } from '../interfaces/perfiles';

@Injectable({
  providedIn: 'root'
})
export class GestionGuardiasService {
  // private baseUrl = 'http://192.167.165.55:8081/api/';
  private readonly baseUrl = environment.api

  constructor(private http:HttpClient){}

  mostrarPerfiles(opcion:number):Observable<Perfil>{
    // let headers = new HttpHeaders().set('access-control-allow-origin',"http://192.167.165.55:8081");
    // const profile$ = this.http.get<Perfil>(this.baseUrl+'perfiles/'+opcion+'?conOpciones=true')
    const profile$ = this.http.get<Perfil>(`${this.baseUrl}perfiles/${opcion}?conOpciones=true`)
    return profile$;

  }
}
