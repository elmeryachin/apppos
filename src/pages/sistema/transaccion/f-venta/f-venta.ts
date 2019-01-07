import { Component } from '@angular/core';
import { StorageService } from '../../../../providers/storage.service';
import { PATH_VENTA, VENTA } from '../../../../utils/ctte.utils';

@Component({
  selector: 'page-f-venta',
  templateUrl: 'f-venta.html',
})
export class FVentaPage {
  tipoTransaccion:string
  constructor( public storageService: StorageService ) {
    this.tipoTransaccion = VENTA
    console.log( 'transaccion: ' + this.tipoTransaccion )
    this.storageService.setAsignacionDtoTransaccion( this.tipoTransaccion )
    this.storageService.setDtoTransaccion( PATH_VENTA )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EVentaPage');
  }

}
