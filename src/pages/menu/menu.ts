import { Component, ViewChild } from '@angular/core';
import { ProductoPage, 
         BPedidoPage,
         CEnvioPage,
         DSolicitudPage,
         ERecibidoPage,
         FVentaPage,
         DiscoPage,
         InfoPage } from '../paginas.page'
import { StorageService } from '../../providers/storage.service';
import { Tabs, ModalController, Tab } from 'ionic-angular';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  @ViewChild('idProducto') idProducto: Tab;
  @ViewChild('idPedido') idPedido: Tab;
  @ViewChild('idEnvio') idEnvio: Tab;
  @ViewChild('idSolicitud') idSolicitud: Tab;
  @ViewChild('idDisco') idDisco: Tab;
  @ViewChild('idRecibido') idRecibido: Tab;
  @ViewChild('idVenta') idVenta: Tab;
 
  bPedidoPage:any
  cEnvioPage:any
  dSolicitudPage:any
  eRecibidoPage:any
  fVentaPage:any
  
  productoPage:any
  discoPage:any

  infoPage:any
  constructor( public storageService: StorageService, public modalCtrl: ModalController ) {
    this.productoPage = ProductoPage

    this.bPedidoPage = BPedidoPage
    this.cEnvioPage = CEnvioPage
    this.dSolicitudPage = DSolicitudPage
    this.eRecibidoPage = ERecibidoPage
    this.fVentaPage = FVentaPage
    this.discoPage = DiscoPage
    this.infoPage = InfoPage
  }
  
  getTipo():string {
    return this.storageService.getAccesoResponse().tipo
  }

  onProductoPage() {
    this.idProducto.goToRoot(null)
  }

  onbPedidoPage() {
    this.idPedido.goToRoot(null)
  }

  oncEnvioPage() {
    this.idEnvio.goToRoot(null)
  }

  ondSolicitudPage() {
    this.idSolicitud.goToRoot(null)
  }

  onDiscoPage() {
    this.idDisco.goToRoot(null)
  }

  oneRecibidoPage() {
    this.idRecibido.goToRoot(null)
  }

  onfVentaPage() {
    this.idVenta.goToRoot(null)
  }
}