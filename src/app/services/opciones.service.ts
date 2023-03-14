import { HttpClient } from '@angular/common/http';
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

  saveOpcion(opcion:Opcion):Observable<Opcion>{
    return this.http.post<Opcion>(`${this.url}opciones`,opcion)

  }

  getOpcion(id:Number):Observable<Opcion>{
    const opcion$ = this.http.get<Opcion>(`${this.url}opciones/${id}`);
    return opcion$;
  }

  getOpciones():Observable<Opcion[]>{
    const opciones$ =  this.http.get<Opcion[]>(`${this.url}opciones/`);
    return opciones$;
  }
}
