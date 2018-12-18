import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ArticuloRequest, ServResponse } from '../../../modelo/objeto.model';
import { UtilitarioUtils } from '../../../utils/utilitario.utils';
import { ArticuloService } from '../../../providers/articulo.service';
import { MensajeUtils } from '../../../utils/mensaje.utils';
import { Observable } from 'rxjs/Observable';
var Mousetrap = require('mousetrap');// Para que funcione require "npm install --save @types/node"
var Mousetrap_global = require('mousetrap-global-bind');
@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {

  articuloRequest:ArticuloRequest   

  esActualizar:boolean = false      //Control para Guardar(false) un nuevo registro o actualizarlo(true).
  
  esRenderAmbiente:boolean = false; //Auxiliar para rederizar el componente <inventario>
  
  @ViewChild('codigo') codigoNext   //Requerido para dar focus al componente ccodigo
  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl:AlertController,
              public mensajeUtils:MensajeUtils,
              public utilitarioUtils:UtilitarioUtils,
              public articuloService:ArticuloService) {
    this.articuloRequest = new ArticuloRequest()
  }

  ngOnInit() {
    setTimeout( () => this.codigoNext.setFocus(), 350 )
  }
  /**
   * Este metodo pertenece al ciclo de vida de ionic y contiene
   * Metodo que pueden ejecutarse tras conbinar la presion de teclas
   */
  ionViewDidEnter(){
    console.log(Mousetrap_global)
    Mousetrap.bindGlobal(['command+g', 'ctrl+g'], () => {
      this.onAlertGrabar(this.codigoNext)
    })
    Mousetrap.bindGlobal(['command+n', 'ctrl+n'], () => {
      this.utilitarioUtils.onAlertLimpiar(this.alertCtrl, this, this.codigoNext)
    })
    Mousetrap.bindGlobal(['command+e', 'ctrl+e'], () => {
      if(this.esActualizar) {
        this.onAlertEliminar(this.codigoNext)
      }
    })
  }

  /**
   * Metodo para recalcular montos de gastos totales y precio compra.
   */
  onOperaciones():any {
    let mg:number = this.articuloRequest.objetoArticulo.porcentajeGasto * this.articuloRequest.objetoArticulo.precioZonaLibre 
    mg = this.utilitarioUtils.onReformatMoneda( mg / 100, 2 )
  
    let pp:number = this.articuloRequest.objetoArticulo.precioKilo * this.articuloRequest.objetoArticulo.peso
    let pm:number = this.articuloRequest.objetoArticulo.precioZonaLibre * 1 + mg * 1
  
    this.articuloRequest.objetoArticulo.precioCompra = this.utilitarioUtils.onReformatMoneda( pp + pm, 2 ) 
      
    return mg
  }

  /**
   * Realiza busquedas a partir del codigo de entre una lista a obtener un solo registro.
   * Los valores del codigo son Ej.: AB1, A%, %B5%
   * @param next Si todo es correcto se ejecuta next.setfocus()
   */
  onQuest( next:any):any {
    this.esActualizar = false
    this.esRenderAmbiente = false
    
    let codigo = this.articuloRequest.objetoArticulo.codigo
    if( codigo == undefined || codigo.trim() == '' ) return; 
    
    this.articuloRequest.getReset()
    this.articuloRequest.objetoArticulo.codigo = codigo 

    if ( this.articuloRequest.objetoArticulo.codigo.indexOf('%') > -1 ) {
      this.articuloService.onListaPorCodigo( { patron: this.articuloRequest.objetoArticulo.codigo } ).subscribe (
        data => {
          if( this.mensajeUtils.getValidarRespuestaSinMensaje( data ) ) {
            
            this.utilitarioUtils.onAlertRadio(this.alertCtrl, this, next, data.lista , 'titulo')

          } 
        }
      )
    } else {
      this.getObtener(this.articuloRequest.objetoArticulo.codigo, next)
    }
  }

  /**
   * Tras ejecutar onQuest se trabajo con onObtener
   * @param codigo 
   * @param next 
   */
  getObtener(codigo:string, next:any) {
    this.articuloService.onObtener(codigo).subscribe(
      data => {
        if( this.mensajeUtils.getValidarRespuesta(data, next) ) {
          this.articuloRequest.objetoArticulo = data.articulo
          this.esActualizar = true 
          this.esRenderAmbiente = true
        }
      }
    )
  }

  /**
   * Antes de guardar un nuevo registro o actualizarlo se debe despegar un alert de confirmacion
   * @param next componente/html para dirigir el focus
   */
  onAlertGrabar(next:any) {
    this.utilitarioUtils.onAlertGuardar(this.alertCtrl, this, next,  
                                        'Nuevo/Actualizar Articulo',
                                        'Esta seguro de guardar el articulo ' + this.articuloRequest.objetoArticulo.codigo )
  }
  /**
   * El proceso final para enviar y guardar la informacion
   * @param next referencia a un componente/html para ejecutar un setFocus
   */
  onGuardar(next:any) {
    let respuesta:Observable<ServResponse>
    if( !this.esActualizar ) {
      respuesta = this.articuloService.onNuevo(this.articuloRequest)
    } else {
      respuesta = this.articuloService.onActualizar(this.articuloRequest, this.articuloRequest.objetoArticulo.codigo)
    }
    respuesta.subscribe (
      data => {
        if( this.mensajeUtils.getValidarRespuesta(data, next) ) {
          this.esActualizar = true;
        }
      }
    )
  }
  
  /**
   * Antes de eliminar un registro se debe despegar un alert de confirmacion
   * @param next componente/html para dirigir el focus
   */
  onAlertEliminar(next:any) {
    this.utilitarioUtils.onAlertEliminar(this.alertCtrl, this, next,  
      'Eliminar',
      'Esta seguro de eliminar el articulo ' + this.articuloRequest.objetoArticulo.codigo )
  }
  /**
   * Elimina un registro ya existente en pantalla...
   */
  onEliminar(next:any) {
    this.articuloService.onEliminar(this.articuloRequest.objetoArticulo.codigo).subscribe(
      data => {
        if( this.mensajeUtils.getValidarRespuesta( data , next ) ) {
            let codigo = this.articuloRequest.objetoArticulo.codigo 
            this.articuloRequest.getReset()
            this.articuloRequest.objetoArticulo.codigo = codigo
            this.esActualizar = false
        }
      }
    )
  }

  /**
   * Carga un alert para confirmar limpiar el registro sin guardar ningun cambio.
   * @param next referencia a un componente/html para ejecutar un setFocus
   */
  onLimpiar(next:any) {
    this.articuloRequest.getReset()
    setTimeout( () => next.setFocus(), 450)
  }
}
