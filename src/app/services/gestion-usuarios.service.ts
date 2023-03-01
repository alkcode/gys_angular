import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Empleado } from '../interfaces/empleado';
import { Usuario } from '../interfaces/usuario';
import { ajax } from 'rxjs/ajax'

@Injectable({
  providedIn: 'root'
})
export class GestionUsuariosService {

  private baseUrl = 'http://192.167.165.55:8081/api/';

  constructor(private http:HttpClient) { }

  getLlenarSelect():Observable<any>  {
    let headers = new HttpHeaders().set('access-control-allow-origin',"http://192.167.165.55:8081");
      // return this.http.get(this.baseUrl+'perfiles',{headers});
      const llenarSelect$= this.http.get<any>(`${this.baseUrl}perfiles`)
      return llenarSelect$;
    // const rellenar = ajax.getJSON(`${this.baseUrl}perfiles`);
    // const llenarSelect$= new Observable(obs=>{
    //   rellenar.subscribe((res)=>{
    //     obs.next(res);
    //     obs.complete();

    //     },(err)=>{
    //       obs.error(err);
    //     }
    //   );
    //  });
    //  return llenarSelect$;
  }


  getValidarEmpleado(id_empleado:number):Observable<Empleado> {
    // return this.http.get<Empleado>(`${this.baseUrl}empleados/${id_empleado}`);
    // return this.http.get<Empleado>(this.baseUrl+'empleados/'+id_empleado);
    const empleado$ =  this.http.get<Empleado>(`${this.baseUrl}empleados/${id_empleado}`)
    return empleado$;
  }
}
