import { Component, Input, Output } from '@angular/core';
import { TransaccionService } from '../../../../providers/transaccion.service';
import { MensajeUtils } from '../../../../utils/mensaje.utils';
import { ViewController, AlertController, ModalController, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../../../providers/storage.service';
import { UtilitarioUtils } from '../../../../utils/utilitario.utils';
import { EventEmitter } from 'events';
import { PagoResponse } from '../../../../modelo/objeto.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-a-pago',
  templateUrl: 'a-pago.html',
})
export class APagoPage {
  
  private tcan:number
  private tprec:number

  private tsubtotl:number
  private tsubprec:number
  private tsubcant:number

  cols:any = [
    { field: 'fecha', header: 'Fecha', width:'24%' },
    { field: 'monto', header: 'Monto', width:'38%' }
  ];

  pagoResponse : PagoResponse

  constructor(public transaccionService:TransaccionService,
              public modalCtrl: ModalController,
              public navCtrl:NavController,
              public navParams:NavParams,
              public utilitarioUtils:UtilitarioUtils,
              public alertCtrl:AlertController,
              public mensajeUtils:MensajeUtils,
              public viewCtrl:ViewController,
              public storageService: StorageService) {
    console.log("Constructor .. APagoPage ...")

  }

  ngOnInit() {
    let idTransaccion:string = this.navParams.get('idTransaccion');
    let service: Observable<PagoResponse>

    service = this.transaccionService.onListaPagos( this.navParams.get('idTransaccion') )

    service.subscribe(
      data => {
        if( this.mensajeUtils.getValidarRespuestaQuest( data, null, null ) ) {
          console.log(data)
          this.pagoResponse = data
        }
      }
    )
  }
 
}
