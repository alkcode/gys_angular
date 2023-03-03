import { Opcion } from "./opcion";
import { Usuario } from "./usuario";

export interface Perfil {
    idPerfil: Number;
    descripcion: String;
    opciones: Array<Opcion>;
    // usuarios?: Array<Usuario>;
    
}

export class PerfilClass implements Perfil{
    descripcion = '';
    idPerfil = 0;
    opciones = [];
    // usuarios? = [];
} 
