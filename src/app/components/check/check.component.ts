import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { data } from 'jquery';
import { Perfil, PerfilClass } from 'src/app/interfaces/perfiles';
import { GestionGuardiasService } from 'src/app/services/gestion-guardias.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent {
  perfil: Perfil = new PerfilClass;
  opcionesForm: any[] = [];

  permisosValue:Array<any> =[
    {name:'lectura', value:1, status:null},
    {name:'creacion', value:2, status:null},
    {name:'actualizacion', value:4, status:null},
    {name:'eliminacion', value:8, status:null}
  ];
// Inicializamos el formulario
  formOpciones: FormGroup = new FormGroup({});

  actLectura: boolean = false;
  actActualizacion: boolean = false;
  actCreacion: boolean = false;
  actEliminacion: boolean = false;

  valorLectura: number = -1;
  valorActualizacion: number = -2;
  valorCreacion: number = -4;
  valorEliminacion: number = -8;
  
  constructor(private fb:FormBuilder,
              private gestionGuardiasService:GestionGuardiasService
              ){}

  ngOnInit(){

    this.crearFormularioOpciones();

    this.gestionGuardiasService.mostrarPerfiles(2)
        .subscribe(data =>{
          this.perfil = data;   //Todods los datos
          this.opcionesForm = this.perfil.opciones; //Las opciones
          console.log(this.perfil);
          // Opciones:Registro de guardias, Consulta de guardias(2)
          // console.log(this.opcionesForm);
          // let arrayOpc:any[]=[];
          // let guardarOpc:any[]=[];

          this.opcionesForm.forEach((element, index)=>{
            // guardarOpc = element.descripcion;
            // console.log('Este es el element:',element.descripcion);
            // arrayOpc[index] = element.descripcion;
            // console.log(typeof(arrayOpc[index]));
            
            
            // const opcionesGyS = this.fb.group({
            //   opciones: new FormControl(),
            // });
          
            // this.opcionesForm.push(new FormControl(''))

            // this.addOpciones(element.descripcion);
            // this.formOpciones = this.fb.group({
            //   opciones: this.fb.array([])
            // })

            // this.crearOpcion((`"${element.descripcion}"`));
            // console.log(this.crearOpcion);

            // const permiso = new FormGroup({
              
            //   lectura: new FormControl(false),
            //   actualizacion: new FormControl(false),
            //   creacion: new FormControl(false),
            //   eliminacion: new FormControl(false)
            // });

            const permisos = this.fb.group({
              lectura:[false],
              creacion:[false],
              actualizacion:[false],
              eliminacion:[false]
            });
            this.permisos.push(permisos)
            // this.formOpciones.insert(index, permiso);
            console.log('hey listen: ', this.formOpciones);
            

          });
          console.log('hey listen: ', this.permisos);
          
        })

  }

  // Creacion del formluario
  crearFormularioOpciones(){
    // this.formOpciones = this.fb.group({
    //   opciones: this.fb.array([])
    // })
    // console.log('Este es el formulario: ',this.formOpciones);
    // this.formOpciones = new FormGroup({
    //   opciones:new FormArray([])
    // })

    this.formOpciones = this.fb.group({
      permisos: this.fb.array([])
    })

    
  }

  get permisos(): FormArray {
    return this.formOpciones.get('permisos') as FormArray;
  }


  addOpciones(descripcion:any){
    // const opcionesGyS = this.fb.group({
    //   opciones: new FormControl(descripcion, Validators.required),
    // });
  
    // this.opcionesForm.push(this.fb.control('opciones'))

    
  }

  // crearOpcion(des:any){
  //   return this.fb.group({
  //     descripcion:des
  //   });
  // }


  permisoLectura() {
    this.actLectura = !this.actLectura;
    this.valorLectura = this.valorLectura * (-1);

  }

  permisoActualizacion() {
    this.actActualizacion = !this.actActualizacion;
    if (this.actActualizacion == true) {
      this.valorActualizacion = this.valorActualizacion * (-1);
    }
  }

  permisoCreacion() {
    this.actCreacion = !this.actCreacion;
    if (this.actCreacion == true) {
      this.valorCreacion = this.valorCreacion * (-1);
    }
  }

  permisoEliminacion() {
    this.actEliminacion = !this.actEliminacion;
    if (this.actEliminacion == true) {
      this.valorEliminacion = this.valorEliminacion * (-1);
    }
  }
}
