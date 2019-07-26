import { Component } from '@angular/core';
import { StorageService } from '../../../../providers/storage.service';
import { AGRUPADOR, PATH_AGRUPADOR } from '../../../../utils/ctte.utils';

@Component({
  selector: 'page-i-estado-de-cuentas',
  templateUrl: 'i-estado-de-cuentas.html',
})
export class IEstadoDeCuentasPage {
  tipoTransaccion:string
  constructor( public storageService: StorageService ) {
    this.tipoTransaccion = AGRUPADOR
    console.log( 'transaccion: ' + this.tipoTransaccion )
    this.storageService.setAsignacionDtoTransaccion( this.tipoTransaccion )
    this.storageService.setDtoTransaccion( PATH_AGRUPADOR )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IEstadoDeCuentasPage');
  }

}
