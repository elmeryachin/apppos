import { Component } from '@angular/core';
import { TransaccionResponseList, TransaccionObjeto, ServResponse, TransaccionDetalle } from '../../../../modelo/objeto.model';
import { TransaccionService } from '../../../../providers/transaccion.service';
import { MensajeUtils } from '../../../../utils/mensaje.utils';
import {ViewController, AlertController, ModalController} from 'ionic-angular';
import { Observable } from 'rxjs';
import { StorageService } from '../../../../providers/storage.service';
import { DtoDetalle } from '../../../../modelo/dto';
import { UtilitarioUtils } from '../../../../utils/utilitario.utils';
import { ADiferenciaPage } from '../a-diferencia/a-diferencia';
import {ReporteService} from "../../../../providers/reporte.service";

var PHE = require("print-html-element")

@Component({
  selector: 'page-a-detalle',
  templateUrl: 'a-detalle.html',
})
export class ADetallePage {

  esMenu:boolean = true
  private transaccionResponseList:TransaccionResponseList = new TransaccionResponseList()

  private tcan:number
  private tprec:number

  private tsubtotl:number
  private tsubprec:number
  private tsubcant:number

  cols:any = [
    { field: 'codigo', header: 'Codigo', width:'18%' },
    { field: 'fechaMovimiento', header: 'Fecha', width:'24%' },
    { field: 'nroMovimiento', header: 'Nro.Mov', width:'20%' },
    { field: 'observacion', header: 'Observacion', width:'38%' }
  ];

  colsD:any = [
    { field: 'codigoArticulo', header: 'Codigo', width:'18%' },
    { field: 'cantidad', header: 'Cantidad', width:'24%' },
    { field: 'precio', header: 'Precio', width:'20%' }
  ]

  selected: TransaccionObjeto = null
  dtoDetalle: DtoDetalle
  listaDetalle:TransaccionDetalle[]

  constructor(public transaccionService:TransaccionService,
              public modalCtrl: ModalController,
              public utilitarioUtils:UtilitarioUtils,
              public alertCtrl:AlertController,
              public mensajeUtils:MensajeUtils,
              public viewCtrl:ViewController,
              public storageService: StorageService,
              public reporteService:ReporteService) {
    console.log("Constructor .. a-detalle ...")

    this.dtoDetalle = storageService.getDtoDetalle()

    this.transaccionResponseList = new TransaccionResponseList()

    this.getLista()

  }

  /**
   * Popup para ver la diferencia entre registros.
   */
  onVerDiferencia() {
    console.log('ver difrencias..')
    let diff = new Array()
    let servicio = this.transaccionService.onObtenerDiff( this.selected.id )
    servicio.subscribe(
      data => {
        if( this.mensajeUtils.getValidarRespuestaSinMsgOk( data, null, null ) ) {
          //console.log(data)
          for( let i=0; i<this.selected.lista.length; i++ ) {
            //console.log(this.selected.lista[i])
            let seCod = this.selected.lista[i].codigoArticulo
            let reg = {
              codigo    : seCod,
              cant_1  : this.selected.lista[i].cantidad,
              cant_2  : this.selected.lista[i].cantidad,
              cant_3  : 0
            }
            for( let j=0; j<data.transaccionObjeto.lista.length; j++ ) {
              let daCod = data.transaccionObjeto.lista[j].codigoArticulo

              if( seCod == daCod ) {
                reg.cant_2 = reg.cant_2 - data.transaccionObjeto.lista[j].cantidad
                reg.cant_3 = data.transaccionObjeto.lista[j].cantidad
              }
            }

            diff[i] = reg
          }

          let esSucursal:boolean = this.storageService.getAccesoResponse().tipo == 'SUCURSAL';
          console.log("esSucursal: " + esSucursal)
          if( data.transaccionObjeto.lista.length > this.selected.lista.length ) {
            for( let j=0; j< data.transaccionObjeto.lista.length; j++ ) {
              let noRepedidos:boolean = true;
              for( let i=0; i<this.selected.lista.length; i++ ) {
                if( data.transaccionObjeto.lista[j].codigoArticulo == this.selected.lista[i].codigoArticulo) {
                  noRepedidos = false;
                }
              }
              if( noRepedidos ) {
                let reg = {
                  codigo    : data.transaccionObjeto.lista[j].codigoArticulo,
                  cant_1  : 0,
                  cant_2  : ( -1 ) * data.transaccionObjeto.lista[j].cantidad,
                  cant_3  : ( esSucursal?-1:1 ) * data.transaccionObjeto.lista[j].cantidad
                }
                diff[diff.length] = reg;
              }
            }
          }

          let modal = this.modalCtrl.create(ADiferenciaPage, {'diff':diff})
          modal.present()
        }
      }
    )
  }

  /**
   * Reemplaza la lista detalle del registro si es que este contiene <editado>.
  */
  onRowSelect(event) {

    this.listaDetalle = this.selected.lista

    if( this.storageService.getDtoDetalle().questDif != null ) { //!(this.selected.observacion!=null && !this.selected.observacion.includes('editado')) ) {

      let servicio = this.transaccionService.onObtenerDiff( this.selected.id )

      servicio.subscribe(
        data => {
          if( this.mensajeUtils.getValidarRespuestaSinMsgOk( data, null, null ) ) {
            this.listaDetalle = data.transaccionObjeto.lista
          }
        }
      )
    }
  }

  onRowUnselect(event) {
    this.listaDetalle = null
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


  onPdf() {
    let service = this.reporteService.onReporteTransaccion(this.dtoDetalle.reporte,'pdf', this.selected.id)
    service.subscribe(
      data => {
        console.log(data)

        let link = document.createElement( 'a' )
        link.setAttribute( 'href', 'data:text/plain;base64,' + data.reporte )
        link.setAttribute( 'download', this.dtoDetalle.reporte + "_" + this.selected.nroMovimiento + '.pdf' )
        link.style.display = 'none'

        document.body.appendChild( link )

        link.click()

        document.body.removeChild( link )

      }
    )
  }

  onExcel() {
    let service = this.reporteService.onReporteTransaccion(this.dtoDetalle.reporte, 'xls', this.selected.id)
    service.subscribe(
      data => {
        console.log(data)

        let link = document.createElement( 'a' )
        link.setAttribute( 'href', 'data:text/plain;base64,' + data.reporte )
        link.setAttribute( 'download', this.dtoDetalle.reporte + "_" + this.selected.nroMovimiento + '.xls' )
        link.style.display = 'none'

        document.body.appendChild( link )

        link.click()

        document.body.removeChild( link )

      }
    )
  }

  /**
   * Permite imprimir un objeto
   */
  onImprimir() {
    let url:string = this.reporteService.onPrintTransaccion( this.dtoDetalle.reporte, 'html', this.selected.id )

    let xhttp = new XMLHttpRequest()

    xhttp.open("GET", url, false);
    xhttp.setRequestHeader("Content-type", "text/plain");
    xhttp.setRequestHeader("token", this.storageService.getAccesoResponse().token );

    xhttp.send();

    PHE.printHtml( xhttp.responseText );
  }

}
