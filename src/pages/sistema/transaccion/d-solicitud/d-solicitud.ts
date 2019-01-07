import { Component } from '@angular/core';
import { StorageService } from '../../../../providers/storage.service';
import { PATH_SOLICITUD, SOLICITUD } from '../../../../utils/ctte.utils';

@Component({
  selector: 'page-d-solicitud',
  templateUrl: 'd-solicitud.html',
})
export class DSolicitudPage {
  tipoTransaccion:string
  constructor( public storageService: StorageService ) {
    this.tipoTransaccion = SOLICITUD
    console.log('transaccion: ' + this.tipoTransaccion)
    this.storageService.setAsignacionDtoTransaccion( this.tipoTransaccion )
    this.storageService.setDtoTransaccion( PATH_SOLICITUD )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CEntregaPage');
  }

}
