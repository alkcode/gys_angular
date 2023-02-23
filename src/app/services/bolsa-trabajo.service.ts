import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BolsaTrabajo } from '../interfaces/bolsaTrabajo';

@Injectable({
  providedIn: 'root'
})
export class BolsaTrabajoService {

  private baseUrl = 'http://localhost:8080/';


  constructor(private http:HttpClient) { }

  getBolsaTrabajo(): Observable<BolsaTrabajo> {
    return this.http.get<BolsaTrabajo>(this.baseUrl+'rest_bolsaTrabajo/reg');
    // const bolsaTrabajo$ = this.http.get<BolsaTrabajo>(`${this.baseUrl}rest_bolsaTrabajo/reg`)
    // return BolsaTrabajo$
  }
}
