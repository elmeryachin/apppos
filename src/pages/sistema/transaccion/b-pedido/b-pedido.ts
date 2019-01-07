import { Component } from '@angular/core';
import { StorageService } from '../../../../providers/storage.service';
import { PATH_PEDIDO, PEDIDO } from '../../../../utils/ctte.utils';

@Component({
  selector: 'page-b-pedido',
  templateUrl: 'b-pedido.html'
})
export class BPedidoPage {
  tipoTransaccion:string
  constructor( public storageService: StorageService ) {
    this.tipoTransaccion = PEDIDO
    console.log('transaccion: ' + this.tipoTransaccion)
    this.storageService.setAsignacionDtoTransaccion( this.tipoTransaccion )
    this.storageService.setDtoTransaccion( PATH_PEDIDO )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BLlegadaPage');
  }

}
