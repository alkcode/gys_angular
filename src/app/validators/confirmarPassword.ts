import { AbstractControl } from "@angular/forms";

export function validarPassword(contrasena:string, contrasena2:string){
    return function(form:AbstractControl){
        const password = form.get(contrasena)?.value;
        const password2 = form.get(contrasena2)?.value;

        if(password !== password2){
            // password2.setErrors({noIguales:true});
            return null;
        }
        return {passwordMissmatch:true}
    }
}