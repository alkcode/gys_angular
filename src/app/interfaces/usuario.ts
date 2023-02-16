import { Perfil } from "./perfiles";

export interface Usuario{
    idUsuario?: Number;
    clave: String;
    password: String;
    perfiles: Array<Perfil>;
}


export class UsuarioClass implements Usuario{
    idUsuario?= 0;
    clave='';
    password='';
    perfiles= [];
} 

// export interface Usuario {
//     usuario: String;
//     contrasena: String;
// }