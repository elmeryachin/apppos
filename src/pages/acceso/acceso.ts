import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AccesoRequest } from '../../modelo/objeto.model';
import { AccesoService } from '../../providers/acceso.service';
import { MenuPage } from '../menu/menu';
import { MensajeUtils } from '../../utils/mensaje.utils';
import { StorageService } from '../../providers/storage.service';
import { UtilitarioUtils } from '../../utils/utilitario.utils';

@Component({
  selector: 'page-acceso',
  templateUrl: 'acceso.html',
})
export class AccesoPage {

  accesoRequest: AccesoRequest
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public accesoService:AccesoService,
              public mensajeUtils:MensajeUtils,
              public storageService:StorageService,
              private utilitarioUtils:UtilitarioUtils,
              private alertCtrl:AlertController) {
    this.accesoRequest = new AccesoRequest( null, null, null, null, null )
  }
  
  /**
   * Verifica que los datos ingresados pertenezcan a un usuario autorizado
   */
  onAcceso() {
    this.accesoService.onAccesoLogin(this.accesoRequest).subscribe(
      data => {
        if( this.mensajeUtils.getValidarRespuestaSinMsgOk( data, null, null ) ){
          this.storageService.setAccesoResponse(data)
          this.navCtrl.setRoot(MenuPage)
        }
      }, error =>{
        this.utilitarioUtils.onAlertMensaje(this.alertCtrl, null, "Error Acceso", "No se puede conectar, vuelva a intentar")
      }
    )
  }

}
