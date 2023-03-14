import { Component } from '@angular/core';
import { FormArray, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Opcion } from 'src/app/interfaces/opcion';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent {

  // formPerfil: FormGroup = new FormGroup({});

  listaOpciones: Opcion[] = [];

  constructor(private fb: FormBuilder,
              private perfilService:PerfilService){}

  ngOnInit(){
    // this.formulario();
    this.llenarSelect();
    console.log(this.opcionesArray.controls);
    
  }

  // formulario(){
  //   this.formPerfil = this.fb.group({
  //     descripcion:['',[Validators.required]],
  //     opciones: this.fb.array([
  //       // this.fb.group({
  //       //   idOpcion:this.fb.control(0,Validators.required)
  //       // })
  //     ])
  //   })
  // }

  formPerfil: FormGroup = this.fb.group({
        descripcion:['',[Validators.required]],
      opciones: this.fb.array([
        // this.fb.group({
        //   idOpcion:this.fb.control(0,Validators.required)
      ])
  });

  selectOpc:FormControl = this.fb.control('', Validators.required );

  

  get opcionesArray(): FormArray{   
    return this.formPerfil.get('opciones') as FormArray;
  }

  addOpcion(){

    const opciones=  this.fb.group({
      
      idOpcion:this.fb.control(0,Validators.required),
      descripcion:this.fb.control(0, Validators.required),
      componente:this.fb.control('', Validators.required),
      idNivelAcceso:this.fb.control(0, Validators.required)

    });

    this.opcionesArray.push(opciones);

  }

  removeOpcion(i:number){
    this.opcionesArray.removeAt(i);
  }


  llenarSelect(){
    this.perfilService.getLlenarSelect()
        .subscribe(res=>{
          console.log(res);
          this.listaOpciones = res;
          
        }, error=>{
          console.log(error);
          
        })
  }

  savePerfil(){

    if(this.formPerfil.valid){
      console.log(this.formPerfil.value);
    }
    
  }

  enviarValores($e:any){
    console.log($e);
    
  }
}
