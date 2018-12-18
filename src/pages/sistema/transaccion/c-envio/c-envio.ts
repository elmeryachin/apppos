import { Component } from '@angular/core';
import { StorageService } from '../../../../providers/storage.service';
import { PATH_ENVIAR } from '../../../../utils/ctte.utils';

@Component({
  selector: 'page-c-envio',
  templateUrl: 'c-envio.html',
})
export class CEnvioPage {

  constructor( public storageService: StorageService ) {
    this.storageService.setDtoTransaccion( PATH_ENVIAR )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CEntregaPage');
  }

}
