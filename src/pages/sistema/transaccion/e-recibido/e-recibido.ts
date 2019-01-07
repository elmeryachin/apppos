import { Component } from '@angular/core';
import { StorageService } from '../../../../providers/storage.service';
import { PATH_RECIBIR, RECIBIR } from '../../../../utils/ctte.utils';

@Component({
  selector: 'page-e-recibido',
  templateUrl: 'e-recibido.html',
})
export class ERecibidoPage {
  tipoTransaccion:string
  constructor( public storageService: StorageService ) {
    this.tipoTransaccion = RECIBIR
    console.log('transaccion: ' + this.tipoTransaccion)
    this.storageService.setAsignacionDtoTransaccion( this.tipoTransaccion )
    this.storageService.setDtoTransaccion( PATH_RECIBIR )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DRecibidoPage');
  }

}
