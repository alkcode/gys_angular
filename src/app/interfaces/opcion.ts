export interface Opcion{
    idOpcion: Number;
    descripcion: String;
    componente: String;
    idNivelAcceso?: Number;
} 

export class OpcionClass implements Opcion{
    idOpcion=0;
    descripcion='';
    componente='';
    idNivelAcceso=0;
}