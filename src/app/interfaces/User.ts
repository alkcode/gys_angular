export interface User {
    clave:String;
    password:String;
}

export class UserClass implements User{
    clave='';
    password='';
}