export interface Perfiles {
    descripcion: String;
    idPerfil: Number;
    opciones: Opcion[];
    usuarios?: String;
    
}


export interface Opcion{
    idOpcion: Number;
    descripcion: String;
    componente: String;
} 

export interface Usuario{
    idUsuario: Number;
    clave: String;
    password: String;
    perfiles: Perfiles[];
}


export interface Empleado{
    idSociedad: String;
    idEmpleado: Number;
    nombre: String;
    apellidoPaterno: String;
    apellidoMaterno: String;
    idLegal: String;

}