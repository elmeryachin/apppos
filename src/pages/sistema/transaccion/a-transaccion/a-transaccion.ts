import { Component, Input, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, ToastController } from 'ionic-angular';
import { TransaccionService } from '../../../../providers/transaccion.service';
import { TransaccionRequest, ArticuloResponseMin, TransaccionDetalle, TransaccionResponse, ServResponse, SaldoResponse, TransaccionObjeto } from '../../../../modelo/objeto.model';
import { MensajeUtils } from '../../../../utils/mensaje.utils';
import { UtilitarioUtils } from '../../../../utils/utilitario.utils';
import { Observable } from 'rxjs/Observable';
import { SERVIDOR } from '../../../../utils/ctte.utils';
import { ADetallePage } from '../a-detalle/a-detalle';
import { UsuarioComponent } from '../../../../components/usuario/usuario';
import {DtoTransaccion, DtoDetalle, ResponseReporte} from '../../../../modelo/dto';
import { StorageService } from '../../../../providers/storage.service';
import { PagPago } from '../../../../modelo/tabla.model';
import { APagoPage } from '../a-pago/a-pago';
import {DiscoService} from "../../../../providers/disco.service";
import {ReporteService} from "../../../../providers/reporte.service";
declare var require: any;
var Mousetrap = require('mousetrap')  // Para que funcione require "npm install --save @types/node" -- declare var require: any;
var Mousetrap_global = require('mousetrap-global-bind')

var PHE = require("print-html-element")

@Component({
  selector: 'page-a-transaccion',
  templateUrl: 'a-transaccion.html',
})
export class ATransaccionPage {

  esMenu:boolean = true
  @Input() tipoTransaccion:string         // Se manda el tipo ejm.: 'PEDIDO, RECIBIDO, SOLICITUD ...'
  transaccionRequest:TransaccionRequest
  transaccionRequestAux:TransaccionRequest
  codigo:string = null                    //Auxiliar para el codigo del producto
  saldoResponse: SaldoResponse

  @ViewChild('entrada') entradaNext       //Uso condicionado para realizar el focus a proveedor|Cliente|almacen
  @ViewChild('producto') productoNext     //Uso de producto para limpiar campos

  dtoTransaccion:DtoTransaccion
  dtoDetalle:DtoDetalle   // Solo para ejecutar procesar

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl:AlertController,
              public mensajeUtils:MensajeUtils,
              public utilitarioUtils:UtilitarioUtils,
              public transaccionService:TransaccionService,
              public modalCtrl:ModalController,
              public storageService: StorageService,
              public toastController: ToastController,
              public reporteService:ReporteService) {
    //Quitar el storage para adicionarlo en transaccionService para org. el codigo
    this.transaccionRequest = new TransaccionRequest()
    this.cargarAccesoRapido()
    this.saldoResponse = new SaldoResponse()
  }

  ngOnInit() {
    console.log('ngOnInit ......')
    this.storageService.setAsignacionDtoTransaccion(this.tipoTransaccion)

    this.dtoTransaccion = this.storageService.getDtoTransaccion()
    this.dtoDetalle = this.storageService.getDtoDetalle()
    this.getInit()
  }

  /**
   * Este metodo pertenece al ciclo de vida de ionic y contiene
   * Metodo que pueden ejecutarse tras conbinar la presion de teclas
   */
  cargarAccesoRapido(){
    Mousetrap.bindGlobal(['command+g', 'ctrl+g'], () => {
      if( this.dtoTransaccion.guardar ) {
        this.onAlertGuardar(this.entradaNext.codigoNext)
      }
    })
    Mousetrap.bindGlobal(['command+n', 'ctrl+n'], () => {
      if( this.dtoTransaccion.nuevo ) {
        this.onAlertLimpiar()
      }
    })
    Mousetrap.bindGlobal(['command+e', 'ctrl+e'], () => {
      if( this.dtoTransaccion.eliminar ) {
        this.onAlertEliminar()
      }
    })
    Mousetrap.bindGlobal(['command+i', 'ctrl+i'], () => {
      if( this.dtoTransaccion.imprimir ) {
        if( this.transaccionRequest.transaccionObjeto.id == null ) {
          this.utilitarioUtils.onAlertMensaje(this.alertCtrl, this.entradaNext.codigoNext,
            'Alerta', ' No se tiene presente un registro seleccionado a imprimir')
        } else {
          this.getPrint()
        }
      }
    })
  }

  /**
   * Muestra un alert antes de ejecutar onLimpiar()
   */
  onAlertLimpiar() {
    this.utilitarioUtils.onAlertLimpiar(this.alertCtrl, this, this.entradaNext.codigoNext)
  }

  /**
   * Muestra un alert antes de ejecutar onEliminar()
   */
  onAlertEliminar() {
    this.utilitarioUtils.onAlertEliminar(this.alertCtrl, this, this.entradaNext.codigoNext,
      'Eliminar', 'Esta seguro de eliminar el Nro. Movimiento ' + this.transaccionRequest.transaccionObjeto.nroMovimiento )
  }

  /**
   * Pregunta previa antes de guardar el registro
   * @param next componente/html para asignar focus
   */
  onAlertGuardar( next:any ) {
    this.onGuardar( next )
    /*this.utilitarioUtils.onAlertGuardar( this.alertCtrl, this, next, 'Confirmacion',
     'Esta seguro de guardar la transaccion con Nro ' + this.transaccionRequest.transaccionObjeto.nroMovimiento)*/
  }

  /**
   * Busca generar la pantalla de lista de pedidos|...|...
   */
  onModalList( opcion:string) {
    console.log( opcion )
    if( opcion == 'B' ) {
      this.storageService.setDtoDetalle( this.dtoTransaccion.B )
    } else if( opcion == 'C' ) {
      this.storageService.setDtoDetalle( this.dtoTransaccion.C )
    } else if( opcion == 'D' ) {
      this.storageService.setDtoDetalle( this.dtoTransaccion.D )
    }

    this.dtoDetalle = this.storageService.getDtoDetalle()

    let modal = this.modalCtrl.create( ADetallePage )
    modal.present()
    modal.onDidDismiss( paramTransaccionObjeto => {
      if( paramTransaccionObjeto == null) {
        this.transaccionRequest.getReset()
        this.getInit()
        this.transaccionRequest.transaccionObjeto.nombreUsuario = null
        this.entradaNext.codigo = null
        this.productoNext.articuloResponseMin.cantidad = null
        this.productoNext.articuloResponseMin.precio = null
      } else {
        // parche: se manda el id sobre el nroMovimiento , esto para poder utilizar el metodo this.onQuest sin modificar.
        this.transaccionRequest.transaccionObjeto.nroMovimiento = paramTransaccionObjeto.id
        this.onSaldo( paramTransaccionObjeto.id );
        this.onQuest( null )
        this.getTotalesTransaccion()
        this.codigo = null
        this.productoNext.articuloResponseMin.codigo = null
        this.productoNext.articuloResponseMin.cantidad = null
        this.productoNext.articuloResponseMin.precio = null
      }
    })
  }

  /**
   * Carga el saldo actual de la transaccion cargada
   * @param idTrans es el idTransaccion
   */
  onSaldo(idTrans:string) {
    if( this.dtoTransaccion.conCredito ) {
      let service: Observable<SaldoResponse>
      this.transaccionService.onTipoTransaccion(this.tipoTransaccion)
      service = this.transaccionService.onSaldo( idTrans )
      service.subscribe(
        data => {
          if( this.mensajeUtils.getValidarRespuestaSinMensaje( data ) ) {
            this.saldoResponse = data

          }
        }
      )
    }
  }

  /**
   *
   */
  onPago( idTrans:string ) {
    let modal = this.modalCtrl.create( APagoPage, { registro: this.transaccionRequest } )
    modal.present()
    modal.onDidDismiss( data => { this.onSaldo( idTrans ) } )
  }

  /**
   * Permite imprimir un objeto
   */
  getPrint() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", SERVIDOR + "reporte/porllegar_mov/html/view/"+this.transaccionRequest.transaccionObjeto.id, false);
    xhttp.setRequestHeader("Content-type", "text/plain");
    xhttp.setRequestHeader("token", "token-1");

    xhttp.send();
    PHE.printHtml(xhttp.responseText);
  }

  /**
   * Obtiene el ultimo nro de movimiento y la fecha
   */
  getInit() {
    if( this.dtoTransaccion.init != null && this.dtoTransaccion.enabled ) {
      this.transaccionService.onTipoTransaccion(this.tipoTransaccion)
      this.transaccionService.onInit().subscribe(
        data => {
          this.transaccionRequest.getReset()
          this.transaccionRequest.transaccionObjeto.nroMovimiento = data.nroMovimiento
          this.transaccionRequest.transaccionObjeto.fechaMovimiento = data.fechaMovimiento
          this.getCloneTransaccionRequest()
          this.onValidaObjetoTransaccionRequest()
          setTimeout( ()=> this.entradaNext.codigoNext.setFocus(), 350 )
        }
      )
    }
  }

  /**
   * Busca a partir del numero de Movimiento su respectiva transaccion
   * @param present Es el componente/html del cual se ejecuta la funcion
   */
  onQuest(present:any) {
    console.log('onQuest ;;; ' + this.dtoTransaccion.quest)
    if( this.dtoTransaccion.quest != null ) {
      this.transaccionRequest.transaccionObjeto.lista = new Array()
      this.transaccionRequest.transaccionObjeto.id = null
      this.transaccionRequest.transaccionObjeto.observacion = null
      this.transaccionRequest.transaccionObjeto.nombreUsuario = null
      this.entradaNext.codigo = null
      let service: Observable<TransaccionResponse>
      this.transaccionService.onTipoTransaccion(this.tipoTransaccion)
      console.log('### this.transaccionRequest.transaccionObjeto.nroMovimiento:: ' + this.transaccionRequest.transaccionObjeto.nroMovimiento)
      service = this.transaccionService.onObtener(this.transaccionRequest.transaccionObjeto.nroMovimiento )
      service.subscribe(
        data => {
          if( this.mensajeUtils.getValidarRespuestaQuest( data, present, this.entradaNext.codigoNext ) ) {
            this.transaccionRequest.transaccionObjeto = data.transaccionObjeto
            this.entradaNext.codigo = data.transaccionObjeto.codigo
            this.entradaNext.onQuest()
          }
          this.getCloneTransaccionRequest();
          this.onValidaObjetoTransaccionRequest();
        }
      )
    }
  }

  /**
   * Captura codigo y nombre del proveedor seleccionado desde el componente <entrada ... >
   * @param event valor capturado
   * @param next componente/html al cual avanzar con el focus
   */
  onEnterEntrada( event:any, next:any ) {
    this.transaccionRequest.transaccionObjeto.codigo = event.codigo
    this.transaccionRequest.transaccionObjeto.nombreUsuario = event.nombre
    this.onValidaObjetoTransaccionRequest()
    if( event.nombre != undefined && event.nombre != null) {
      setTimeout( () => next.setFocus(), 350 )
    }
  }

  /**
   * Captura desde el componente Quest el codigo del articulo
   * nota: Se usa setTimeout para simular la renderizacion del componente.
   */
  onEnterInventario( event:any, producto:any ) {
    this.codigo = null

    let len = this.transaccionRequest.transaccionObjeto.lista.length
    for( let i=0; i<len; i++ ) {
      if( this.transaccionRequest.transaccionObjeto.lista[i].codigoArticulo == event.codigo ) {
        producto.existeEnLista = true
      }
    }
    setTimeout( () => {
      this.codigo = event.codigo
    }, 250)
  }

  /**
   * Almacena un nuevo articulo en la lista
   * @param event
   */
  onEnterInventarioGuardar( event:ArticuloResponseMin ) {
    //this.transaccionRequest.transaccionObjeto.lista =
      //this.transaccionRequest.transaccionObjeto.lista.filter(item => item.codigoArticulo !== event.codigo)
    let nuevo:boolean = true;
    this.transaccionRequest.transaccionObjeto.lista.forEach(
      registro => {
        if( registro.codigoArticulo == event.codigo) {
          nuevo = false;
          registro.cantidad = event.cantidad
          registro.precio = event.precio
        }
      }
    )

    if( nuevo ) {
      let transaccionDetalle:TransaccionDetalle = new TransaccionDetalle()
      transaccionDetalle.codigoArticulo = event.codigo
      transaccionDetalle.cantidad = event.cantidad
      transaccionDetalle.precio = event.precio
      this.transaccionRequest.transaccionObjeto.lista.push(transaccionDetalle)
    }
    this.codigo = null;
    this.getTotalesTransaccion()
    this.onValidaObjetoTransaccionRequest()
  }

  /**
   * Se recupera los datos para validar
   */
  cantidadExistente:number = 0
  onNoEventInventario( evento:any ) {
    this.cantidadExistente = evento
  }
  /**
   * Actualiza la lista y asigna un focus a un elementos
   * @param event la nueva lista para actualizar la actual
   * @param next El componente/html para asignar el focus
   */
  onEnterDetalle( event:TransaccionDetalle[], next:any ) {
    this.transaccionRequest.transaccionObjeto.lista = event
    this.getTotalesTransaccion()
    setTimeout( ()=> next.setFocus(), 350 )
  }

  /**
   * Limpia el objeto principal y restaura el focus a proveedor
   * @param next Al punto donde se realizara el focus tras limpiar
   */
  onLimpiar( next:any ) {
    this.transaccionRequest.getReset()
    this.getInit()
    this.productoNext.getReset()
    this.codigo = null
    setTimeout( ()=> next.setFocus(), 350 )
  }

  /**
   * Guarda el objeto presente en pantalla
   * @param next objeto al cual asignar el focus.
   */
  onGuardar( next:any ) {

    if (this.transaccionRequest.transaccionObjeto.codigo != null ){
      let servicio: Observable<TransaccionResponse>
      this.transaccionService.onTipoTransaccion(this.tipoTransaccion)
      if( this.transaccionRequest.transaccionObjeto.id == null && this.dtoTransaccion.add != null ) {
        servicio = this.transaccionService.onAdicionar( this.transaccionRequest )
      } else if( this.transaccionRequest.transaccionObjeto.id != null && this.dtoTransaccion.update != null ){
        servicio = this.transaccionService.onActualizar( this.transaccionRequest )
      }

      if( servicio != null) {
        servicio.subscribe(
          data => {
            if( this.mensajeUtils.getValidarRespuestaSinMsgConfirm(data, next) ) {
              /*this.transaccionRequest.getReset()
              this.entradaNext.codigo = null
              this.getInit()
              this.productoNext.getReset()
              this.codigo = null
              console.log( 'registro guardado ... ' + data.transaccionObjeto.id ) */
              if ( this.transaccionRequest.transaccionObjeto.id != null ) { // que locura el ANY
                let a:any = this.transaccionRequest.transaccionObjeto.id
                this.transaccionRequest.transaccionObjeto.nroMovimiento = a
              }

              this.onQuest( null )
            }
          }
        )
      }
    } else {
      this.utilitarioUtils.onAlertMensaje(this.alertCtrl, this.entradaNext.codigoNext,
        'Alerta', ' Le falta completar el codigo ' + this.dtoTransaccion.tipoE.toLowerCase())
    }
  }

  /**
   * Obtiene los totales de la transaccion para el objeto que se enviara a la base TransaccionRequest
   */
  private getTotalesTransaccion() {
    let tcant :number = 0;
    let tprec :number = 0.00
    for( let i=0; i<this.transaccionRequest.transaccionObjeto.lista.length; i++) {
      tcant = tcant * 1 + this.transaccionRequest.transaccionObjeto.lista[i].cantidad * 1
      tprec = tprec * 1 + this.transaccionRequest.transaccionObjeto.lista[i].precio * this.transaccionRequest.transaccionObjeto.lista[i].cantidad
    }
    this.transaccionRequest.transaccionObjeto.cantidad = tcant
    this.transaccionRequest.transaccionObjeto.precio = tprec

  }

  /**
   * Se elimina el registro con id != null presente en pantalla.
   * @param next Se asigna el focus
   */
  onEliminar( next:any ) {
    if( this.storageService.getDtoTransaccion().delete != null ) {
      let service: Observable<ServResponse>
      this.transaccionService.onTipoTransaccion(this.tipoTransaccion)
      service = this.transaccionService.onEliminar( this.transaccionRequest.transaccionObjeto.id )

      service.subscribe(
        data => {
          if( this.mensajeUtils.getValidarRespuesta( data, next ) ) {
            this.transaccionRequest.getReset()
            this.getInit()
            this.productoNext.getReset()
            this.codigo = null
          }
        }
      )
    }
  }

  /**
   * Muestra un mensaje antes de ejectar
   */
  onAlertProcesar() {
    this.utilitarioUtils.onAlertProcesar( this.alertCtrl, this, null, 'Confirmacion',
     'Esta seguro de procesar ' + this.dtoDetalle.nProcesar + ' del  Nro ' + this.transaccionRequest.transaccionObjeto.nroMovimiento)
  }

  /**
   * Procesa segun el path lo que se ejecuta, guarda un nuevo cambio de estado para el registro seleccionado
   */
  onProcesar( next:any ) {
    let servicio: Observable<ServResponse>
    let ctrlEdicion:boolean = false
    for(let i=0; i<this.transaccionRequest.transaccionObjeto.lista.length; i++) {
      if( this.transaccionRequest.transaccionObjeto.lista[i].id == null ) {
        ctrlEdicion = true
      }
    }
    this.transaccionService.onTipoTransaccion(this.tipoTransaccion)
    servicio = this.transaccionService.onProcesar( this.transaccionRequest.transaccionObjeto.id, ctrlEdicion?this.transaccionRequest:{} )

    servicio.subscribe(
      data => {
        if( this.mensajeUtils.getValidarRespuesta( data, null ) ) {
          this.transaccionRequest.getReset()
          this.entradaNext.codigo = null
          this.getInit()
          this.productoNext.getReset()
          this.codigo = null
        }
      }
    )
  }

  onCrearUsuario() {  // Agregar dentro del generico dtoTransaccion // titulo Usuaro, Servicio Usuario
    console.log('crear usuario');

    let modal = this.modalCtrl.create( UsuarioComponent )
    modal.present()
    modal.onDidDismiss( paramTransaccionObjeto => {
      console.log('se ejecuto onDidDismiss')
      console.log(paramTransaccionObjeto)
      if( paramTransaccionObjeto == null) setTimeout( () => this.entradaNext.codigoNext.setFocus(), 350 )
      else {
        this.entradaNext.codigo = paramTransaccionObjeto.codigo
        this.entradaNext.onQuest()
        setTimeout( () => this.productoNext.codigoNext.setFocus(), 350 )
      }
    })

  }

  /*presentToast(mensaje: string) {
    const toast = this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }*/

  onPdf() {
    let service = this.reporteService.onReporteTransaccion(this.dtoTransaccion.B.reporte,'pdf', this.transaccionRequest.transaccionObjeto.id)
    service.subscribe(
      data => {
        console.log(data)

        let link = document.createElement( 'a' )
        link.setAttribute( 'href', 'data:text/plain;base64,' + data.reporte )
        link.setAttribute( 'download', this.dtoTransaccion.B.reporte + "_" + this.transaccionRequest.transaccionObjeto.nroMovimiento + '.pdf' )
        link.style.display = 'none'

        document.body.appendChild( link )

        link.click()

        document.body.removeChild( link )

      }
    )
  }

  onExcel() {
    let service = this.reporteService.onReporteTransaccion(this.dtoTransaccion.B.reporte, 'xls', this.transaccionRequest.transaccionObjeto.id)
    service.subscribe(
      data => {
        console.log(data)

        let link = document.createElement( 'a' )
        link.setAttribute( 'href', 'data:text/plain;base64,' + data.reporte )
        link.setAttribute( 'download', this.dtoTransaccion.B.reporte + "_" + this.transaccionRequest.transaccionObjeto.nroMovimiento + '.xls' )
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
    let url:string = this.reporteService.onPrintTransaccion( this.dtoTransaccion.B.reporte, 'html', this.transaccionRequest.transaccionObjeto.id )

    let xhttp = new XMLHttpRequest()

    xhttp.open("GET", url, false);
    xhttp.setRequestHeader("Content-type", "text/plain");
    xhttp.setRequestHeader("token", this.storageService.getAccesoResponse().token );

    xhttp.send();

    PHE.printHtml( xhttp.responseText );
  }

  proceso:string
  msgs:string
  private msg(codigo:number) {
    if( codigo == 0) {
      this.proceso = 'nuevo'
      this.msgs = ' sin guardar'
    } else if( codigo == 1) {
      this.proceso = 'guardado'
      this.msgs = null;
    } else if( codigo == 2) {
      this.proceso = 'editado'
      this.msgs = ' sin guardar'
    }
    console.log('#####################')
    console.log(this.proceso)
    console.log(this.msgs)
  }
  private getCloneTransaccionRequest() {
    let to:TransaccionObjeto = this.transaccionRequest.transaccionObjeto;
    this.transaccionRequestAux = new TransaccionRequest()
    this.transaccionRequestAux.transaccionObjeto = new TransaccionObjeto()
    this.transaccionRequestAux.transaccionObjeto.id = to.id
    this.transaccionRequestAux.transaccionObjeto.nroMovimiento = to.nroMovimiento
    this.transaccionRequestAux.transaccionObjeto.fechaMovimiento = to.fechaMovimiento
    this.transaccionRequestAux.transaccionObjeto.observacion = to.observacion
    this.transaccionRequestAux.transaccionObjeto.codigo = to.codigo
    //this.transaccionRequestAux.transaccionObjeto.nombreUsuario = to.nombreUsuario
    this.transaccionRequestAux.transaccionObjeto.cantidad = to.cantidad
    this.transaccionRequestAux.transaccionObjeto.precio = to.precio

    let len = this.transaccionRequest.transaccionObjeto.lista.length
    let list:TransaccionDetalle[] = this.transaccionRequest.transaccionObjeto.lista;
    let auxList:TransaccionDetalle[] = new Array();
    for( let i=0; i<len; i++) {
      auxList[i] = new TransaccionDetalle()
      auxList[i].id = list[i].id
      auxList[i].codigoArticulo = list[i].codigoArticulo
      auxList[i].cantidad = list[i].cantidad
      auxList[i].precio = list[i].precio
      auxList[i].observacion = list[i].observacion
    }
    this.transaccionRequestAux.transaccionObjeto.lista = auxList
    auxList = null
    list = null
    console.log('Clonacion de objetos :::::::::::::: ')
    console.log(this.transaccionRequest)
    console.log(this.transaccionRequestAux)
  }
  onValidaObjetoTransaccionRequest() {
    let to:TransaccionObjeto = this.transaccionRequest.transaccionObjeto
    let toAux:TransaccionObjeto = this.transaccionRequestAux.transaccionObjeto;

    if( toAux.id == null) {
      this.msg(0);
      return;
    }
    console.log(to)
    console.log(toAux)
    if( to.nroMovimiento == toAux.nroMovimiento ) {
      if( to.fechaMovimiento == toAux.fechaMovimiento ) {
        if( to.codigo == toAux.codigo ) {
          if( true ) { //to.nombreUsuario == toAux.nombreUsuario ) {
            if( to.observacion == toAux.observacion ) {
              if( to.lista.length == toAux.lista.length ) {
                let map = new Map();
                let count = 0;
                for(let i=0; i< to.lista.length; i++)
                  map.set( to.lista[i].id, to.lista[i] );
                for(let i=0; i< toAux.lista.length; i++) {
                  let obj:TransaccionDetalle = map.get(toAux.lista[i].id);
                  if( obj == null) break;
                  if( obj.codigoArticulo == toAux.lista[i].codigoArticulo) {
                    if( obj.cantidad == toAux.lista[i].cantidad ) {
                      if( obj.observacion == toAux.lista[i].observacion ) {
                        if( obj.precio == toAux.lista[i].precio ) {
                          count++;
                        }
                      }
                    }
                  }
                }
                if( count == to.lista.length ) {
                  this.msg(1);
                  return;
                }
              }
            }
          }
        }
      }
    }

    this.msg(2);
  }
}
