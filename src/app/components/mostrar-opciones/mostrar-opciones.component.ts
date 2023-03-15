import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Opcion } from 'src/app/interfaces/opcion';
import { OpcionesService } from 'src/app/services/opciones.service';

@Component({
  selector: 'app-mostrar-opciones',
  templateUrl: './mostrar-opciones.component.html',
  styleUrls: ['./mostrar-opciones.component.css']
})
export class MostrarOpcionesComponent {

  listOpciones: Opcion[]= [];

  constructor(private opcionesService: OpcionesService,
              private http: HttpClient){}

  ngOnInit(){
    console.log('Hola');
    this.showOpciones();
    
  }

  showOpciones(){
    this.opcionesService.getOpciones$()
        .subscribe((res : Opcion[]) =>{
          this.listOpciones = res;
          console.log(this.listOpciones);
          
        }, err =>{
          console.log(err);
          
        });
  }

  borrarOpcion(idOpcion:Number){
    console.log(idOpcion);

    this.opcionesService.deleteOpcion(idOpcion)
        .subscribe(res=>{
          console.log(res);
          this.showOpciones();
          
        },err=>{
          console.log(err);
          
        })
    

  }

}
