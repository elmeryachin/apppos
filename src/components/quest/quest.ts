import { Component, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { ArticuloResponseMin } from '../../modelo/objeto.model';
import { ArticuloService } from '../../providers/articulo.service';
import { UtilitarioUtils } from '../../utils/utilitario.utils';
import { MensajeUtils } from '../../utils/mensaje.utils';
import { TransaccionService } from '../../providers/transaccion.service';
import { StorageService } from '../../providers/storage.service';

@Component({
  selector: 'quest',
  templateUrl: 'quest.html'
})
export class QuestComponent {
  
  @ViewChild('codigo') codigoNext
  @ViewChild('cantidad') cantidadNext 
  @ViewChild('precio') precioNext
  
  articuloResponseMin:ArticuloResponseMin
  auxiliarCtrl:ArticuloResponseMin    //Auxiliar para validar el ingreso correcto de los campos
  existeEnLista:boolean
  ctrlIncorrecto:boolean
  @Output() enterInventario = new EventEmitter() 
  @Output() enterGuardar = new EventEmitter()
  @Input() cantidadExistente:number

  constructor(public articuloService:ArticuloService,
              public utilitarioUtils:UtilitarioUtils,
              public mensajeUtils:MensajeUtils,
              public alertCtrl:AlertController,
              public transaccionService:TransaccionService,
              public storageService: StorageService ) {
    this.articuloResponseMin = new ArticuloResponseMin() 
    this.auxiliarCtrl = new ArticuloResponseMin()
    this.auxiliarCtrl.codigo = '-1'
    this.auxiliarCtrl.cantidad = -1
  }

  /**
   * Valida que se ingrese la cantidad caso contrario no pasa con el enter
   * @param next objeto al cual se dirige tras validarse la cantidad
   */
  onCantidad( next:any ) {
    if(this.articuloResponseMin.cantidad != undefined 
      && this.articuloResponseMin.cantidad != null
      && this.articuloResponseMin.cantidad * 1 > 0) {
        this.auxiliarCtrl.cantidad = this.articuloResponseMin.cantidad 
        next.setFocus()
      } 
  }
   /**
   * Realiza busquedas a partir del codigo de entre una lista a obtener un solo registro.
   * Los valores del codigo son Ej.: AB1, A%, %B5%
   * @param next Si todo es correcto se ejecuta next.setfocus()
   */
  onQuest( next:any ):any {

    let codigo = this.articuloResponseMin.codigo
    
    this.getReset()


    if( codigo == undefined || codigo.trim() == '' ) {
      this.enterInventario.emit( {codigo: null} )
      return;
    } 
    
    this.articuloResponseMin.codigo = codigo 

    if ( this.articuloResponseMin.codigo.indexOf('%') > -1 ) {
      this.articuloService.onListaPorCodigo( { patron: this.articuloResponseMin.codigo } ).subscribe (
        data => {
          if( this.mensajeUtils.getValidarRespuestaSinMensaje( data ) ) {
            
            this.utilitarioUtils.onAlertRadio(this.alertCtrl, this, next, data.lista , 'titulo')

          }
        }
      )
    } else {
      this.getObtener(this.articuloResponseMin.codigo, next)
    }
  }

  /**
   * Obtiene los datos Minimos del articulo por el codigo  
   * Nota: Tras ejecutar onQuest se trabajo con onObtener
   * @param codigo 
   * @param next 
   */
  getObtener(codigo:string, next:any) {
    this.existeEnLista = false
    this.ctrlIncorrecto = false
    this.transaccionService.onObtenerArticulo( codigo ).subscribe(
      data => {
        if( this.mensajeUtils.getValidarRespuestaSinMensaje(data) ) {
          this.articuloResponseMin = data
          this.auxiliarCtrl.codigo = data.codigo
          this.enterInventario.emit( {codigo: data.codigo} )

          setTimeout( () => next.setFocus(), 350)
        } else {
          this.ctrlIncorrecto = true
          this.enterInventario.emit( {codigo: null} )
        }
      }
    )
  }

  onAgregar() {
    if( this.auxiliarCtrl.codigo != this.articuloResponseMin.codigo ) {
      this.utilitarioUtils.onAlertMensaje(this.alertCtrl, this.codigoNext, 'Alerta', 'Verifique el codigo, avance con enter')
    } else if( this.auxiliarCtrl.cantidad != this.articuloResponseMin.cantidad ) {
      this.utilitarioUtils.onAlertMensaje(this.alertCtrl, this.cantidadNext, 'Alerta', 'Verifique la cantidad, avance con enter')
    } else if( this.articuloResponseMin.precio <= 0 ) {
      this.utilitarioUtils.onAlertMensaje(this.alertCtrl, this.precioNext, 'Alerta', 'Verifique el precio, avance con enter')
    } else {

      if( !this.storageService.getDtoTransaccion().vMonto || this.cantidadExistente >= this.articuloResponseMin.cantidad ) {
        if( this.existeEnLista ) {
          this.utilitarioUtils.onAlertGuardar(this.alertCtrl, this, this.codigoNext, 'Alerta', 'Existe otro registro en la lista desea reemplazar?')
        } else {
          this.onGuardar(this.codigoNext)
        }
      } else {
        this.utilitarioUtils.onAlertMensaje(this.alertCtrl, this.cantidadNext, 'Alerta', 'Supero la cantidad existente del inventario')
      }
    } 
  }

  onGuardar(next:any) {
    this.enterGuardar.emit(this.articuloResponseMin)
    
    this.getReset()

    setTimeout( ()=> {
      
      next.setFocus()
    }, 350 )
  }

  getReset() {
    this.articuloResponseMin.codigo = null
    this.articuloResponseMin.cantidad = null
    this.articuloResponseMin.nombre = null
    this.articuloResponseMin.precio = null
  }
}
