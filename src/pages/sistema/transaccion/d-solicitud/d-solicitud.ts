import { Component } from '@angular/core';
import { StorageService } from '../../../../providers/storage.service';
import { PATH_SOLICITUD } from '../../../../utils/ctte.utils';

@Component({
  selector: 'page-d-solicitud',
  templateUrl: 'd-solicitud.html',
})
export class DSolicitudPage {

  constructor( public storageService: StorageService ) {
    this.storageService.setDtoTransaccion( PATH_SOLICITUD )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CEntregaPage');
  }

}
