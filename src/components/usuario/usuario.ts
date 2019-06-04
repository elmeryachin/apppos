import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MensajeUtils } from '../../utils/mensaje.utils';
import { UtilitarioUtils } from '../../utils/utilitario.utils';
import { TransaccionService } from '../../providers/transaccion.service';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'usuario',
  templateUrl: 'usuario.html'
})
export class UsuarioComponent {

  
  constructor(public alertCtrl:AlertController,
              public mensajeUtils:MensajeUtils,
              public utilitarioUtils:UtilitarioUtils,
              public transaccionService:TransaccionService) {
      
  }



}
