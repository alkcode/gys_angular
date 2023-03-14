import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpcionesService } from 'src/app/services/opciones.service';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css']
})
export class OpcionesComponent implements OnInit {

  formOpcion : FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
              private opciones:OpcionesService){}

  ngOnInit(){
    this.formulario();
  }


  formulario(){
    this.formOpcion = this.fb.group({
      
      descripcion:['', [Validators.required]],
      componente:['',[Validators.required]],
      idNivelAcceso:[0,[Validators.required]]
    })
  }


  saveOpcion(){
    console.log(this.formOpcion.value);

    // this.opciones.saveOpcion(this.formOpcion.value)
    //     .subscribe(res=>{
    //       console.log(res);
          
    //     }, error=>{
    //       console.log(error);
          
    //     })
    
  }

}
