import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MensajeUtils } from '../../utils/mensaje.utils';
import { UtilitarioUtils } from '../../utils/utilitario.utils';
import { TransaccionService } from '../../providers/transaccion.service';
import { AlertController, ViewController } from 'ionic-angular';
import { StorageService } from '../../providers/storage.service';
import { UsuarioRequest, UsuarioResponseMin } from '../../modelo/objeto.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'usuario',
  templateUrl: 'usuario.html'
})
export class UsuarioComponent {

  @ViewChild('codigo') codigoNext: any 

  usuarioRequest:UsuarioRequest

  constructor(public alertCtrl:AlertController,
              public mensajeUtils:MensajeUtils,
              public utilitarioUtils:UtilitarioUtils,
              public transaccionService:TransaccionService,
              public storageService: StorageService,
              public viewCtrl:ViewController) {
    this.usuarioRequest = new UsuarioRequest();  
  }

  ngOnInit() {
    setTimeout( () => this.codigoNext.setFocus(), 350 )
  }

  onReturnModal(val:any) {
    this.viewCtrl.dismiss( val )
  }

  onVerificaCodigo(next:any){
    let respuesta:Observable<UsuarioResponseMin>

    if( this.usuarioRequest.codigo !=null && this.usuarioRequest.codigo.length > 0 ) {
      respuesta = this.transaccionService.onQuestEntrada( this.usuarioRequest.codigo )

      respuesta.subscribe (
        data => {
          if ( !this.mensajeUtils.getValidarRespuestaSinMensaje( data ) ) {
            next.setFocus()
          }
        }
      )
     
    }
      
  }
  onVerificaNombre(next:any){
    if( this.usuarioRequest.nombre !=null && this.usuarioRequest.nombre.length > 0 )
      next.setFocus()
  }
  onVerificaTelefono(next:any){
    if( this.usuarioRequest.telefono !=null && this.usuarioRequest.telefono.length > 0 )
      next.setFocus()
  }
  
  /**
   * Antes de guardar un nuevo registro se debe despegar un alert de confirmacion
   * @param next componente/html para dirigir el focus
   */
  onAlertGrabar(next:any) {
    this.utilitarioUtils.onAlertGuardar(this.alertCtrl, this, next,  
                                        'Nuevo ' + this.storageService.getDtoTransaccion().tipoE,
                                        'Esta seguro de guardar al '+ + this.storageService.getDtoTransaccion().tipoE + ' con codigo ' + this.usuarioRequest.codigo )
  }
  /**
   * El proceso final para enviar y guardar la informacion
   * @param next referencia a un componente/html para ejecutar un setFocus
   */
  onGuardar(next:any) {
    let respuesta:Observable<UsuarioResponseMin>

    respuesta = this.transaccionService.onNuevoUsuario(this.usuarioRequest)

    respuesta.subscribe (
      data => {
        if( this.mensajeUtils.getValidarRespuesta(data, next) ) {
          this.viewCtrl.dismiss( this.usuarioRequest )
        }
      }
    )
  }
}
