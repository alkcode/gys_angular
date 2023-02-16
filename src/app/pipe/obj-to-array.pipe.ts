import { Pipe, PipeTransform } from '@angular/core';
import { Perfil } from '../interfaces/perfiles';

@Pipe({
  name: 'objToArray'
})
export class ObjToArrayPipe implements PipeTransform {

  transform(object : Perfil): any {
    return Object.values(object);
  }

}
