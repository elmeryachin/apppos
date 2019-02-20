import { Component } from '@angular/core';
import { StorageService } from '../../../../providers/storage.service';
import { SOLICITUD_DESTINO, PATH_SOLICITUD_DESTINO } from '../../../../utils/ctte.utils';

@Component({
  selector: 'page-d-solicitud-destino',
  templateUrl: 'd-solicitud-destino.html',
})
export class DSolicitudDestinoPage {
  tipoTransaccion:string
  constructor( public storageService: StorageService ) {
    this.tipoTransaccion = SOLICITUD_DESTINO
    console.log('transaccion: ' + this.tipoTransaccion)
    this.storageService.setAsignacionDtoTransaccion( this.tipoTransaccion )
    this.storageService.setDtoTransaccion( PATH_SOLICITUD_DESTINO )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CEntregaPage');
  }

}
