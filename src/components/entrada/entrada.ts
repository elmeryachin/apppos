import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MensajeUtils } from '../../utils/mensaje.utils';
import { UtilitarioUtils } from '../../utils/utilitario.utils';
import { TransaccionService } from '../../providers/transaccion.service';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'entrada',
  templateUrl: 'entrada.html'
})
export class EntradaComponent {

  @Input() tipo:string
  @Input() disabled:boolean
  @Input() tipoTransaccion:string
  @Output() enter = new EventEmitter()

  @ViewChild('cod') codigoNext
  codigo:string
  ctrlIncorrecto:boolean
  constructor(public alertCtrl:AlertController,
              public mensajeUtils:MensajeUtils,
              public utilitarioUtils:UtilitarioUtils,
              public transaccionService:TransaccionService) {
      
  }
    /**
   * Realiza busquedas a partir del codigo de entre una lista a obtener un solo registro.
   * Los valores del codigo son Ej.: AB1, A%, %B5%
   * @param next Si todo es correcto se ejecuta next.setfocus()
   */
  onQuest( ):any {
    if( this.codigo == undefined || this.codigo.trim() == '' ) return; 
    
    this.transaccionService.onTipoTransaccion(this.tipoTransaccion)
    if ( this.codigo.indexOf('%') > -1 ) {
      let service:Observable<any> 
      service = this.transaccionService.onListEntrada ( { patron: this.codigo } )

      service.subscribe (
        data => {
          if( this.mensajeUtils.getValidarRespuestaSinMensaje(data) ) {
            
            this.utilitarioUtils.onAlertRadio(this.alertCtrl, this, null, data.list , 'titulo')

          } else {
            console.log('Realice otra busqueda  ')
          }
        }
      )
    } else {
      this.getObtener(this.codigo, null)
    }
  }

  /**
   * Tras ejecutar onQuest se trabajo con onObtener, 
   * Entre ellos PROVEEDOR | CLIENTE | TIENDA
   * @param codigo el valor a encontrar
   * @param next    null, solo se lo adiciona para utilizar el alert generico
   */
  getObtener(codigo:string, next:any) {
    let service:Observable<any>
    this.ctrlIncorrecto = false
    
    service = this.transaccionService.onQuestEntrada(codigo)

    service.subscribe(
      data => {
        if( this.mensajeUtils.getValidarRespuestaSinMensaje( data ) ) {
          this.codigo = data.codigo
          this.enter.emit({
            codigo: data.codigo,
            nombre: data.nombre
          }) 

        } else {
          this.ctrlIncorrecto = true
          this.enter.emit({
            codigo: null,
            nombre: null
          })
        }
      }
    )
  }

}
