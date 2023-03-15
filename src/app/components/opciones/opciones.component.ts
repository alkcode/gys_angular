import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Opcion, OpcionClass } from 'src/app/interfaces/opcion';
import { OpcionesService } from 'src/app/services/opciones.service';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css']
})
export class OpcionesComponent implements OnInit {

  formOpcion: FormGroup = new FormGroup({});
  opcion: Opcion = new OpcionClass;

  titulo: string = '';

  edit: boolean = false;

  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private opcionesService: OpcionesService) { }

  private id: number = this.activatedRoute.snapshot.params["id"];

  ngOnInit() {
    this.formulario();
    // console.log(this.id);
    this.titulo = 'Crear opcion para perfil';

    if (this.id) {
      this.titulo = `Actualizar opcion`
      this.opcionesService.getOpcion(this.id)
        .subscribe((res: Opcion) => {
          console.log(res);

          this.formOpcion.setValue(res);
          // this.formOpcion.controls['idOpcion'].patchValue(res.idOpcion);
          // this.formOpcion.controls['descripcion'].patchValue(res.descripcion);
          // this.formOpcion.controls['componente'].patchValue(res.componente);
          // this.formOpcion.controls['idNivelAcceso'].patchValue(res.idNivelAcceso);

          this.edit = true;

        }, err => {
          console.log(err);

        })
    }

  }


  formulario() {
    this.formOpcion = this.fb.group({
      idOpcion: [0],
      descripcion: ['', [Validators.required, Validators.minLength(5)]],
      componente: ['', [Validators.required, Validators.minLength(5)]],
      idNivelAcceso: [0, [Validators.required]]
    })
  }


  saveOpcion() {
    console.log(this.formOpcion.value);
    delete this.formOpcion.value.idOpcion;

    this.opcion = this.formOpcion.value;
    console.log(this.opcion);


    this.opcionesService.saveOpcion(this.formOpcion.value)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/mostrar-opciones']);
      }, error => {
        console.log(error);

      })

  }

  editOpcion() {
    // console.log(id);
    console.log(this.formOpcion.value);
    this.opcion = this.formOpcion.value;

    this.opcionesService.editOpcion(this.id, this.opcion)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/mostrar-opciones']);

      }, err => {
        console.log(err);

      })

  }

}
