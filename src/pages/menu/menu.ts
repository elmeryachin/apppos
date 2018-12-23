import { Component } from '@angular/core';
import { ProductoPage, 
         BPedidoPage,
         CEnvioPage,
         DSolicitudPage,
         ERecibidoPage,
         FVentaPage } from '../paginas.page'
import { StorageService } from '../../providers/storage.service';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  bPedidoPage:any
  cEnvioPage:any
  dSolicitudPage:any
  eRecibidoPage:any
  fVentaPage:any
  
  productoPage:any
  constructor( public storageService: StorageService ) {
    this.productoPage = ProductoPage

    this.bPedidoPage = BPedidoPage
    this.bPedidoPage = BPedidoPage
    this.cEnvioPage = CEnvioPage
    this.dSolicitudPage = DSolicitudPage
    this.eRecibidoPage = ERecibidoPage
    this.fVentaPage = FVentaPage
  }
  
  getTipo():string {
    return this.storageService.getAccesoResponse().tipo
  }
}
