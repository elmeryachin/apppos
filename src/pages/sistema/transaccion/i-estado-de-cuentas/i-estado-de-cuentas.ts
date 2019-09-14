import { Component } from '@angular/core';
import { StorageService } from '../../../../providers/storage.service';
import { ESTADO_CUENTA, PATH_ESTADO_CUENTA } from '../../../../utils/ctte.utils';

@Component({
  selector: 'page-i-estado-de-cuentas',
  templateUrl: 'i-estado-de-cuentas.html',
})
export class IEstadoDeCuentasPage {
  tipoTransaccion:string
  constructor( public storageService: StorageService ) {
    this.tipoTransaccion = ESTADO_CUENTA
    console.log( 'transaccion: ' + this.tipoTransaccion )
    this.storageService.setAsignacionDtoTransaccion( this.tipoTransaccion )
    this.storageService.setDtoTransaccion( PATH_ESTADO_CUENTA )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IEstadoDeCuentasPage');
  }

}
