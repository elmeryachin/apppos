import { Component } from '@angular/core';
import { StorageService } from '../../../../providers/storage.service';
import { PATH_RECIBIR } from '../../../../utils/ctte.utils';

@Component({
  selector: 'page-e-recibido',
  templateUrl: 'e-recibido.html',
})
export class ERecibidoPage {

  constructor( public storageService: StorageService ) {
    this.storageService.setDtoTransaccion( PATH_RECIBIR )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DRecibidoPage');
  }

}
