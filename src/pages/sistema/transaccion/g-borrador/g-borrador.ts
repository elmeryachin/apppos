import { Component } from '@angular/core';
import { StorageService } from '../../../../providers/storage.service';
import { PATH_BORRADOR, BORRADOR } from '../../../../utils/ctte.utils';

@Component({
  selector: 'page-g-borrador',
  templateUrl: 'g-borrador.html',
})
export class GBorradorPage {
  tipoTransaccion:string
  constructor( public storageService: StorageService ) {
    this.tipoTransaccion = BORRADOR
    console.log( 'transaccion: ' + this.tipoTransaccion )
    this.storageService.setAsignacionDtoTransaccion( this.tipoTransaccion )
    this.storageService.setDtoTransaccion( PATH_BORRADOR )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GBorradorPage');
  }

}
