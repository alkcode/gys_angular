import { Opcion } from "./opcion";

export interface Perfil {
    descripcion: String;
    idPerfil: Number;
    opciones: Array<Opcion>;
    usuarios?: String;
    
}

export class PerfilClass implements Perfil{
    descripcion = '';
    idPerfil = 0;
    opciones = [];
    usuarios? = '';
} 

// export interface Opcion{
//     idOpcion: Number;
//     descripcion: String;
//     componente: String;
// } 

// export interface Usuario{
//     idUsuario: Number;
//     clave: String;
//     password: String;
//     perfiles: Array<Perfil>;
// }


// export interface Empleado{
//     idSociedad: String;
//     idEmpleado: Number;
//     nombre: String;
//     apellidoPaterno: String;
//     apellidoMaterno: String;
//     idLegal: String;

// }