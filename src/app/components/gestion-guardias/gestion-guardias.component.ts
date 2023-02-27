import { Component, Input } from '@angular/core';
import { Perfil, PerfilClass } from '../../interfaces/perfiles';
import { GestionGuardiasService } from 'src/app/services/gestion-guardias.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-guardias',
  templateUrl: './gestion-guardias.component.html',
  styleUrls: ['./gestion-guardias.component.css']
})
export class GestionGuardiasComponent {

  @Input() usuario: any | undefined;

  // perfil: Perfil = []; 
  perfil: Perfil = new PerfilClass;

  opciones: any[] = [];


  // Activador de los permisos
  actLectura: boolean = false;
  actActualizacion: boolean = false;
  actCreacion: boolean = false;
  actEliminacion: boolean = false;

  valorLectura: number = -1;
  valorActualizacion: number = -2;
  valorCreacion: number = -4;
  valorEliminacion: number = -8;

  permisosData = [
    { val: 1, name: 'Lectura' },
    { id: 2, name: 'Actualización' },
    { id: 4, name: 'Creación' },
    { id: 8, name: 'Eliminacion' }
  ];

  // Inicializar formGroup para el formulario
  formPerfil: FormGroup = new FormGroup({});

  form1: any = new FormArray([]);

 

  form2 = this.fb.group({
    permisos: this.fb.array([])
  });

   skills = new FormArray([]);


  constructor(private gestionGuardiaService: GestionGuardiasService,
    private fb: FormBuilder) {
    this.formPerfil = this.fb.group({
      permisos: this.fb.array([])
    })

 
    // this.formularioPerfil();
  }

  ngOnInit() {
    // console.log(this.usuario);

    // console.log('Objeto Usuario:',this.usuario.perfil.idPerfil);

    this.mostrarPerfiles(this.usuario.perfil.idPerfil);
    // this.formularioPerfil();

  }

  mostrarPerfiles(opcion: any) {
    this.gestionGuardiaService.mostrarPerfiles(opcion)
      .subscribe(data => {
        this.perfil = data;
        this.opciones = this.perfil.opciones;
        console.log(this.perfil);
        console.log(this.opciones);

        console.log('Total opciones', typeof (this.perfil.opciones));

        this.opciones.forEach((element, index) => {

            const permisos = new FormGroup({
              
              lectura: new FormControl(false),
              actualizacion: new FormControl(false),
              creacion: new FormControl(false),
              eliminacion: new FormControl(false)
            });
            
            //const f = this.form2.get('permisos') as FormArray;
            //f.push(permiso);
            this.form1.insert(index, permisos);
            console.log('hey listen: ', this.form1.value);

            
          
        });
        console.log('El bueno: ', this.form1.value);

      }, error => {
        console.log(error);
      });
    console.log('Hola');

  }
  // Formaulario
  //aqui

  opcionesGyS(): FormArray {
    return this.formPerfil.get(this.opciones) as FormArray
  }

  newOpciones(): FormGroup {
    return this.fb.group({
      opciones: this.opciones,
      permisos: this.fb.array([])
    })
  }

  newPermisos(): FormGroup {
    return this.fb.group({
      // lectura: new 
    })
  }

  get permisos(): FormArray {
    return this.form1.get('permisos') as FormArray;
  }

  // Checkbox para asignarle permisos por opcion
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
