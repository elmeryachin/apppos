
import { Component, ViewChild } from '@angular/core';
import { ProductoPage,
         BPedidoPage,
         CEnvioPage,
         DSolicitudPage,
         DSolicitudDestinoPage,
         ERecibidoPage,
         FVentaPage,
         GBorradorPage,
         HAgrupadorPage,
         IEstadoDeCuentasPage,
         DiscoPage,
         DiscoMenuPage,
         InfoPage } from '../paginas.page'
import { StorageService } from '../../providers/storage.service';
import { ModalController, Tab } from 'ionic-angular';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  @ViewChild('idProducto') idProducto: Tab;
  @ViewChild('idPedido') idPedido: Tab;
  @ViewChild('idEnvio') idEnvio: Tab;
  @ViewChild('idSolicitud') idSolicitud: Tab;
  @ViewChild('idSolicitudDestino') idSolicitudDestino: Tab;
  @ViewChild('idDisco') idDisco: Tab;
  @ViewChild('idDiscoMenuPage') idDiscoMenuPage: Tab;
  @ViewChild('idRecibido') idRecibido: Tab;
  @ViewChild('idVenta') idVenta: Tab;
  @ViewChild('idBorrador') idBorrador: Tab;
  @ViewChild('idAgrupador') idAgrupador: Tab;
  @ViewChild('idEstadoDeCuentas') idEstadoDeCuentas: Tab;

  bPedidoPage:any
  cEnvioPage:any
  dSolicitudPage:any
  dSolicitudDestinoPage:any
  eRecibidoPage:any
  fVentaPage:any
  gBorradorPage:any
  hAgrupadorPage:any
  iEstadoDeCuentasPage:any

  productoPage:any
  discoPage:any
  discoMenuPage: any

  infoPage:any
  constructor( public storageService: StorageService, public modalCtrl: ModalController ) {
    this.productoPage = ProductoPage

    this.bPedidoPage = BPedidoPage
    this.cEnvioPage = CEnvioPage
    this.dSolicitudPage = DSolicitudPage
    this.dSolicitudDestinoPage = DSolicitudDestinoPage
    this.eRecibidoPage = ERecibidoPage
    this.fVentaPage = FVentaPage
    this.gBorradorPage = GBorradorPage
    this.hAgrupadorPage = HAgrupadorPage
    this.iEstadoDeCuentasPage = IEstadoDeCuentasPage
    this.discoPage = DiscoPage
    this.discoMenuPage = DiscoMenuPage
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

  ondSolicitudDestinoPage() {
    this.idSolicitudDestino.goToRoot(null)
  }

  onDiscoPage() {
    this.idDisco.goToRoot(null)
  }
  onDiscoMenuPage() {
    this.idDiscoMenuPage.goToRoot(null);
  }

  oneRecibidoPage() {
    this.idRecibido.goToRoot(null)
  }

  onfVentaPage() {
    this.idVenta.goToRoot(null)
  }

  ongBorradorPage() {
    this.idBorrador.goToRoot(null)
  }

  onhAgrupadorPage() {
    this.idAgrupador.goToRoot(null)
  }

  oniEstadoDeCuentasPage() {
    this.idEstadoDeCuentas.goToRoot(null)
  }

}
