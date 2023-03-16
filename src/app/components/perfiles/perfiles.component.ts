import { Component } from '@angular/core';
import { FormArray, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Opcion, OpcionClass } from 'src/app/interfaces/opcion';
import { Perfil, PerfilClass } from 'src/app/interfaces/perfiles';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent {

  listaOpciones: Opcion[] = [];
  opcionSeleccionada: Opcion = new OpcionClass;
  crearPerfil: Perfil = new PerfilClass

  constructor(private fb: FormBuilder,
              private perfilService:PerfilService){}

  ngOnInit(){
    this.llenarSelect();
    console.log(this.opcionesArray.controls);
    
  }

  formPerfil: FormGroup = this.fb.group({
      descripcion:['',[Validators.required, Validators.minLength(4)]],
      opciones: this.fb.array([])
  });

  selectOpc:FormControl = this.fb.control(0, Validators.min(1));

  get opcionesArray(): FormArray{   
    // console.log(this.formPerfil.get('opciones') as FormArray);
    return this.formPerfil.get('opciones') as FormArray;
  }

  addOpcion(opc:Opcion){
    console.log(opc);
    this.opcionSeleccionada = opc;
    
    const opciones=  this.fb.group({
      
      idOpcion:this.fb.control(this.opcionSeleccionada.idOpcion,[Validators.required]),
      descripcion:this.fb.control(this.opcionSeleccionada.descripcion, [Validators.required]),
      componente:this.fb.control(this.opcionSeleccionada.componente, [Validators.required]),
      idNivelAcceso:this.fb.control(this.opcionSeleccionada.idNivelAcceso, [Validators.required])

    });
    

    this.opcionesArray.push(opciones);
    this.selectOpc.reset(0);

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
    if(this.opcionesArray.length == 0){
      console.log('No hay opciones asignadas');
      return;
    }

    this.crearPerfil = this.formPerfil.value;
    console.log(this.crearPerfil);

    // this.perfilService.savePerfil(this.crearPerfil)
    //     .subscribe(res=>{
    //       console.log('Perfil creado', res);
          
    //     },err=>{
    //       console.log(err);
          
    //     });
    
  }
}
