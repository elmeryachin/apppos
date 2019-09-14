import { Component } from '@angular/core';
import { TransaccionResponseList, TransaccionObjeto, ServResponse, TransaccionDetalle } from '../../../../modelo/objeto.model';
import { TransaccionService } from '../../../../providers/transaccion.service';
import { MensajeUtils } from '../../../../utils/mensaje.utils';
import { ViewController, AlertController, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { StorageService } from '../../../../providers/storage.service';
import { DtoDetalle } from '../../../../modelo/dto';
import { UtilitarioUtils } from '../../../../utils/utilitario.utils';
import { ADiferenciaPage } from '../a-diferencia/a-diferencia';


@Component({
  selector: 'page-a-pago',
  templateUrl: 'a-detalle.html',
})
export class APagoPage {
  
  private transaccionResponseList:TransaccionResponseList = new TransaccionResponseList()
  
  private tcan:number
  private tprec:number

  private tsubtotl:number
  private tsubprec:number
  private tsubcant:number

  cols:any = [
    { field: 'codigo', header: 'Codigo', width:'18%' },
    { field: 'fechaMovimiento', header: 'Fecha', width:'24%' },
    { field: 'Monto', header: 'Observacion', width:'38%' }
  ];


  selected: TransaccionObjeto = null
  dtoDetalle: DtoDetalle
  listaDetalle:TransaccionDetalle[]

  constructor(public transaccionService:TransaccionService,
              public modalCtrl: ModalController,
              public utilitarioUtils:UtilitarioUtils,
              public alertCtrl:AlertController,
              public mensajeUtils:MensajeUtils,
              public viewCtrl:ViewController,
              public storageService: StorageService) {
    console.log("Constructor .. a-detalle ...")

    this.dtoDetalle = storageService.getDtoDetalle()

    this.transaccionResponseList = new TransaccionResponseList()
    
    this.getLista()

  }

  
  /**
   * Muestra un mensaje antes de ejectar 
   */
  onAlertProcesar() {
    this.utilitarioUtils.onAlertProcesar( this.alertCtrl, this, null, 'Confirmacion',
     'Esta seguro de procesar ' + this.dtoDetalle.nProcesar + ' del  Nro ' + this.selected.nroMovimiento)
  }
  /**
   * Procesa segun el path lo que se ejecuta, guarda un nuevo cambio de estado para el registro seleccionado
   */
  onProcesar( next:any ) {
    let servicio: Observable<ServResponse>
  
    servicio = this.transaccionService.onProcesar( this.selected.id, this.selected )
      
    servicio.subscribe(
      data => {
        if( this.mensajeUtils.getValidarRespuesta( data, null ) ) {
            this.getLista()
            this.selected = null
        } 
      }
    )
  }

    /**
   * Muestra un mensaje antes de ejectar 
   */
  onAlertAgrupar() {
    this.utilitarioUtils.onAlertAgrupar( this.alertCtrl, this, null, 'Agrupar',
     'Esta seguro de agrupar los registros actuales (Venta 1er Borrador')
  }
  /**
   * Procesa segun el path lo que se ejecuta, guarda un nuevo cambio de estado para el registro seleccionado
   */
  onAgrupar( next:any ) {
    let servicio: Observable<ServResponse>
  
    servicio = this.transaccionService.onAgrupar( )
      
    servicio.subscribe(
      data => {
        if( this.mensajeUtils.getValidarRespuesta( data, null ) ) {
            this.getLista()
            this.selected = null
        } 
      }
    )
  }

  /**
   * retorna a la ventana principal que lo invoco enviando el objeto principal
   */
  onReturnModal(selected:any) {
    
    this.viewCtrl.dismiss( selected )

  }

  /**
   * Lista auxiliar para cargar datas : demo temporal
   */
  getLista() {
    if( this.storageService.getDtoDetalle().list != null ) {
      this.transaccionService.onLista( ).subscribe (
        data => {
          if( this.mensajeUtils.getValidarRespuestaSinMensaje( data ) ) {
            this.transaccionResponseList = data
            this.getTotales()
          }
        }
      )
    }
  }

  /**
   * Se requiere mostrar totales de todos los registros de transaccion
   */
  getTotales() {
    this.tcan = 0
    this.tprec = 0.00
    for( let i=0; i<this.transaccionResponseList.list.length; i++) {
      this.tcan = this.tcan + this.transaccionResponseList.list[i].cantidad 
      this.tprec = this.tprec + this.transaccionResponseList.list[i].precio
    }
  }

  /**
   * Solicitud para mandar a imprimir un registro en forma de reporte
   * @param row 
   */
  onPrint( row:any ){
    console.log('onPrint ...')

  }

  /**
   * Obtiene subtotales del detalle tras seleccionar una transaccion.
   */
  onSubTotal() {
    this.tsubtotl = 0.00
    this.tsubprec = 0.00
    this.tsubcant = 0
    if( this.selected != null ) {
      
      for(let i=0; i<this.selected.lista.length; i++) {
        this.tsubcant = this.tsubcant * 1 + this.selected.lista[i].cantidad * 1
        this.tsubprec = this.tsubprec * 1 + this.selected.lista[i].precio * 1
        this.tsubtotl = this.tsubtotl * 1 + (this.selected.lista[i].cantidad * this.selected.lista[i].precio)
      }
    }
  }
}
