import { Component } from '@angular/core';
import { StorageService } from '../../../../providers/storage.service';
import { PATH_PEDIDO } from '../../../../utils/ctte.utils';

@Component({
  selector: 'page-b-pedido',
  templateUrl: 'b-pedido.html'
})
export class BPedidoPage {
  
  constructor( public storageService: StorageService ) {
    this.storageService.setDtoTransaccion( PATH_PEDIDO )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BLlegadaPage');
  }

}
