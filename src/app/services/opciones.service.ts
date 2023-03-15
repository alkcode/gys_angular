import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Opcion } from '../interfaces/opcion';

@Injectable({
  providedIn: 'root'
})
export class OpcionesService {
  
  private readonly url = environment.api;

  constructor(private http:HttpClient) { }

  saveOpcion(opcion:Opcion){
    return this.http.post<Opcion>(`${this.url}opciones`,opcion);

  }

  editOpcion(id:Number, opcion:Opcion){
    return this.http.put<Opcion>(`${this.url}opciones/${id}`,opcion);
  }

  getOpcion(id:Number):Observable<Opcion>{
    const opcion$ = this.http.get<Opcion>(`${this.url}opciones/${id}`);
    return opcion$;
  }

  deleteOpcion(id:Number){
    return this.http.delete(`${this.url}opciones/${id}`)
  }

  getOpciones$():Observable<Opcion[]>{
    let headers = new HttpHeaders().set('access-control-allow-origin',"http://192.167.165.55:8081");
    const opciones$ =  this.http.get<Opcion[]>(`${this.url}opciones`,{headers});
    return opciones$;
  }
}
