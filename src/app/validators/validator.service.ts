import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  validarPassword(contrasena:string, contrasena2:string){
    return (formGroup:AbstractControl): ValidationErrors | null => {
      const pass1 = formGroup.get(contrasena)?.value;
      const pass2 = formGroup.get(contrasena2)?.value;
      if(pass1 !== pass2){
        formGroup.get(contrasena2)?.setErrors({validarCampos:true});
        return {validarCampos:true}
      } 
      formGroup.get(contrasena2)?.setErrors(null);
        return null;
    }
  
  }
}
