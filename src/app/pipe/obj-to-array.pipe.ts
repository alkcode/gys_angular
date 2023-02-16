import { Pipe, PipeTransform } from '@angular/core';
import { Perfiles } from '../interfaces/perfiles';

@Pipe({
  name: 'objToArray'
})
export class ObjToArrayPipe implements PipeTransform {

  transform(object : Perfiles[] = []): any {
    return Object.values(object);
  }

}
