import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gestion-guardias',
  templateUrl: './gestion-guardias.component.html',
  styleUrls: ['./gestion-guardias.component.css']
})
export class GestionGuardiasComponent{

  @Input() clave='';
  @Input() contrasena='';
  @Input() contrasena2='';
  @Input() nombre='';
  @Input() perfil='';

  ngOnIniti(){
    alert(this.clave);
  }
}
