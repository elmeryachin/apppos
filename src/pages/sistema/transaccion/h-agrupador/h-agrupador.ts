import { Component } from '@angular/core';
import { StorageService } from '../../../../providers/storage.service';
import { AGRUPADOR, PATH_AGRUPADOR } from '../../../../utils/ctte.utils';

@Component({
  selector: 'page-h-agrupador',
  templateUrl: 'h-agrupador.html',
})
export class HAgrupadorPage {
  tipoTransaccion:string
  constructor( public storageService: StorageService ) {
    this.tipoTransaccion = AGRUPADOR
    console.log( 'transaccion: ' + this.tipoTransaccion )
    this.storageService.setAsignacionDtoTransaccion( this.tipoTransaccion )
    this.storageService.setDtoTransaccion( PATH_AGRUPADOR )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GBorradorPage');
  }

}
