export interface Empleado{
    id_sociedad: String;
    id_empleado: Number;
    nombre: String;
    apellido_1: String;
    apellido_2: String;
    id_legal: String;

}

export class EmpleadoClass implements Empleado{
    id_sociedad='';
    id_empleado=0;
    nombre='';
    apellido_1='';
    apellido_2='';
    id_legal='';
} 