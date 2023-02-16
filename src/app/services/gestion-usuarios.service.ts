import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionUsuariosService {

  private baseUrl = 'http://192.167.165.55:8081/api/';

  constructor(private http:HttpClient) { }

  getLlenarSelect():Observable<any>  {
    let headers = new HttpHeaders().set('access-control-allow-origin',"http://192.167.165.55:8081");
      return this.http.get(this.baseUrl+'perfiles',{headers});
     
    // return this.http.get(this.baseUrl+'perfiles');
  }
}
