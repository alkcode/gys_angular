import { Component } from '@angular/core';

@Component({
  selector: 'app-registro-bolsa-trabajo',
  templateUrl: './registro-bolsa-trabajo.component.html',
  styleUrls: ['./registro-bolsa-trabajo.component.css']
})
export class RegistroBolsaTrabajoComponent {
    titulo:string = "";
    constructor() { }
  
    ngOnInit(): void {
      this.titulo = "Registro de Bolsa de Trabajo";
    }
}
