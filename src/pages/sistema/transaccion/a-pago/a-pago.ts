import { Component, Input, Output } from '@angular/core';
import { TransaccionService } from '../../../../providers/transaccion.service';
import { MensajeUtils } from '../../../../utils/mensaje.utils';
import { ViewController, AlertController, ModalController, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../../../providers/storage.service';
import { UtilitarioUtils } from '../../../../utils/utilitario.utils';
import { EventEmitter } from 'events';
import { PagoResponse, TransaccionRequest, ServResponse } from '../../../../modelo/objeto.model';
import { Observable } from 'rxjs';
import { PagPago } from '../../../../modelo/tabla.model';

@Component({
  selector: 'page-a-pago',
  templateUrl: 'a-pago.html',
})
export class APagoPage {

  transaccionRequest:TransaccionRequest
  pagoResponse : PagoResponse
  selected     : PagPago
  monto:number = 0.00;

  constructor(public transaccionService:TransaccionService,
              public modalCtrl: ModalController,
              public navCtrl:NavController,
              public navParams:NavParams,
              public utilitarioUtils:UtilitarioUtils,
              public alertCtrl:AlertController,
              public mensajeUtils:MensajeUtils,
              public viewCtrl:ViewController,
              public storageService: StorageService) {

  }

  ngOnInit() {
    let idTransaccion:string = this.navParams.get('idTransaccion');
    let service: Observable<PagoResponse>
    
    this.transaccionRequest = this.navParams.get('registro')
    service = this.transaccionService.onListaPagos( this.transaccionRequest.transaccionObjeto.id )

    service.subscribe(
      data => {
        if( this.mensajeUtils.getValidarRespuestaQuest( data, null, null ) ) {
          this.pagoResponse = data
        }
      }
    )
  }

  onAgregar() {
    let pagPago:PagPago = {    
      id:null,
      idTransaccion:this.transaccionRequest.transaccionObjeto.id,
      fecha:new Date(),
      monto:this.monto
    }
    let service: Observable<ServResponse>
    service = this.transaccionService.onProcesarPagoEnElDia( pagPago )

    service.subscribe(
      data => {
        if( this.mensajeUtils.getValidarRespuesta( data, null ) ) {
          console.log('<<<<< guardado: OK >>>>')
          this.ngOnInit()
        }
      }
    )
  }

  onEliminar() {
    let service: Observable<ServResponse>

    service = this.transaccionService.onEliminarPago( this.selected.id )

    service.subscribe( 
      data => {
        if( this.mensajeUtils.getValidarRespuesta( data, null ) ) {
          console.log('<<<<< eliminado: OK >>>>')
          this.ngOnInit()
        }
      }
    )
  }

  onReturnModal(value:any) {
    this.viewCtrl.dismiss( value )
  }
}
