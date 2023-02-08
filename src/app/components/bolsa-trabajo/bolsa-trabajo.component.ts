import { AfterViewInit, VERSION, Component, OnInit, OnDestroy } from '@angular/core';
import { BolsaTrabajoService } from 'src/app/services/bolsa-trabajo.service';
import { DataTableDirective } from 'angular-datatables';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-bolsa-trabajo',
  templateUrl: './bolsa-trabajo.component.html',
  styleUrls: ['./bolsa-trabajo.component.css']
})
export class BolsaTrabajoComponent implements OnInit {
  
  dtOptions: DataTables.Settings={};
  // buttons?: any[];
  // tdOptions: any={};
  data: any=[];
  dtTrigger: Subject<any> = new Subject<any>();
  // constructor(private bolsaTrabajoService:BolsaTrabajoService) { }
  constructor(private httpClient : HttpClient){}

  ngOnInit(): void {

    this.dtOptions = {
      language: {
        // url: 'cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
        url: 'https://cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
      },
      pagingType: 'full_numbers',
      lengthMenu: [[ 5, 10, 50, -1], [ 5, 10, 50, "All"]],
      pageLength: 5,
      dom: 'Bfrtip'
      // buttons: [
      //   // 'columsToggle',
      //   // 'colvis',
      //   // 'copy',
      //   // 'print',
      //   // 'excel'
      //   {
      //     extend: 'excel'
      //   }
      // ]
      
    };

    

    this.httpClient
    .get('http://localhost:8080/rest_bolsaTrabajo/reg')
    .subscribe((data)=>{
      this.data = data;
      this.dtTrigger.next(data);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
    
}
