export interface Empleado{
    idSociedad: String;
    idEmpleado: String;
    nombre: String;
    apellidoPaterno: String;
    apellidoMaterno: String;
    idLegal: String;

}

export class EmpleadoClass implements Empleado{
    idSociedad='';
    idEmpleado='';
    nombre='';
    apellidoPaterno='';
    apellidoMaterno='';
    idLegal='';
} 