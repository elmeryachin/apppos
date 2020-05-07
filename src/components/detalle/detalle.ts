import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TransaccionDetalle } from '../../modelo/objeto.model';
import { AlertController } from 'ionic-angular';
import { UtilitarioUtils } from '../../utils/utilitario.utils';

@Component({
  selector: 'detalle',
  templateUrl: 'detalle.html'
})
export class DetalleComponent {

  @Input() lista:TransaccionDetalle[] = new Array()
  @Output() enter = new EventEmitter()

  row:TransaccionDetalle
  cols:any = [
    { field: 'codigoArticulo', header: 'Codigo', width:'18%' },
    { field: 'cantidad', header: 'Cantidad', width:'24%' },
    { field: 'precio', header: 'Precio Unit.', width:'20%' },
    { field: 'precio', header: 'Precio SubTotal', width:'25%' },
    { field: '', header: '', width:'10%' }
  ]
  @Input("tsubtotl") tsubtotl:number
  @Input("tsubprec") tsubprec:number
  @Input("tsubcant") tsubcant:number

  constructor(public alertCtrl:AlertController,
              public utilitarioUtils:UtilitarioUtils ) {
                console.log('CONSTRUCTOR DETALLE TS......')
              }

  ngOnInit(){
    console.log( 'ngOnInit()' )
    //this.getSubTotales( this.lista )
  }
  ionViewCanEnter(){
    console.log('ionViewCanEnter()')
    return //your check;
  }
  ionViewDidLoad(){
    console.log('ionViewDidLoad()')
  }
  ionViewWillEnter(){
    console.log('ionViewWillEnter()')
  }
  ionViewDidEnter(){
    console.log('ionViewDidEnter()')
  }
  ionViewCanLeave(){
    console.log('ionViewCanLeave()')
    return //your check;
  }
  ionViewWillLeave(){
    console.log('ionViewWillLeave()')
  }
  ionViewDidLeave(){
    console.log('ionViewDidLeave()')
  }

  /**
   * Solicita confirmacion antes de eliminar algun registro selecionado
   * @param row Registro selecionado a eliminarse.
   */
  onAlertElminar( row:TransaccionDetalle ) {
    this.row = row
    this.utilitarioUtils.onAlertEliminar(this.alertCtrl, this, null,
      'Alerta', 'Esta seguro de eliminar el registro de la lista con codigo ' + this.row.codigoArticulo)
  }
  /**
   * Elimina un registro de la lista y envia la lista final a la ventana "principal"
   * @param next Es nulo por que no se considera necesario
   */
  onEliminar( next:any ) {
    this.lista = this.lista.filter(item => item.codigoArticulo !== this.row.codigoArticulo)
    this.enter.emit(this.lista)
  }

}
