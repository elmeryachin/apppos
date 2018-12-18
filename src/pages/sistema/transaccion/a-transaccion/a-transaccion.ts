import { Component, Input, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { TransaccionService } from '../../../../providers/transaccion.service';
import { TransaccionRequest, ArticuloResponseMin, TransaccionDetalle, TransaccionResponse, ServResponse } from '../../../../modelo/objeto.model';
import { MensajeUtils } from '../../../../utils/mensaje.utils';
import { UtilitarioUtils } from '../../../../utils/utilitario.utils';
import { Observable } from 'rxjs/Observable';
import { SERVIDOR } from '../../../../utils/ctte.utils';
import { ADetallePage } from '../a-detalle/a-detalle';
import { DtoTransaccion } from '../../../../modelo/dto';
import { StorageService } from '../../../../providers/storage.service';

var Mousetrap = require('mousetrap')  // Para que funcione require "npm install --save @types/node"
var Mousetrap_global = require('mousetrap-global-bind')

var PHE = require("print-html-element")

@Component({
  selector: 'page-a-transaccion',
  templateUrl: 'a-transaccion.html',
})
export class ATransaccionPage {
  
  @Input() tipo:string
  
  transaccionRequest:TransaccionRequest
  codigo:string = null                    //Auxiliar para el codigo del producto
  
  @ViewChild('entrada') entradaNext       //Uso condicionado para realizar el focus a proveedor|Cliente|almacen
  @ViewChild('producto') productoNext     //Uso de producto para limpiar campos
  
  dtoTransaccion:DtoTransaccion

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl:AlertController,
              public mensajeUtils:MensajeUtils,
              public utilitarioUtils:UtilitarioUtils,
              public transaccionService:TransaccionService,
              public modalCtrl:ModalController,
              public storageService: StorageService) {

    this.transaccionRequest = new TransaccionRequest()

  }

  ngOnInit() {
    console.log(Mousetrap_global)
    this.dtoTransaccion = this.storageService.getDtoTransaccion()
    this.getInit()
  }
  
  /**
   * Este metodo pertenece al ciclo de vida de ionic y contiene
   * Metodo que pueden ejecutarse tras conbinar la presion de teclas
   */
  ionViewDidEnter(){
    Mousetrap.bindGlobal(['command+g', 'ctrl+g'], () => {
      this.onAlertGuardar(this.entradaNext.codigoNext)
    })
    Mousetrap.bindGlobal(['command+n', 'ctrl+n'], () => {
      this.onAlertLimpiar()
    })
    Mousetrap.bindGlobal(['command+e', 'ctrl+e'], () => {
      this.onAlertEliminar()
    })
    Mousetrap.bindGlobal(['command+i', 'ctrl+i'], () => {
      if( this.transaccionRequest.transaccionObjeto.id == null ) {
        this.utilitarioUtils.onAlertMensaje(this.alertCtrl, this.entradaNext.codigoNext,
          'Alerta', ' No se tiene presente un registro seleccionado a imprimir')
      } else {
        this.getPrint()
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
    this.utilitarioUtils.onAlertGuardar( this.alertCtrl, this, next, 'Confirmacion',
     'Esta seguro de guardar el nuevo Pedido con Nro ' + this.transaccionRequest.transaccionObjeto.nroMovimiento)
  }

  /**
   * Busca generar la pantalla de lista de pedidos|...|...
   */
  onModalList( opcion:string) {

    if( opcion == 'B' ) {
      this.storageService.setDtoDetalle( this.dtoTransaccion.B )
    } else if( opcion == 'C' ) {
      this.storageService.setDtoDetalle( this.dtoTransaccion.C )
    } else if( opcion == 'D' ) {
      this.storageService.setDtoDetalle( this.dtoTransaccion.D )
    }
    
    let modal = this.modalCtrl.create( ADetallePage )
    modal.present()
    modal.onDidDismiss( paramTransaccionObjeto => {
      if( paramTransaccionObjeto == null) {
        this.getInit()
        this.transaccionRequest.transaccionObjeto.nombreUsuario = null
        this.entradaNext.codigo = null
        this.productoNext.articuloResponseMin.cantidad = null
        this.productoNext.articuloResponseMin.precio = null 
      } else {
        this.transaccionRequest.transaccionObjeto.nroMovimiento = paramTransaccionObjeto.nroMovimiento 
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
   * Permite imprimir un objeto
   */
  getPrint() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", SERVIDOR + "/reporte/porllegar_mov/html/view/"+this.transaccionRequest.transaccionObjeto.id, false);
    xhttp.setRequestHeader("Content-type", "text/plain");
    xhttp.setRequestHeader("token", "12345-1");
    
    xhttp.send();
    PHE.printHtml(xhttp.responseText);
  }

  /**
   * Obtiene el ultimo nro de movimiento y la fecha
   */
  getInit() {
    if( this.dtoTransaccion.init != null && this.dtoTransaccion.enabled ) {
      this.transaccionService.onInit().subscribe(
        data => {
          this.transaccionRequest.getReset()
          this.transaccionRequest.transaccionObjeto.nroMovimiento = data.nroMovimiento
          this.transaccionRequest.transaccionObjeto.fechaMovimiento = data.fechaMovimiento
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
      console.log(this.transaccionRequest.transaccionObjeto.nroMovimiento )
      service = this.transaccionService.onObtener(this.transaccionRequest.transaccionObjeto.nroMovimiento )
      service.subscribe(
        data => { console.log(data)
          if( this.mensajeUtils.getValidarRespuestaQuest( data, present, this.entradaNext.codigoNext ) ) {
            this.transaccionRequest.transaccionObjeto = data.transaccionObjeto
            
            this.entradaNext.codigo = data.transaccionObjeto.codigo
            this.entradaNext.onQuest() 
          } else {
            
          }
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

    this.transaccionRequest.transaccionObjeto.lista = 
      this.transaccionRequest.transaccionObjeto.lista.filter(item => item.codigoArticulo !== event.codigo)

    this.codigo = null
    
    let transaccionDetalle:TransaccionDetalle = new TransaccionDetalle()
    transaccionDetalle.codigoArticulo = event.codigo
    transaccionDetalle.cantidad = event.cantidad
    transaccionDetalle.precio = event.precio
    
    this.transaccionRequest.transaccionObjeto.lista.push(transaccionDetalle)
    this.getTotalesTransaccion()
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
    
    let servicio: Observable<TransaccionResponse>
    if( this.transaccionRequest.transaccionObjeto.id == null && this.dtoTransaccion.add != null ) {
      servicio = this.transaccionService.onAdicionar( this.transaccionRequest )
    } else if( this.transaccionRequest.transaccionObjeto.id != null && this.dtoTransaccion.update != null ){
      servicio = this.transaccionService.onActualizar( this.transaccionRequest )
    }

    if( servicio != null) {
      servicio.subscribe(
        data => {
          if( this.mensajeUtils.getValidarRespuesta(data, next) ) {
            this.transaccionRequest.getReset()
            this.entradaNext.codigo = null
            this.getInit()
            this.productoNext.getReset()
            this.codigo = null
          } 
        }
      )
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

}
