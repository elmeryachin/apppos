import { Component } from '@angular/core';
import { StorageService } from '../../../../providers/storage.service';
import { PATH_ENVIAR, ENVIAR } from '../../../../utils/ctte.utils';

@Component({
  selector: 'page-c-envio',
  templateUrl: 'c-envio.html',
})
export class CEnvioPage {
  tipoTransaccion:string
  constructor( public storageService: StorageService ) {
    this.tipoTransaccion = ENVIAR
    console.log('transaccion : ' + this.tipoTransaccion)
    this.storageService.setAsignacionDtoTransaccion( this.tipoTransaccion )
    this.storageService.setDtoTransaccion( PATH_ENVIAR )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CEntregaPage');
  }

}
