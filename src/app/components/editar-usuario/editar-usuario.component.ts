import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit{

  formularioUsuario: FormGroup = new FormGroup({});

  usuario: Usuario | undefined;
  constructor(private fb:FormBuilder,
              private usuarioService:UsuarioService,
              private activatedRoute:ActivatedRoute,
              private router:Router
  ){}
  
  ngOnInit(): void {   
    const params = this.activatedRoute.snapshot.params
    console.log(params);    

    this.formularioUsuario = this.fb.group({
      clave:['', Validators.required, Validators.minLength(6)],
      password:['', Validators.required, Validators.minLength(6)],
      idEmpleado:['', Validators.required, Validators.minLength(6)],
    })
  }


}
