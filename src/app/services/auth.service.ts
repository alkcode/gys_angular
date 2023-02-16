import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL = environment.api

  constructor(private http:HttpClient) { }

  enviarCredenciales(usuario:string, password:string){
    const body = {usuario, password};
    return this.http.post(this.URL + 'login', body);
  }
}
