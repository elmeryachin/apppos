import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { StorageService } from '../../../../providers/storage.service';


@Component({
  selector: 'page-a-diferencia',
  templateUrl: 'a-diferencia.html',
})
export class ADiferenciaPage {
  
  cols:any = [
    { field: 'codigo', header: 'Codigo Articulo', width:'18%' },
    { field: 'cant_1', header: 'Cantidad Enviada', width:'20%' },
    { field: 'cant_2', header: 'Llego', width:'20%' },
    { field: 'cant_3', header: 'No llego/Retorno', width:'20%' }
  ];

  list:any[]

  constructor(public viewCtrl:ViewController,
              public params: NavParams,
              public storageService: StorageService) {
      this.list = params.get('diff')
      console.log(this.list)
  }

  onVolver() {

  }
}
