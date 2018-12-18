import { Component } from '@angular/core';
import { StorageService } from '../../../../providers/storage.service';
import { PATH_VENTA } from '../../../../utils/ctte.utils';

@Component({
  selector: 'page-f-venta',
  templateUrl: 'f-venta.html',
})
export class FVentaPage {

  constructor( public storageService: StorageService ) {
    this.storageService.setDtoTransaccion( PATH_VENTA )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EVentaPage');
  }

}
