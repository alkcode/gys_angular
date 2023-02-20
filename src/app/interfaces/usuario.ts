import { Empleado, EmpleadoClass } from "./empleado";
import { Perfil } from "./perfiles";

export interface Usuario{
    idUsuario?: Number;
    clave: String;
    password: String;
    // idEmpleado: String;
    empleado?: Empleado;
    perfiles?: Array<Perfil>;
}


export class UsuarioClass implements Usuario{
    idUsuario?= 0;
    clave='';
    password='';
    // idEmpleado='';
    empleado?: Empleado;
    perfiles?= [];
} 

// export interface Usuario {
//     usuario: String;
//     contrasena: String;
// }